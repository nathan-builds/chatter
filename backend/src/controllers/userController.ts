import e, { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AppError } from '../appError';
import Channel, { IChannel } from '../models/channelModel';


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

        res.status(200).json({
            username,
            id: user._id,
            token
        });
    } catch (error) {

        console.error('Sign-in error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const getUserFriends = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    if (!userId) {
        return next(new AppError('No user id', 500));
    }
    try {
        const users = await User.find({ _id: { $ne: userId } });

        if (!users) {
            return next(new AppError('Could not find users', 400));
        }

        const readableUsers = users.map((user) => ({
            id: user._id,
            username: user.username,
            name: user.name
        }));

        return res.status(200).json({
            users: readableUsers
        });
    } catch (e: any) {
        return next(new AppError(e.message, 400));
    }
}

export const getUserChannels = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    console.log('Getting user channels', userId);
    if (!userId) {
        return next(new AppError('No user id', 500));
    }
    try {

        const user = await User.findById(userId).populate('channels');
        if (!user) {
            return next(new AppError('Could not find user', 400));
        }
        const channels = [];
        for (const channel of user.channels as any) {
            const channelName = await buildChannelName(channel);
            channels.push({
                id: channel._id,
                name: channelName
            });
        }

        return res.status(200).json({
            channels: channels
        });
    } catch (e: any) {
        console.log('error getting user channels', e);
        return next(new AppError(e.message, 400));
    }
};


const buildChannelName = async (channel: IChannel) => {
    const channelWithUsers = await Channel.findById(channel._id).populate('users');
    if (!channelWithUsers) {
        return 'Channel not found';
    }

    if (channel.isPrivate) {
        const recipient = channelWithUsers.users.find((user: any) =>
            user._id.toString() !== channel.createdBy.toString()) as any;
        console.log('channel', channel);
        console.log('recipient', recipient);
        return recipient.name;
    }
    let channelName = '';
    channelWithUsers.users.forEach((user: any) => {
        if (user._id !== channel.createdBy) {
            channelName += user.name + ', ';
        }
    });
    return channelName;



}


