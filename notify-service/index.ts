import * as amqp from 'amqplib';
import { WebSocketServer, WebSocket } from 'ws';
import { ChatClient } from './client/chatClient';

const amqpUrl = 'amqp://localhost';
const wss = new WebSocketServer({ port: 6969 });

// Handle WebSocket connections
wss.on('connection', (ws: WebSocket) => {
    console.log('New client connected');
    const chatClient = new ChatClient('chatter', ws);

    
});

async function setupRabbitMQ() {
    console.log('Setting up RabbitMQ');
    try {
        const connection = await amqp.connect(amqpUrl);
        const channel = await connection.createChannel();

        const exchange = 'chatter';
        await channel.assertExchange(exchange, 'direct', {
            durable: false
        });

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

setupRabbitMQ();

