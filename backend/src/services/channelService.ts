import Channel, { IChannel } from '../models/channelModel';
import { createHash } from 'node:crypto';
import User from '../models/userModel';

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

        const newChannel = new Channel({
            isPrivate,
            channelHash: hashKey,
            createdBy,
            users: userIds
        });
        const res = await newChannel.save();


    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
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
    checkCreateChannel
};
