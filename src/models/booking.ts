import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  customer: mongoose.Types.ObjectId;
  service: mongoose.Types.ObjectId;
  salon: mongoose.Types.ObjectId;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

const BookingSchema: Schema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    salon: {
      type: Schema.Types.ObjectId,
      ref: 'Salon',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>('Booking', BookingSchema);
