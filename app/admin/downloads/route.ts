import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/db';
import Registration from '@/models/Registration';
import User from '@/models/User';
import Subject from '@/models/Subject';

export async function POST(req) {
  try {
    const session = await getServerSession();

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const body = await req.json();
    const { faculty, department, degree, batch, semester, format } = body;
    
    // Build query for user filtering
    const userQuery = {};
    if (faculty) userQuery.faculty = faculty;
    if (department) userQuery.department = department;
    if (degree) userQuery.degree = degree;
    if (batch) userQuery.batch = batch;
    
    // Find matching users
    const users = await User.find({ ...userQuery, role: 'student' });
    const userIds = users.map(user => user._id);
    
    // Build registration query
    const registrationQuery = {
      student: { $in: userIds }
    };
    
    if (semester) {
      registrationQuery.semester = parseInt(semester);
    }
    
    // Get registrations with populated student and subject data
    const registrations = await Registration.find(registrationQuery)
      .populate('student', 'indexNumber name email faculty department degree batch')
      .populate('subject', 'code name faculty department semester')
      .sort({ 'student.indexNumber': 1 });
    
    // Format the data for export
    // In a real app, you would transform this data based on the format (CSV, Excel, PDF)
    const reportData = registrations.map(reg => ({
      indexNumber: reg.student.indexNumber,
      studentName: reg.student.name,
      studentEmail: reg.student.email,
      faculty: reg.student.faculty,
      department: reg.student.department,
      degree: reg.student.degree,
      batch: reg.student.batch,
      subjectCode: reg.subject.code,
      subjectName: reg.subject.name,
      semester: reg.semester,
      registrationDate: reg.registrationDate.toISOString().split('T')[0],
      status: reg.status
    }));
    
    // In a real implementation, you would:
    // 1. Generate the appropriate file based on the format
    // 2. Return it as a downloadable response
    
    // For now, just return the data
    return NextResponse.json({ 
      message: 'Report generated successfully',
      format,
      count: reportData.length,
      data: reportData
    });
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}