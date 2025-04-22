'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminReports() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [faculties, setFaculties] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [degrees, setDegrees] = useState<string[]>([]);
  const [batches, setBatches] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    faculty: '',
    department: '',
    degree: '',
    batch: '',
    semester: '',
  });
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/unauthorized');
    } else if (status === 'authenticated') {
      fetchFilterOptions();
    }
  }, [status, session, router]);

  const fetchFilterOptions = async () => {
    try {
      // In a real app, you'd fetch this data from your API
      // For now, we'll use mock data
      setFaculties(['Engineering', 'Science', 'Business']);
      setDepartments(['Computer Science', 'Electrical Engineering', 'Mathematics']);
      setDegrees(['BSc', 'MSc', 'PhD']);
      setBatches(['2020', '2021', '2022', '2023']);
      setLoading(false);
    } catch (err) {
      setError('Failed to load filter options');
      console.error(err);
      setLoading(false);
    }
  };

  const handleFilterChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleDownload = async (format: string) => {
    setDownloading(true);
    try {
      // In a real app, you'd make an API call to download the data
      // For example:
      // const response = await fetch('/api/reports/download', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...filters, format }),
      // });
      
      // Simulate a download delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success message or actual file download would happen here
      alert(`Downloaded ${format} report with filters: ${JSON.stringify(filters)}`);
    } catch (err) {
      setError('Failed to download report');
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  if (loading && status !== 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Exam Registration Reports</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Faculty
              </label>
              <select
                name="faculty"
                value={filters.faculty}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Faculties</option>
                {faculties.map((faculty) => (
                  <option key={faculty} value={faculty}>
                    {faculty}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree
              </label>
              <select
                name="degree"
                value={filters.degree}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Degrees</option>
                {degrees.map((degree) => (
                  <option key={degree} value={degree}>
                    {degree}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Batch
              </label>
              <select
                name="batch"
                value={filters.batch}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Batches</option>
                {batches.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semester
              </label>
              <select
                name="semester"
                value={filters.semester}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Semesters</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t flex flex-wrap gap-3">
          <button
            onClick={() => handleDownload('excel')}
            disabled={downloading}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {downloading ? 'Downloading...' : 'Download Excel'}
          </button>
          
          <button
            onClick={() => handleDownload('pdf')}
            disabled={downloading}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {downloading ? 'Downloading...' : 'Download PDF'}
          </button>
          
          <button
            onClick={() => handleDownload('csv')}
            disabled={downloading}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {downloading ? 'Downloading...' : 'Download CSV'}
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Report Preview</h2>
          
          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Index Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Batch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subjects
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* In a real app, this would be populated with actual data */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">20APSE4849</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Computer Science</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2020</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">21BPSE5721</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jane Doe</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Computer Science</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2021</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">20APSE4532</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Michael Johnson</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Electrical Engineering</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2020</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )};