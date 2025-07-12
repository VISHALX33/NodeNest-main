import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/dashboard')}>NodeNest</h1>
      <div className="flex items-center gap-4">
        <Link to="/profile" className="hover:underline">Profile</Link>
      </div>
    </nav>
  );
}
