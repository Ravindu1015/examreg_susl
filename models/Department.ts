import mongoose, { Schema, model } from 'mongoose';

export interface IDepartment {
  name: string;
  code: string;
  faculty: mongoose.Types.ObjectId;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const departmentSchema = new Schema<IDepartment>(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Department || model<IDepartment>('Department', departmentSchema);