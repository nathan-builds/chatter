import { Request, Response } from 'express';
import User from '../models/userModel';
import ChannelService from '../services/channelService';

export const createChannel = async (req: Request, res: Response) => {
    const { createdBy, users } = req.body;
    const createdByUser = await User.findById(createdBy)
    if (!createdByUser) {
        return res.status(404).json({ message: 'User not found, big error!' });
    }
    try {
        const didCreate = await ChannelService.checkCreateChannel(users, createdBy);
        if (!didCreate) {
           return res.status(400).json({ message: 'Error creating channel' });

        }

        res.status(201).json({ message: 'Channel created successfully' });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Error creating channel', error });
    }
};