

import mongoose, { Schema, model } from 'mongoose';
import Registration from '@/models/Registration';


export interface IRegistration {
  student: mongoose.Types.ObjectId;
  subject: mongoose.Types.ObjectId;
  academicYear: string;
  semester: number;
  registrationDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  paymentStatus?: 'pending' | 'paid';
}

const registrationSchema = new Schema<IRegistration>(
  {
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    academicYear: { type: String, required: true },
    semester: { type: Number, required: true },
    registrationDate: { type: Date, default: Date.now },
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected'], 
      default: 'pending' 
    },
    paymentStatus: { 
      type: String, 
      enum: ['pending', 'paid'], 
      default: 'pending' 
    },
  },
  { timestamps: true }
);

export default mongoose.models.Registration || model<IRegistration>('Registration', registrationSchema);