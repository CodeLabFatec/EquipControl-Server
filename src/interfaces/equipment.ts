import { Document } from 'mongoose';
import IUser from './user';
import IDomain from './domain';

export default interface IEquipment extends Document {
    name: string;
    latitude: string;
    longitude: string;
    domain: IDomain;
    serial: string;
    notes?: string;
    files?: IFile[];
    isActive: boolean;
    created_at: Date;
    updated_at: Date;
    created_by: ICreatedBy;
}

export interface IFile {
    base64: string;
    type: string;
}

export interface ICreatedBy {
    id: string;
    name: string;
}
