import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';
import Channel from '../models/channelModel';

export const createChannel = async (req: Request, res: Response) => {
    const { createdBy, users } = req.body;
    const createdByUser = await User.findOne({ username: createdBy });
    if (!createdByUser) {
        return res.status(404).json({ message: 'User not found, big error!' });
    }
    console.log('User:', createdByUser);
    try {
        const newChannel = await new Channel({ createdBy: createdByUser._id, users });
        await newChannel.save();
        res.status(201).json({ message: 'Channel created successfully', channel: newChannel });
    } catch (error) {
        res.status(400).json({ message: 'Error creating channel', error });
    }
};