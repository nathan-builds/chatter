import Message from '../models/msgModel';
import { NextFunction, Request, Response } from 'express';
import Channel from '../models/channelModel';
import { AppError } from '../appError';
import User from '../models/userModel';

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { message, sender, dstChannelId } = req.body;
        console.log(req.body);

        const [channel, senderUser] = await Promise.all([
            Channel.findById(dstChannelId),
            User.findById(sender)]);
        console.log(channel, senderUser);

        // check if the channel exists
        if (!channel || !senderUser) {
            return next(new AppError('Channel or Sender not found', 404));
        }

        // we can now create a new message and save it
        const newMsg = new Message({ message, sender, dstChannelId });
        await newMsg.save();

        res.status(201).json(newMsg);
    } catch (error: any) {
        return new AppError(error.message, 500);
    }
};

