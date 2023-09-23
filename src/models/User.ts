import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    name: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    registration: string;
    cpf: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, require: true },
        lastName: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true },
        phone: { type: String, require: true },
        registration: { type: String, require: true },
        cpf: { type: String, require: true }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IUserModel>('User', UserSchema);
