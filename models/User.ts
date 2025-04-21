import mongoose, { Schema, model, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  indexNumber: string;
  password: string;
  role: 'student' | 'admin';
  name: string;
  email: string;
  faculty?: string;
  department?: string;
  degree?: string;
  batch?: string;
  semester?: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    indexNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['student', 'admin'], default: 'student' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    faculty: { type: String },
    department: { type: String },
    degree: { type: String },
    batch: { type: String },
    semester: { type: Number },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export default mongoose.models.User || model<IUser, UserModel>('User', userSchema);
