import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: string;
  salon: mongoose.Types.ObjectId;
  isActive: boolean;
}

const ServiceSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    salon: {
      type: Schema.Types.ObjectId,
      ref: 'Salon',
      required: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IService>('Service', ServiceSchema);
