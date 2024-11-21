import { Request, Response, NextFunction } from 'express';

// Log incoming requests
export const logRequest = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
};

// Log response time
export const logResponseTime = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`Request to ${req.url} took ${duration}ms`);
    });
    next();
};

// Log errors
export const logError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`[Error] ${err.stack}`);
    next(err);
};

// Log API endpoints accessed
export const logEndpoint = (req: Request, res: Response, next: NextFunction) => {
    const { method, originalUrl, ip } = req;
    console.log(`[API Access] Method: ${method}, URL: ${originalUrl}, IP: ${ip}`);
    next();
};
