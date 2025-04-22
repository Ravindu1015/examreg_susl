

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET(req: Request) {
  try {
    const session = await getServerSession();

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const url = new URL(req.url);
    const search = url.searchParams.get('search');
    const faculty = url.searchParams.get('faculty');
    const department = url.searchParams.get('department');
    const batch = url.searchParams.get('batch');
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');

    const query: any = { role: 'student' };

    if (search) {
      query.$or = [
        { indexNumber: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (faculty) query.faculty = faculty;
    if (department) query.department = department;
    if (batch) query.batch = batch;

    const skip = (page - 1) * limit;
    const total = await User.countDocuments(query);
    const students = await User.find(query)
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort({ indexNumber: 1 });

    return NextResponse.json({
      data: students,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const body = await req.json();
    const { indexNumber, name, email, faculty, department, degree, batch, semester } = body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ indexNumber }, { email }] });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this index number or email already exists' },
        { status: 400 }
      );
    }

    // Create new student with default password (indexNumber)
    const newUser = new User({
      indexNumber,
      name,
      email,
      password: indexNumber, // Will be hashed by pre-save hook
      role: 'student',
      faculty,
      department,
      degree,
      batch,
      semester
    });

    await newUser.save();

    return NextResponse.json(
      { message: 'Student created successfully', userId: newUser._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json({ error: 'Failed to create student' }, { status: 500 });
  }
}