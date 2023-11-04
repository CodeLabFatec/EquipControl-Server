import IUser from '../interfaces/user';
import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema(
    {
        name: { type: String, require: true },
        lastName: { type: String, require: true },
        email: { type: String, require: true },
        username: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        phone: { type: String, require: true },
        registration: { type: String, require: true },
        cpf: { type: String, require: true },
        image: { type: Object, required: false },
        isAdmin: { type: Boolean, require: true },
        recoverCode: { type: String, required: false }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

UserSchema.index(
    {
        username: 1,
        email: 1
    },
    {
        unique: true
    }
);

export default mongoose.model<IUser>('User', UserSchema);
