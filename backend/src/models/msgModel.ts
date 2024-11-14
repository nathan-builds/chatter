import mongoose from 'mongoose';

const msgSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dstChannelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
        required: true
    }

});

const msgModel = mongoose.model('Message', msgSchema);

export default msgModel;