import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


interface IUser extends Document {
    email: string;
    password: string;
    name: string,
    username: string
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}


const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
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
    }
});

userSchema.methods.comparePasswords = async function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model<IUser>('User', userSchema);

export default userModel;