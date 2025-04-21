'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  interface RegistrationDeadline {
    id: number;
    subject: string;
    deadline: string;
  }

  const [stats, setStats] = useState<{
    registeredSubjects: number;
    upcomingExams: number;
    registrationDeadlines: RegistrationDeadline[];
  }>({
    registeredSubjects: 0,
    upcomingExams: 0,
    registrationDeadlines: [],
  });
  const [recentActivity, setRecentActivity] = useState<{ id: number; action: string; date: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'student') {
      router.push('/unauthorized');
    } else if (status === 'authenticated') {
      fetchDashboardData();
    }
  }, [status, session, router]);

  const fetchDashboardData = async () => {
    try {
      // In a real app, you'd fetch this data from your API
      // For now, we'll use mock data
      setStats({
        registeredSubjects: 3,
        upcomingExams: 2,
        registrationDeadlines: [
          { id: 1, subject: 'Database Systems', deadline: '2025-05-15' },
          { id: 2, subject: 'Web Development', deadline: '2025-05-20' },
        ],
      });

      setRecentActivity([
        { id: 1, action: 'Registered for Software Engineering', date: '2025-04-10' },
        { id: 2, action: 'Registered for Database Systems', date: '2025-04-08' },
        { id: 3, action: 'Updated profile information', date: '2025-04-05' },
      ]);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading && status !== 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Registered Subjects Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-700">Registered Subjects</h2>
              <p className="text-3xl font-bold text-gray-900">{stats.registeredSubjects}</p>
            </div>
          </div>
        </div>

        {/* Upcoming Exams Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-700">Upcoming Exams</h2>
              <p className="text-3xl font-bold text-gray-900">{stats.upcomingExams}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
          <div className="flex flex-col space-y-3">
            <a href="/student/register" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Register for New Exams
            </a>
            <a href="/student/history" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              View Registration History
            </a>
            <a href="/student/profile" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Update Profile
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration Deadlines */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Registration Deadlines</h3>
          </div>
          <div className="p-6">
            {stats.registrationDeadlines.length === 0 ? (
              <p className="text-gray-500">No upcoming deadlines</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {stats.registrationDeadlines.map((deadline) => (
                  <li key={deadline.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{deadline.subject}</p>
                        <p className="text-sm text-gray-500">Deadline: {deadline.deadline}</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Upcoming
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            {recentActivity.length === 0 ? (
              <p className="text-gray-500">No recent activity</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}