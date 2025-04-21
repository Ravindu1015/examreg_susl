export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Exam Registration</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">For Students</h3>
              <ul className="space-y-2">
                <li><a href="/student/dashboard" className="text-gray-300 hover:text-white">Dashboard</a></li>
                <li><a href="/student/register" className="text-gray-300 hover:text-white">Register</a></li>
                <li><a href="/student/history" className="text-gray-300 hover:text-white">History</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Academic Calendar</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Exam Schedule</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">University</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About University</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Faculties</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Administration</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} University Exam Registration System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }