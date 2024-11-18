import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


export interface IUser extends Document {
    email: string;
    password: string;
    name: string,
    username: string,
    channels: mongoose.Schema.Types.ObjectId[],
    comparePasswords: (candidatePassword: string) => Promise<boolean>;
}


const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    channels: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Channel',
        required: false
    }
});

userSchema.methods.comparePasswords = async function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model<IUser>('User', userSchema);

export default userModel;