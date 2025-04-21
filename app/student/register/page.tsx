'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function RegisterForExams() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'student') {
      router.push('/unauthorized');
    } else if (status === 'authenticated') {
      fetchAvailableSubjects();
    }
  }, [status, session, router]);

  const fetchAvailableSubjects = async () => {
    try {
      // Replace with actual API endpoint
      const response = await fetch('/api/subjects/available', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch subjects');
      }

      const data = await response.json();
      setSubjects(data);
    } catch (err) {
      setError('Failed to load available subjects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSubjectSelection = (subjectId) => {
    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(selectedSubjects.filter(id => id !== subjectId));
    } else {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedSubjects.length === 0) {
      setError('Please select at least one subject');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Replace with actual API endpoint
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subjects: selectedSubjects,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register for subjects');
      }

      setSuccess('Successfully registered for selected subjects!');
      setSelectedSubjects([]);
    } catch (err) {
      setError('Failed to register for subjects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && status !== 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Register for Exams</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Available Subjects</h2>
            
            {subjects.length === 0 ? (
              <p className="text-gray-500">No subjects available for registration</p>
            ) : (
              <div className="space-y-3">
                {subjects.map((subject) => (
                  <div 
                    key={subject._id}
                    className="flex items-center p-3 border rounded-md hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      id={`subject-${subject._id}`}
                      checked={selectedSubjects.includes(subject._id)}
                      onChange={() => toggleSubjectSelection(subject._id)}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label 
                      htmlFor={`subject-${subject._id}`}
                      className="ml-3 flex-1 cursor-pointer"
                    >
                      <div className="font-medium">{subject.name}</div>
                      <div className="text-sm text-gray-600">
                        {subject.code} • {subject.credits} credits • Semester {subject.semester}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
            <button
              type="submit"
              disabled={loading || selectedSubjects.length === 0}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registering...' : 'Register for Selected Subjects'}
            </button>
          </div>
        </div>
      </form>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Registration Guidelines</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>You can register for subjects from your current semester only</li>
          <li>Registration deadline is two weeks before exam date</li>
          <li>You must have completed all prerequisites for selected subjects</li>
          <li>Any outstanding fees must be cleared before registration</li>
        </ul>
      </div>
    </div>
  );
}