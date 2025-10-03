import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { Eye, EyeOff } from "lucide-react";

import register1 from "/register1.png";
import register2 from "/register2.png";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    collegeStudent: false,
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (formData.name.trim().length < 3) {
      alert("Name must be at least 3 characters long");
      return false;
    }
    if (!formData.email.endsWith("@gmail.com")) {
      alert("Email must be a valid Gmail address");
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Phone number must be 10 digits");
      return false;
    }
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    if (!formData.gender) {
      alert("Please select your gender");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!validateForm()) return;

    setLoading(true);
    try {
      await API.post("/users/register", formData);
      alert("OTP sent to your email. Please verify.");
      navigate("/verify-email", { state: { email: formData.email } });
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-50 to-emerald-100 px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Left Image */}
        <div className="hidden md:flex justify-center">
          <img
            src={register2}
            alt="Left Side"
            className="w-72 h-72 object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Form */}
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-emerald-100">
          <h2 className="text-2xl font-bold text-center text-emerald-700 mb-6">
            Create Your Account ✨
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Gmail only"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-emerald-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-emerald-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* College Student */}
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                name="collegeStudent"
                checked={formData.collegeStudent}
                onChange={handleChange}
                className="mr-2 accent-emerald-500"
              />
              I am a college student
            </label>

            {/* Gender */}
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-emerald-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg text-white font-semibold transition duration-200 ${
                loading
                  ? "bg-emerald-300 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>

        {/* Right Image */}
        <div className="hidden md:flex justify-center">
          <img
            src={register1}
            alt="Right Side"
            className="w-72 h-72 object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
