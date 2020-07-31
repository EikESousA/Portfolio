import mongoose, { Schema, Document } from 'mongoose';

import { IUser } from '@modules/aircnc/users/infra/mongoose/entities/User';
import { ISpot } from '@modules/aircnc/spots/infra/mongoose/entities/Spot';

export interface IBooking extends Document {
  date: string;
  approved?: boolean;
  user: IUser['_id'];
  spot: ISpot['_id'];
}

const BookingSchema: Schema = new Schema({
  date: { type: String, required: true },
  approved: { type: Boolean, required: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'aircnc_user',
    required: true,
  },
  spot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'aircnc_spot',
    required: true,
  },
});

export default mongoose.model<IBooking>('aircnc_booking', BookingSchema);
