import { Document } from 'mongoose';

export default interface IDomain extends Document {
    name: string;
}
