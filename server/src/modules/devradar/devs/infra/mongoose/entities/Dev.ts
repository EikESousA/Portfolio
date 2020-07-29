import mongoose, { Schema, Document } from 'mongoose';

import PointSchema, {
  IPointSchema,
} from '@modules/devradar/devs/infra/mongoose/entities/utils/PointSchema';

export interface IDev extends Document {
  login: string;
  github_username: string;
  bio: string;
  avatar_url: string;
  techs: string[];
  location: IPointSchema;
}

const DevSchema: Schema = new Schema({
  login: {
    type: String,
    required: true,
  },
  github_username: {
    type: String,
    required: true,
  },
  bio: String,
  avatar_url: {
    type: String,
    required: true,
  },
  techs: {
    type: [String],
    required: true,
  },
  location: {
    type: PointSchema,
    index: '2dsphere',
  },
});

export default mongoose.model<IDev>('DevRadar_Dev', DevSchema);
