import { Document } from 'mongoose';

export default interface IUser extends Document {
    name: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    phone: string;
    registration: string;
    cpf: string;
    image: IFile;
}

export interface IFile {
    base64: string;
    type: string;
}
