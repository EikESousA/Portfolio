import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
});

export default mongoose.model<IUser>('aircnc_user', UserSchema);
