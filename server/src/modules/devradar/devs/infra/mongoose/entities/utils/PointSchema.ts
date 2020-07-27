import { Schema } from 'mongoose';

export interface IPointSchema {
  type: string;
  coordinates: number[];
}

const PointSchema: Schema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

export default PointSchema;
