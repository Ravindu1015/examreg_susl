'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function RegistrationHistory() {
  const { data: session, status } = useSession();
  const router = useRouter();
  interface Registration {
    id: number;
    subject: string;
    code: string;
    semester: number;
    registrationDate: string;
    status: string;
    examDate: string;
    reason?: string;
  }

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'student') {
      router.push('/unauthorized');
    } else if (status === 'authenticated') {
      fetchRegistrationHistory();
    }
  }, [status, session, router]);

  const fetchRegistrationHistory = async () => {
    try {
      // In a real app, you'd fetch this data from your API
      // For now, we'll use mock data
      const mockRegistrations = [
        {
          id: 1,
          subject: 'Web Development',
          code: 'CS3402',
          semester: 4,
          registrationDate: '2025-03-15',
          status: 'approved',
          examDate: '2025-05-20',
        },
        {
          id: 2,
          subject: 'Database Systems',
          code: 'CS3201',
          semester: 4,
          registrationDate: '2025-03-16',
          status: 'approved',
          examDate: '2025-05-25',
        },
        {
          id: 3,
          subject: 'Software Engineering',
          code: 'CS3301',
          semester: 4,
          registrationDate: '2025-03-17',
          status: 'pending',
          examDate: '2025-06-02',
        },
        {
          id: 4,
          subject: 'Artificial Intelligence',
          code: 'CS4102',
          semester: 4,
          registrationDate: '2025-03-18',
          status: 'rejected',
          reason: 'Prerequisite not met',
          examDate: '2025-06-10',
        },
      ];

      setRegistrations(mockRegistrations);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching registration history:', error);
      setLoading(false);
    }
  };

  const filteredRegistrations = registrations.filter((reg) => {
    if (filter === 'all') return true;
    return reg.status === filter;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && status !== 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Registration History</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Your Exam Registrations</h2>
            
            <div className="mt-4 sm:mt-0">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Registrations</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No registrations found
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((reg) => (
                  <tr key={reg.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{reg.subject}</div>
                      <div className="text-sm text-gray-500">Semester {reg.semester}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reg.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reg.registrationDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reg.examDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(reg.status)}`}>
                        {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                      </span>
                      {reg.reason && (
                        <p className="mt-1 text-xs text-red-600">{reg.reason}</p>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}