import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../axios';

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get('/users')
      .then(res => setUser(res.data))
      .catch(() => setUser(null)); // ignore if not logged in
  }, []);

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate('/dashboard')}
      >
        NodeNest
      </h1>

      {user ? (
        <div
          className="cursor-pointer"
          onClick={() => navigate('/profile')}
        >
          <img
            src={user.image || 'https://i.pravatar.cc/40'}
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-white shadow"
          />
        </div>
      ) : (
        <Link to="/profile" className="hover:underline">Profile</Link>
      )}
    </nav>
  );
}
