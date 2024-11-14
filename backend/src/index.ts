// src/index.js
import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes';
import channelRouter from './routes/channelRoutes';
import messageRouter from './routes/msgRoutes';
import { AppError } from './appError';

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
app.use('/channel', channelRouter);
app.use('/message', messageRouter);

/**
 * For handling errors
 */
app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});