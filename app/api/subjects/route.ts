import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/db';
import Subject from '@/models/Subject';

export async function GET(req: { url: string | URL; }) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Extract query parameters
    const url = new URL(req.url);
    const faculty = url.searchParams.get('faculty');
    const department = url.searchParams.get('department');
    const degree = url.searchParams.get('degree');
    const semester = url.searchParams.get('semester');

    // Build query
    const query: { faculty?: string; department?: string; degree?: string; semester?: number } = {};
    if (faculty) query.faculty = faculty;
    if (department) query.department = department;
    if (degree) query.degree = degree;
    if (semester) query.semester = parseInt(semester);

    const subjects = await Subject.find(query).sort({ code: 1 });

    return NextResponse.json(subjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return NextResponse.json({ error: 'Failed to fetch subjects' }, { status: 500 });
  }
}

export async function POST(req: { json: () => any; }) {
  try {
    const session = await getServerSession();

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const body = await req.json();
    const subject = new Subject(body);
    await subject.save();

    return NextResponse.json(subject, { status: 201 });
  } catch (error) {
    console.error('Error creating subject:', error);
    return NextResponse.json({ error: 'Failed to create subject' }, { status: 500 });
  }
}