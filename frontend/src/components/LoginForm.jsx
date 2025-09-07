import { useState } from 'react';
import API from '../utils/axios';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [data, setData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false); // buffer state
  const navigate = useNavigate();

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent multiple clicks
    setLoading(true);

    try {
      const res = await API.post('/users/login', data);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false); // re-enable button after response
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-green-700">Welcome Back</h2>
        <p className="text-sm text-gray-600 mt-1">
          Please login
        </p>
      </div>

      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <button
        type="submit"
        disabled={loading} // disable while loading
        className={`w-full py-2 rounded-lg font-semibold transition ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
