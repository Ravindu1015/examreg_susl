'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminStudents() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    faculty: '',
    department: '',
    batch: ''
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/unauthorized');
    } else if (status === 'authenticated') {
      fetchStudents();
    }
  }, [status, session, router]);

  const fetchStudents = async () => {
    try {
      // In a real app, you'd fetch this data from your API
      // For now, we'll use mock data
      const mockStudents = [
        { id: 1, indexNumber: '20APSE4849', name: 'John Smith', email: 'john@example.com', faculty: 'Engineering', department: 'Computer Science', batch: '2020', semester: 4 },
        { id: 2, indexNumber: '21BPSE5721', name: 'Jane Doe', email: 'jane@example.com', faculty: 'Engineering', department: 'Electrical Engineering', batch: '2021', semester: 3 },
        { id: 3, indexNumber: '20APSE4532', name: 'Michael Johnson', email: 'michael@example.com', faculty: 'Science', department: 'Mathematics', batch: '2020', semester: 4 },
        { id: 4, indexNumber: '22CPSE1234', name: 'Sarah Williams', email: 'sarah@example.com', faculty: 'Business', department: 'Finance', batch: '2022', semester: 2 },
      ];

      setStudents(mockStudents);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    // Search term filter
    const matchesSearch = 
      student.indexNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Additional filters
    const matchesFaculty = filters.faculty ? student.faculty === filters.faculty : true;
    const matchesDepartment = filters.department ? student.department === filters.department : true;
    const matchesBatch = filters.batch ? student.batch === filters.batch : true;
    
    return matchesSearch && matchesFaculty && matchesDepartment && matchesBatch;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  if (loading && status !== 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Student Management</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="w-full md:w-1/3">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name, index or email"
                  className="block w-full pr-10 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-2/3">
              <select
                name="faculty"
                value={filters.faculty}
                onChange={handleFilterChange}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">All Faculties</option>
                <option value="Engineering">Engineering</option>
                <option value="Science">Science</option>
                <option value="Business">Business</option>
              </select>
              
              <select
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Finance">Finance</option>
              </select>
              
              <select
                name="batch"
                value={filters.batch}
                onChange={handleFilterChange}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">All Batches</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Index Number
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Faculty
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semester
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                    No students found
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.indexNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.faculty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.batch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.semester}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href={`/admin/students/${student.indexNumber}`} className="text-blue-600 hover:text-blue-900 mr-4">
                        View
                      </a>
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredStudents.length}</span> of{' '}
            <span className="font-medium">{filteredStudents.length}</span> students
          </div>
          <div className="flex space-x-2">
            <button
              disabled
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-gray-50 cursor-not-allowed"
            >
              Previous
            </button>
            <button
              disabled
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-gray-50 cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add New Student
        </button>
      </div>
    </div>
  );
}