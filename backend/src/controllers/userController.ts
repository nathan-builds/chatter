import e, { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AppError } from '../appError';


export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, username } = req.body;
    console.log(req.body);

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance with the hashed password
        const newUser = new User({ name, email, password: hashedPassword, username });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Error registering user', error });
    }
};


export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try { 
        // Find user by email
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare provided password with the hashed password

        const isPasswordValid = await user.comparePasswords(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' } // Set expiration time
        );

        res.status(200).json({ token });
    } catch (error) {

        console.error('Sign-in error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const getUserChannels = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    if (!userId) {
        return next(new AppError('No user id', 500));
    }
    try {

        const user = await User.findById(userId).populate('channels');
        if (!user) {
            return next(new AppError('Could not find user', 400));
        }

        return res.status(200).json({
            user
        });
    } catch (e: any) {
        return next(new AppError(e.message, 400));
    }
};



