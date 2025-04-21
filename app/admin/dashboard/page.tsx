'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalStudents: 0,
    pendingRegistrations: 0,
    totalSubjects: 0,
    recentRegistrations: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/unauthorized');
    } else if (status === 'authenticated') {
      fetchDashboardData();
    }
  }, [status, session, router]);

  const fetchDashboardData = async () => {
    try {
      // In a real app, you'd fetch this data from your API
      setStats({
        totalStudents: 1245,
        pendingRegistrations: 42,
        totalSubjects: 87,
        recentRegistrations: [
          { id: 1, student: '20APSE4849', subject: 'Database Systems', date: '2025-04-20' },
          { id: 2, student: '21BPSE5721', subject: 'Web Development', date: '2025-04-19' },
          { id: 3, student: '20APSE4532', subject: 'Software Engineering', date: '2025-04-18' }
        ]
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading && status !== 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Students Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-700">Total Students</h2>
              <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
            </div>
          </div>
        </div>

        {/* Pending Registrations Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-700">Pending Registrations</h2>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingRegistrations}</p>
            </div>
          </div>
        </div>

        {/* Total Subjects Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-700">Total Subjects</h2>
              <p className="text-3xl font-bold text-gray-900">{stats.totalSubjects}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Registrations */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Registrations</h3>
          </div>
          <div className="p-6">
            {stats.recentRegistrations.length === 0 ? (
              <p className="text-gray-500">No recent registrations</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {stats.recentRegistrations.map((reg) => (
                  <li key={reg.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{reg.student}</p>
                        <p className="text-sm text-gray-500">{reg.subject}</p>
                      </div>
                      <p className="text-sm text-gray-500">{reg.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4">
              <a 
                href="/admin/students" 
                className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50"
              >
                <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Manage Students</h4>
                  <p className="text-xs text-gray-500">View and manage student accounts</p>
                </div>
              </a>

              <a 
                href="/admin/reports" 
                className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50"
              >
                <div className="p-2 rounded-full bg-green-100 text-green-600 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Generate Reports</h4>
                  <p className="text-xs text-gray-500">Download registration reports</p>
                </div>
              </a>

              <a 
                href="/admin/subjects" 
                className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50"
              >
                <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Manage Subjects</h4>
                  <p className="text-xs text-gray-500">Add or edit available subjects</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}