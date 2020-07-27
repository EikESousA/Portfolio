import mongoose, { Schema, Document } from 'mongoose';

import { IUser } from '@modules/aircnc/users/infra/mongoose/entities/User';

export interface ISpot extends Document {
  thumbnail: string;
  company: string;
  price: number;
  techs: string[];
  user: IUser['_id'];
}

const SpotSchema: Schema = new Schema(
  {
    thumbnail: { type: String, required: true },
    company: { type: String, required: true },
    price: { type: Number, required: true },
    techs: { type: [String], required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AirCnC_User',
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

SpotSchema.virtual('thumbnail_url').get(function thumbnail_url_virtual(this: {
  thumbnail: string;
}) {
  return `http://${process.env.APP_IP}:3333/files/${this.thumbnail}`;
});

export default mongoose.model<ISpot>('AirCnC_Spot', SpotSchema);
