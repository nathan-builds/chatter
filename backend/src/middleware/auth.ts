import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../appError';

const secretKey = 'your_secret_key'; // Replace with your secret key or move to environment variable


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, secretKey);
        if (!decoded) {
            return next(new AppError('Invalid or expired token', 403))
        }

        req.body.user = decoded;
        next();
    } catch (error) {
        return next(new AppError('Invalid or expired token', 403))
    }
};