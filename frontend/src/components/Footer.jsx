import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaRegCommentDots,
  FaFileAlt,
  FaUser,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaUsers,
  FaShoppingBag,
  FaBookOpen,
  FaInfoCircle,
  FaEnvelope,
  FaQuestionCircle
} from 'react-icons/fa';

export default function Footer() {
  const { pathname } = useLocation();
  const isMobile = window.innerWidth < 768;

  return (
    <>
      {/* Desktop Footer */}
      {!isMobile && (
        <footer className="bg-white border-t border-green-200 mt-8">
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm text-gray-600">
            <div className="col-span-2">
              <h2 className="text-2xl font-bold text-green-700 mb-3">NoteNest</h2>
              <p className="text-gray-500 leading-relaxed">
                All-in-one solution for students and users to download notes, manage tasks, 
                explore blogs, book services, and connect via global chat.
              </p>
              <div className="mt-4 flex space-x-4 text-green-600">
                <a href="#" className="hover:text-green-800 transition-colors">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="hover:text-green-800 transition-colors">
                  <FaTwitter size={20} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/vishal-prajapati-445799289/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-green-800 transition-colors"
                >
                  <FaLinkedin size={20} />
                </a>
              </div>
              <p className="mt-6 text-xs text-gray-400">
                &copy; {new Date().getFullYear()} NoteNest | All rights reserved.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-green-700 mb-4 text-lg flex items-center">
                <FaHome className="mr-2" size={16} />
                Explore
              </h3>
              <ul className="space-y-2">
                <li><Link to="/dashboard" className="hover:text-green-600 transition-colors">Dashboard</Link></li>
                <li><Link to="/tasks" className="hover:text-green-600 transition-colors">My Tasks</Link></li>
                <li><Link to="/mypdf" className="hover:text-green-600 transition-colors">Notes</Link></li>
                <li><Link to="/chat" className="hover:text-green-600 transition-colors">Chat</Link></li>
                <li><Link to="/team" className="hover:text-green-600 transition-colors">Contributors</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-green-700 mb-4 text-lg flex items-center">
                <FaShoppingBag className="mr-2" size={16} />
                Services
              </h3>
              <ul className="space-y-2">
                <li><Link to="/easy-projects" className="hover:text-green-600 transition-colors">Browse Services</Link></li>
                <li><Link to="/my-bookings" className="hover:text-green-600 transition-colors">My Bookings</Link></li>
                <li><Link to="/blogs" className="hover:text-green-600 transition-colors">Read Blogs</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-green-700 mb-4 text-lg flex items-center">
                <FaQuestionCircle className="mr-2" size={16} />
                Support
              </h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-green-600 transition-colors flex items-center">
                  <FaInfoCircle className="mr-2" size={14} /> About Us
                </Link></li>
                <li><Link to="/contact" className="hover:text-green-600 transition-colors flex items-center">
                  <FaEnvelope className="mr-2" size={14} /> Contact Us
                </Link></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
        </footer>
      )}

      {/* Mobile Footer Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 w-full bg-white border-t border-green-200 flex justify-around items-center py-3 shadow-lg z-50">
          <Link
            to="/dashboard"
            className={`flex flex-col items-center text-xs ${pathname === '/dashboard' ? 'text-green-600 font-semibold' : 'text-gray-500'} transition-colors`}
          >
            <FaHome size={20} />
            <span className="mt-1">Home</span>
          </Link>
          <Link
            to="/chat"
            className={`flex flex-col items-center text-xs ${pathname === '/chat' ? 'text-green-600 font-semibold' : 'text-gray-500'} transition-colors`}
          >
            <FaRegCommentDots size={20} />
            <span className="mt-1">Chat</span>
          </Link>
          <Link
            to="/mypdf"
            className={`flex flex-col items-center text-xs ${pathname === '/mypdf' ? 'text-green-600 font-semibold' : 'text-gray-500'} transition-colors`}
          >
            <FaFileAlt size={20} />
            <span className="mt-1">Notes</span>
          </Link>
          <Link
            to="/profile"
            className={`flex flex-col items-center text-xs ${pathname === '/profile' ? 'text-green-600 font-semibold' : 'text-gray-500'} transition-colors`}
          >
            <FaUser size={20} />
            <span className="mt-1">Profile</span>
          </Link>
          <Link
            to="/team"
            className={`flex flex-col items-center text-xs ${pathname === '/team' ? 'text-green-600 font-semibold' : 'text-gray-500'} transition-colors`}
          >
            <FaUsers size={20} />
            <span className="mt-1">Contributors</span>
          </Link>
        </div>
      )}
    </>
  );
}