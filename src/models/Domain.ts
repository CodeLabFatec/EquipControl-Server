import IDomain from '../interfaces/domain';
import mongoose, { Schema } from 'mongoose';

const DomainSchema: Schema = new Schema(
    {
        name: { type: String, require: true }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

DomainSchema.index(
    {
        name: 1
    },
    {
        unique: true
    }
);

export default mongoose.model<IDomain>('Domain', DomainSchema);
