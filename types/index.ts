import { User } from '@/models/User';
import { Subject } from '@/models/Subject';
import { Registration } from '@/models/Registration';

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
export type SubjectType = Subject;
export type RegistrationType = Registration;

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  total?: number;
  page?: number;
  totalPages?: number;
}