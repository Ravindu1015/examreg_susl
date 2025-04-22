// app/api/login/route.ts
import { NextResponse } from 'next/server';
import User from '@/models/User'; // Make sure this model exists
import connectDB from '@/lib/db'; // DB connection helper
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  return NextResponse.json({ message: 'Login successful', user });
}
