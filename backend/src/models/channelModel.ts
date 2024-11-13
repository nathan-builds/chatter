import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        unique: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    users: {
        type: Array,
        required: true
    }
});

const Channel = mongoose.model('Channel', channelSchema);
export default Channel;