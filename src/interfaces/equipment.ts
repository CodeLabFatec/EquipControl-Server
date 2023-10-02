import { Document } from 'mongoose';

export default interface IEquipment extends Document {
    name: string;
    latitude: string;
    longitude: string;
    domain: string;
    serial: string;
    notes?: string;
    files?: IFile[];
    isActive: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface IFile {
    base64: string;
    type: string;
}