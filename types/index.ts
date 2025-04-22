import { IUser } from '@/models/User';
import { ISubject } from '@/models/Subject';
import { IRegistration } from '@/models/Registration';
import { User } from 'next-auth';

export interface SessionUser {
  id: string;
  indexNumber: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  faculty?: string;
  department?: string;
  degree?: string;
  batch?: string;
}

export type UserType = User;
export type SubjectType = ISubject;
export type RegistrationType = IRegistration;

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  total?: number;
  page?: number;
  totalPages?: number;
}