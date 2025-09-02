import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import setting from '../assets/setting.png';
import { FaTasks , FaCog } from 'react-icons/fa';
import API from '../axios';

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    API.get('/users')
      .then(res => setUser(res.data))
      .catch(() => setUser(null)); // Ignore if not logged in
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-4 shadow-md text-white flex justify-between items-center">
      {/* Logo */}
      <h1
        className="text-2xl font-extrabold tracking-wide cursor-pointer"
        onClick={() => navigate('/dashboard')}
      >
        NoteNest
      </h1>

      {/* User Section */}
      {user ? (
        <div className="relative flex items-center gap-5">
          {/* Tasks Icon */}
          <Link
            to="/tasks"
            title="My Tasks"
            className="text-white hover:text-white/90 transition"
          >
            <FaTasks size={22} />
          </Link>

          {/* Avatar */}
          <FaCog
            size={28}
            className="cursor-pointer transition duration-200 hover:rotate-90"
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute top-14 right-0 bg-white text-gray-800 rounded-md shadow-lg w-40 py-2 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => setShowDropdown(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-red-100 text-sm text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="bg-white text-green-600 text-sm font-medium px-4 py-1.5 rounded-full hover:bg-green-50 transition"
        >
          Login
        </Link>
      )}
    </nav>
  );
}
