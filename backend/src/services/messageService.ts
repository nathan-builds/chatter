import * as amqp from 'amqplib';

export class MessageService {
    amqpUrl = 'amqp://localhost';
    channel!: amqp.Channel;
    exchange = 'chatter'
    constructor() {
        this.connectToExchange();
    }

    sendMessage(message: string, dstChannelId: string, senderId: string) {
        console.log('Sending message to channel:', dstChannelId);
        console.log('Message:', message);
        const msg = { message, dstChannelId, senderId };
        this.channel.publish(this.exchange, dstChannelId, Buffer.from(JSON.stringify(msg)));
    }

    async connectToExchange() {
        console.log('Setting up RabbitMQ');
        try {
            const connection = await amqp.connect(this.amqpUrl);
            const channel = await connection.createChannel();

            await channel.assertExchange(this.exchange, 'direct', {
                durable: false
            });

            this.channel = channel;

            console.log('RabbitMQ connection established');

            // Handle connection closure
            connection.on('close', () => {
                console.log('RabbitMQ connection closed');
                process.exit(1);
            });

        } catch (error) {
            console.error('Error connecting to RabbitMQ:', error);
            process.exit(1);
        }
    }
}