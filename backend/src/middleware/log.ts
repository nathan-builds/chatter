import { Request, Response, NextFunction } from 'express';

// Log incoming requests
export const logRequest = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    console.error(`[Error] ${err.stack}`);
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
};

// Log response time
export const logMe = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const { method, url } = req;

    // Add response time header
    res.on('finish', () => {
        const duration = Date.now() - start;
        const status = res.statusCode;

        // Add response time header
        res.setHeader('X-Response-Time', `${duration}ms`);

        // Color status code based on range
        const statusColor = status >= 500 ? '\x1b[31m' : // Red
            status >= 400 ? '\x1b[33m' : // Yellow
                status >= 300 ? '\x1b[36m' : // Cyan
                    status >= 200 ? '\x1b[32m' : // Green
                        '\x1b[0m';    // Default

        console.log(
            `${statusColor}${status}\x1b[0m`,
            `${method} ${url}`,
            `${duration}ms`
        );
    });

    next();
};

// Log errors
export const logError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`[Error] ${err.stack}`);
    next(err);
};
export const logNewError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`[Error] ${err.stack}`);
    next(err);
};

// Log API endpoints accessed
export const logEndpoint = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const { method, originalUrl, ip } = req;
    console.log(`[API Access] Method: ${method}, URL: ${originalUrl}, IP: ${ip}`);
    next();
};

// Log API endpoints accessed
export const logEndpointAgain = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const { method, originalUrl, ip } = req;
    console.log(`[API Access] Method: ${method}, URL: ${originalUrl}, IP: ${ip}`);
    next();
};
