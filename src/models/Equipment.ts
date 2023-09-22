import mongoose, { Document, Schema } from 'mongoose';

export interface IEquipment {
    name: string;
    latitude: number;
    longitude: number;
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

export interface IEquipmentModel extends IEquipment, Document {}
export interface IFileModel extends IFile, Document {}

const EquipmentSchema: Schema = new Schema(
    {
        name: { type: String, require: true },
        latitude: { type: String, require: true },
        longitude: { type: String, require: true },
        domain: { type: String, require: true },
        serial: { type: String, require: true },
        notes: { type: String, require: false },
        files: { type: Array, require: false },
        isActive: { type: Boolean, default: true }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const FileSchema: Schema = new Schema(
    {
        base64: { type: String, require: true },
        type: { type: String, require: true }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IEquipmentModel>('Equipment', EquipmentSchema);
