// src/components/Footer.jsx
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaRegCommentDots, FaFileAlt, FaUser } from 'react-icons/fa';

export default function Footer() {
  const { pathname } = useLocation();

  const isMobile = window.innerWidth < 768;

  return (
    <>
      {/* 🌐 Desktop Footer */}
      {!isMobile && (
        <footer className="bg-gray-800 text-white text-center py-3">
          &copy; {new Date().getFullYear()} NodeNest | All rights reserved.
        </footer>
      )}

      {/* 📱 Mobile Bottom Navbar */}
      {isMobile && (
        <div className="fixed bottom-0 w-full bg-white border-t flex justify-around items-center py-2 shadow-md z-50">
          <Link to="/dashboard" className={`flex flex-col items-center text-xs ${pathname === '/dashboard' ? 'text-blue-600' : 'text-gray-600'}`}>
            <FaHome size={20} />
            Home
          </Link>
          <Link to="/chat" className={`flex flex-col items-center text-xs ${pathname === '/chat' ? 'text-blue-600' : 'text-gray-600'}`}>
            <FaRegCommentDots size={20} />
            Chat
          </Link>
          <Link to="/mypdf" className={`flex flex-col items-center text-xs ${pathname === '/mypdf' ? 'text-blue-600' : 'text-gray-600'}`}>
            <FaFileAlt size={20} />
            My PDFs
          </Link>
          <Link to="/profile" className={`flex flex-col items-center text-xs ${pathname === '/profile' ? 'text-blue-600' : 'text-gray-600'}`}>
            <FaUser size={20} />
            Profile
          </Link>
        </div>
      )}
    </>
  );
}
