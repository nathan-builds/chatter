// src/index.js
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import profileRouter from './routers/profileRouter';
import registerRouter from './routers/registerRouter';

const morgan = require('morgan');

const cors = require('cors');
dotenv.config();

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3001;
app.use(morgan('dev'));
app.use(cors());

app.use('/profile', profileRouter);
app.use('/register', registerRouter);


app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});