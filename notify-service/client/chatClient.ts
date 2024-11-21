import * as amqp from 'amqplib';
import { WebSocket } from "ws";

export interface ClientMessage {
    channels: string
}

export class ChatClient {
    private connection!: amqp.Connection;
    private channel!: amqp.Channel;
    private exchange: string;
    private queue!: string;
    private ws: WebSocket;

    constructor(exchange: string, ws: WebSocket) {
        this.exchange = exchange;
        this.ws = ws;
        this.setup();

        // Handle incoming messages from the WebSocket, should be a bindingKeys array of all the
        // channel ids the client is engaged in 
        ws.on('message', async (message: any) => {
            const clientMessage: ClientMessage = JSON.parse(message.toString());
            console.log('Client message:', clientMessage);
            await this.addBindingKeys(clientMessage.channels.split(','));
            console.log('Received:', message.toString());
        });

        ws.on('close', () => {
            console.log('Client disconnected');
            this.cleanup();
        });
    }

    private async setup() {
        try {
            await this.connectToExchange();
            await this.createChannel();
            await this.createQueue();
        } catch (error) {
            console.error('Setup failed:', error);
            this.ws.close();
        }
    }

    async addBindingKeys(bindingKeys: string[]) {
        for (const key of bindingKeys) {
            await this.channel.bindQueue(this.queue, this.exchange, key);
        }
    }

    private async connectToExchange() {
        this.connection = await amqp.connect('amqp://localhost');
    }

    private async createChannel() {
        this.channel = await this.connection.createChannel();
        await this.channel.assertExchange(this.exchange, 'direct', { durable: false });
    }

    private async createQueue() {
        const { queue } = await this.channel.assertQueue('', {
            exclusive: true,
            durable: false
        });
        this.queue = queue;

        this.channel.consume(this.queue, (message) => {
            const receivedMessage = JSON.parse(message?.content.toString() || '') as any;
            console.log('Received message:', message?.content.toString());
            console.log('Sending message to WebSocket');
            const msg = {
                message: receivedMessage.message,
                dstChannelId: receivedMessage.dstChannelId,
                senderId: receivedMessage.senderId
            };
            this.ws.send(JSON.stringify(msg));
        });
    }

    private async cleanup() {
        try {
            if (this.channel) {
                await this.channel.close();
            }
            if (this.connection) {
                await this.connection.close();
            }
        } catch (error) {
            console.error('Cleanup failed:', error);
        }
    }
}
