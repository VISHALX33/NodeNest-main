
import { useState } from 'react';
import API from '../utils/axios';
import { useNavigate, Link } from 'react-router-dom'; // 🆕 added Link
import { Eye, EyeOff } from "lucide-react";
import NoteNestLogo from "/NoteNestLogo.png";

export default function LoginForm() {
  const [data, setData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const res = await API.post('/users/login', data);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-green-100 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6 mb-10 shadow-lg border border-green-200">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 leading-snug">
            Discover Smart Study & Services with{" "}
            <span className="text-green-900">NoteNest</span>
          </h2>
          <p className="mt-3 text-green-700 text-sm max-w-md">
            One platform to download notes, manage tasks, chat with peers, and
            book services — all in one place.
          </p>
          <br />
          <br />
          <h2 className="text-xl md:text-xl font-bold text-green-800 leading-snug">
            Free RTU notes of all semester!!
          </h2>
          <h2 className="text-xl md:text-xl font-bold text-green-800 leading-snug">
            Select your semester to get free notes!!
          </h2>
        </div>
        <div className="flex-1">
          <img
            src={NoteNestLogo}
            alt="Study Illustration"
            className="hidden md:block w-66 max-w-xs md:max-w-sm mx-auto"
          />
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="text-center mb-2">
          <h2 className="text-2xl font-bold text-green-700">Welcome Back</h2>
          <p className="text-sm text-gray-600 mt-1">Please login</p>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* 👁️ Password with toggle */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Forgot password link (just under password field) */}
        <div className="text-right">
          <Link to="/forgot-password" className="text-sm text-green-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </>
  );
}
