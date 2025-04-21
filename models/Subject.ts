import mongoose, { Schema, model } from 'mongoose';

export interface ISubject {
  code: string;
  name: string;
  faculty: string;
  department: string;
  degree: string;
  semester: number;
  credits: number;
  description?: string;
}

const subjectSchema = new Schema<ISubject>(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    faculty: { type: String, required: true },
    department: { type: String, required: true },
    degree: { type: String, required: true },
    semester: { type: Number, required: true },
    credits: { type: Number, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Subject || model<ISubject>('Subject', subjectSchema);