import mongoose, { Schema, Document } from 'mongoose';

export interface IDev extends Document {
  name: string;
  user: string;
  bio: string;
  avatar: string;
  likes?: IDev['_id'];
  dislikes?: IDev['_id'];
}

const DevSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    bio: String,
    avatar: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'tindev_dev',
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'tindev_dev',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IDev>('tindev_dev', DevSchema);
