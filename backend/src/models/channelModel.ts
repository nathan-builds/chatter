import mongoose from 'mongoose';


const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    users: {
        type: Array,
        required: true
    }
});
