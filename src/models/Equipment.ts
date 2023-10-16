import IEquipment from '../interfaces/equipment';
import mongoose, { Schema } from 'mongoose';

const EquipmentSchema: Schema = new Schema(
    {
        name: { type: String, require: true },
        latitude: { type: String, require: true },
        longitude: { type: String, require: true },
        domain: { type: Object, require: true },
        serial: { type: String, require: true },
        notes: { type: String, require: false },
        files: { type: Array, require: false },
        isActive: { type: Boolean, default: true },
        created_by: { type: Object, required: true }
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

export default mongoose.model<IEquipment>('Equipment', EquipmentSchema);
