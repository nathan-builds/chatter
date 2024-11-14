import Channel, { IChannel } from '../models/channelModel';
import { createHash } from 'node:crypto';
import User from '../models/userModel';
import { Request, Response } from 'express';
import { AppError } from '../appError';

export const checkCreateChannel = async (
    userIds: string[],
    createdBy: string,
    isPrivate: boolean): Promise<boolean> => {

    userIds.sort();
    const hashKey = createHash('sha256')
        .update(userIds.join(','))
        .digest('hex');

    try {
        let channel = await Channel.findOne({ channelHash: hashKey });
        if (channel) {
            return true;
        }

        //this is a new channel, create it
        createNewChannel(userIds, createdBy, isPrivate, hashKey);


    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};


const createNewChannel = async (userIds: string[], createdBy: string, isPrivate: boolean, hashKey: string) => {

    const newChannel = new Channel({
        isPrivate,
        channelHash: hashKey,
        createdBy,
        users: userIds
    });

    const res = await newChannel.save();

    //now update all users with the new channel, addToSet avoids duplicates
    await Promise.all(userIds.map(async (userId) => {
        await User.findByIdAndUpdate(userId, {
            $addToSet: { channels: res._id }
        });
    }));

};


const getAllUserChannels = async (userId: string) => {
    const userChannels = await User.findById(userId).populate('users');
    if (!userChannels) {
        console.log(`Could not find user channels for user id ${userId}`);
    }
};
// const buildChannelName = async (userIds: string[], createdByUsername: string, isPrivate: boolean): Promise<string> => {
//     const users = await User.find({ _id: { $in: userIds } });
//     if (!users) {
//         console.log('Users not found');
//         return '';
//     }
//     if (isPrivate) {
//         //means only one recipient
//         const recipient = users.find(user => user.username !== createdByUsername);
//         return recipient
//     }
//
//
// };

export default {
    checkCreateChannel,
    getAllUserChannels

};
