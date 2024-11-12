import mongoose from 'mongoose';

const msgSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    senderUsername: {
        type: String,
        required: true
    },
    dstChannelId: {
        type: String,
        required: true
    }

});

const msgModel = mongoose.model('Message', msgSchema);

export default msgModel;