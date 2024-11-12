import { Request, Response } from 'express';
import UserModel from '../models/userModel';

export const registerUser = async (req: Request, res: Response) => {
    console.log('registering user')
    const { name, email, password,username } = req.body;

    try {
        const newUser = new UserModel({ name, email, password,username });
        await newUser.save();
        res.status(201)
            .json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(400)
            .json({ message: 'Error registering user', error });
    }
};