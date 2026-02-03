import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'owner';
  isVerified: boolean;
  otp?: string;
  resetToken?: string;
  resetTokenExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ['customer', 'owner'], 
      default: 'customer' 
    },
    // NEW FIELDS FOR THE UI FLOW
    isVerified: { 
      type: Boolean, 
      default: false 
    },
    otp: { 
      type: String 
    }, // Used for Screen 6 (Phone Verification)
    resetToken: { 
      type: String 
    }, // Used for Screen 9 (Password Reset)
    resetTokenExpires: { 
      type: Date 
    }, // Security: code expires after 10-15 mins
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);