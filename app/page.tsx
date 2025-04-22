'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-red-900 to-silver-700">
        <div className="container mx-auto px-4 py-24 sm:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              University Exam Registration Portal
            </h1>
            <p className="mt-6 max-w-xl text-xl text-blue-100">
              A streamlined platform for students to register for their exams and for administrators to track and manage registrations efficiently.
            </p>
            <div className="mt-10 flex gap-4">
              <Link href="/login" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                Student Login
              </Link>
              <Link href="/register" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 bg-opacity-60 hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simplify Your Exam Registration Process
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our platform provides an easy and efficient way to manage your exam registrations.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Easy Registration</h3>
              <p className="mt-2 text-base text-gray-500">
                Register for your exams in just a few clicks. Add subjects by their codes or names.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Track Your History</h3>
              <p className="mt-2 text-base text-gray-500">
                View your complete registration history and current status for each subject.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Instant Updates</h3>
              <p className="mt-2 text-base text-gray-500">
                Get real-time notifications about deadlines, registration status, and exam schedules.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-700 rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 lg:flex lg:items-center lg:py-16">
              <div className="lg:w-0 lg:flex-1">
                <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  Ready to register for your exams?
                </h2>
                <p className="mt-3 max-w-lg text-lg text-blue-100">
                  Sign in with your student index number to get started or create a new account if you haven't registered yet.
                </p>
              </div>
              <div className="mt-8 flex lg:mt-0 lg:ml-8">
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Link href="/login" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50">
                    Sign In
                  </Link>
                  <Link href="/register" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 bg-opacity-70 hover:bg-opacity-80">
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Common questions about the exam registration process.
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white shadow overflow-hidden rounded-md">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">When can I register for exams?</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Registration typically opens 4 weeks before the examination period and closes 2 weeks before the first exam. Check the academic calendar for specific dates.
                  </p>
                </div>
              </div>

              <div className="bg-white shadow overflow-hidden rounded-md">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">Can I change my registered subjects?</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Yes, you can add or remove subjects until the registration deadline. After the deadline, you'll need to contact the examination office for any changes.
                  </p>
                </div>
              </div>

              <div className="bg-white shadow overflow-hidden rounded-md">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">How do I know my registration is complete?</h3>
                  <p className="mt-2 text-base text-gray-500">
                    After registration, you'll receive a confirmation email. You can also check your registration status in the "History" section of your dashboard.
                  </p>
                </div>
              </div>

              <div className="bg-white shadow overflow-hidden rounded-md">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">I forgot my password, what should I do?</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Click on the "Forgot Password" link on the login page. You'll receive instructions to reset your password via email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}