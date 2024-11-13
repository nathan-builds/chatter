// src/index.js
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes';
import channelRouter from './routes/channelRoutes';

const morgan = require('morgan');
const cors = require('cors');

dotenv.config();

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3001;

app.use(morgan('dev'));
app.use(cors());

async function connectToDatabase() {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log('Connected to database');
}


connectToDatabase();

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use('/user', userRouter);
app.use('/channel',channelRouter)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});