import mongoose, { Schema, Document } from 'mongoose';

export interface ISalon extends Document {
  owner: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
  openingHours?: {
    day: string;
    open: string;
    close: string;
    isClosed?: boolean;
  }[];
  services?: mongoose.Types.ObjectId[];
  images?: string[];
  isActive: boolean;
}

const SalonSchema: Schema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      },
    },
    openingHours: [
      {
        day: { type: String, required: true },
        open: { type: String, required: true },
        close: { type: String, required: true },
        isClosed: { type: Boolean, default: false },
      },
    ],
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Service',
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

SalonSchema.index({ location: '2dsphere' });

export default mongoose.model<ISalon>('Salon', SalonSchema);
