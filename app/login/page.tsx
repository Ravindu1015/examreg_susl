'use client';

import LoginForm from '@/components/forms/LoginForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role) {
      const redirectPath =
        session.user.role === 'admin'
          ? '/admin/dashboard'
          : '/student/dashboard';
      router.push(redirectPath);
    }
  }, [status, session, router]);

  if (status === 'loading' || (status === 'authenticated' && !session?.user?.role)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Use your university index number and password
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-600">
        <p>
          Need help?{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Contact the IT helpdesk
          </a>
        </p>
      </div>
    </div>
  );
}
