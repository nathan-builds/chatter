import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';
import ChannelService from '../services/channelService';
import { AppError } from '../appError';
import Message from '../models/msgModel';

export const createChannel = async (req: Request, res: Response, next: NextFunction) => {
    const { createdBy, users, isPrivate } = req.body;
    if (!createdBy || !users || !isPrivate) {
        return next(new AppError('Invalid request for channel creation', 400));
    }

    const createdByUser = await User.findById(createdBy);
    if (!createdByUser) {
        return next(new AppError('User not found', 404));
    }
    try {
        const didCreate = await ChannelService.checkCreateChannel(users, createdBy, isPrivate);
        if (!didCreate) {
            return next(new AppError('Error creating channel', 400));

        }

        res.status(201).json({ message: 'Channel created successfully' });
    } catch (error) {
        console.log(error);
        return next(new AppError('Error creating channel', 400));
    }
};

export const getAllMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { channelId } = req.params;
        const messages = await Message.find({ dstChannelId: channelId });
        res.status(200).json(messages);
    } catch (error: any) {
        return new AppError(error.message, 500);
    }
}