import Channel, { IChannel } from '../models/channelModel';
import { createHash } from 'node:crypto';

export const checkCreateChannel = async (userIds: string[], createdBy: string): Promise<boolean> => {

    userIds.sort();
    const hashKey = createHash('sha256')
        .update(userIds.join(','))
        .digest('hex');
    console.log('Hash Key: ', hashKey);

    try {
        const channel = await Channel.findOne({ channelHash: hashKey });
        console.log('Channel: ', channel);
        if (channel) {
            return true;
        }

        const newChannel = new Channel({
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

export default {
    checkCreateChannel
};
