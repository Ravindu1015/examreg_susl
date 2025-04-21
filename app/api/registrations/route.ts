import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import Registration from '@/models/Registration';
import Subject from '@/models/Subject';
import User from '@/models/User';

export async function GET(req) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const url = new URL(req.url);
    const studentId = url.searchParams.get('studentId');
    
    let query = {};
    
    if (session.user.role === 'student') {
      // Students can only view their own registrations
      const user = await User.findOne({ indexNumber: session.user.indexNumber });
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      query.student = user._id;
    } else if (session.user.role === 'admin' && studentId) {
      // Admins can view registrations for a specific student
      query.student = studentId;
    }

    const registrations = await Registration.find(query)
      .populate('student', 'indexNumber name')
      .populate('subject', 'code name faculty department')
      .sort({ registrationDate: -1 });

    return NextResponse.json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession();

    if (!session || session.user.role !== 'student') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const body = await req.json();
    const { subjects } = body;
    
    if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
      return NextResponse.json({ error: 'No subjects provided' }, { status: 400 });
    }
    
    const user = await User.findOne({ indexNumber: session.user.indexNumber });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Get current academic year (e.g., "2024/2025")
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const academicYear = month < 8 
      ? `${year-1}/${year}` 
      : `${year}/${year+1}`;
    
    // Create registrations for each subject
    const registrationPromises = subjects.map(async (subjectId) => {
      // Check if subject exists
      const subject = await Subject.findById(subjectId);
      if (!subject) {
        throw new Error(`Subject with ID ${subjectId} not found`);
      }
      
      // Check if student already registered for this subject
      const existingRegistration = await Registration.findOne({
        student: user._id,
        subject: subject._id,
        academicYear
      });
      
      if (existingRegistration) {
        throw new Error(`Already registered for ${subject.name}`);
      }
      
      // Create new registration
      return new Registration({
        student: user._id,
        subject: subject._id,
        academicYear,
        semester: user.semester,
        registrationDate: new Date(),
        status: 'pending'
      }).save();
    });
    
    const results = await Promise.all(registrationPromises);
    
    return NextResponse.json({ 
      message: 'Registration successful', 
      count: results.length 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating registrations:', error);
    return NextResponse.json({ 
      error: 'Failed to register for subjects',
      message: error.message
    }, { status: 500 });
  }
}