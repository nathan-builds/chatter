import { Request, Response } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const registerUser = async (req: Request, res: Response) => {
    console.log('registering user');
    const { name, email, password, username } = req.body;

    try {
        const newUser = new User({ name, email, password, username });
        await newUser.save();
        res.status(201)
            .json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(400)
            .json({ message: 'Error registering user', error });
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
        const isPasswordValid = await user.comparePassword(password);
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