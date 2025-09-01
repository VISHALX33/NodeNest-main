import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaRegCommentDots,
  FaFileAlt,
  FaUser,
  FaFacebook,
  FaTwitter,
  FaLinkedin
} from 'react-icons/fa';

export default function Footer() {
  const { pathname } = useLocation();
  const isMobile = window.innerWidth < 768;

  return (
    <>
      {/* Desktop Footer */}
      {!isMobile && (
        <footer className="bg-white border-t border-green-200 mt-8">
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-6 text-sm text-gray-600">
            <div className="col-span-2">
              <h2 className="text-xl font-bold text-green-700">NoteNest</h2>
              <p className="mt-2 text-gray-500">
                All-in-one solution for students and users to download notes, manage tasks, explore blogs, book services, and connect via global chat.
              </p>
              <p className="mt-4 text-xs text-gray-400">
                &copy; {new Date().getFullYear()} NoteNest | All rights reserved.
              </p>
              <div className="mt-3 flex space-x-4 text-green-600">
                <a href="#"><FaFacebook className="hover:text-green-800" /></a>
                <a href="#"><FaTwitter className="hover:text-green-800" /></a>
                <a href="#"><FaLinkedin className="hover:text-green-800" /></a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-green-700 mb-2">Explore</h3>
              <ul className="space-y-1">
                <li><Link to="/dashboard" className="hover:text-green-600">Dashboard</Link></li>
                <li><Link to="/tasks" className="hover:text-green-600">My Tasks</Link></li>
                <li><Link to="/mypdf" className="hover:text-green-600">Notes</Link></li>
                <li><Link to="/chat" className="hover:text-green-600">Chat</Link></li>
                {/* Add under Explore or Support section */}
<li>
  <Link to="/team" className="hover:text-green-600">Our Team</Link>
</li>

              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-green-700 mb-2">Services</h3>
              <ul className="space-y-1">
                <li><Link to="/dashboard" className="hover:text-green-600">Browse Services</Link></li>
                <li><Link to="/dashboard" className="hover:text-green-600">Shop Products</Link></li>
                <li><Link to="/dashboard" className="hover:text-green-600">Read Blogs</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-green-700 mb-2">Support</h3>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-green-600">Help Center</a></li>
                <li><a href="#" className="hover:text-green-600">Contact Us</a></li>
                <li><a href="#" className="hover:text-green-600">Careers</a></li>
              </ul>
            </div>
          </div>
        </footer>
      )}

      {/* Mobile Footer Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 w-full bg-white border-t border-green-200 flex justify-around items-center py-2 shadow-lg z-50">
          <Link
            to="/dashboard"
            className={`flex flex-col items-center text-xs ${
              pathname === '/dashboard' ? 'text-green-600 font-semibold' : 'text-gray-500'
            }`}
          >
            <FaHome size={20} />
            Home
          </Link>
          <Link
            to="/chat"
            className={`flex flex-col items-center text-xs ${
              pathname === '/chat' ? 'text-green-600 font-semibold' : 'text-gray-500'
            }`}
          >
            <FaRegCommentDots size={20} />
            Chat
          </Link>
          <Link
            to="/mypdf"
            className={`flex flex-col items-center text-xs ${
              pathname === '/mypdf' ? 'text-green-600 font-semibold' : 'text-gray-500'
            }`}
          >
            <FaFileAlt size={20} />
            Notes
          </Link>
          <Link
            to="/profile"
            className={`flex flex-col items-center text-xs ${
              pathname === '/profile' ? 'text-green-600 font-semibold' : 'text-gray-500'
            }`}
          >
            <FaUser size={20} />
            Profile
          </Link>
          <Link
  to="/team"
  className={`flex flex-col items-center text-xs ${
    pathname === '/team' ? 'text-green-600 font-semibold' : 'text-gray-500'
  }`}
>
  <FaUser size={20} />
  Team
</Link>

        </div>
      )}
    </>
  );
}
