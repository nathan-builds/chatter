import mongoose from 'mongoose';


export interface IChannel {
    _id: string,
    name: string,
    channelHash: string,
    isPrivate: boolean,
    createdBy: mongoose.Schema.Types.ObjectId,
    users: mongoose.Schema.Types.ObjectId[]
}

const channelSchema = new mongoose.Schema<IChannel>({
    name: {
        type: String,
        required: false,
        unique: false
    },
    channelHash: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isPrivate: {
        type: Boolean,
        required: true
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ]
});

const Channel = mongoose.model<IChannel>('Channel', channelSchema);
export default Channel;