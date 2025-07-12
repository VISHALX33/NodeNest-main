import { useState } from 'react';
import API from '../axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', collegeStudent: false, gender: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/users/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="name" placeholder="Name" onChange={handleChange}
        className="w-full p-2 border rounded" required />
      <input type="email" name="email" placeholder="Gmail only" onChange={handleChange}
        className="w-full p-2 border rounded" required />
      <input type="tel" name="phone" placeholder="Phone" onChange={handleChange}
        className="w-full p-2 border rounded" required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange}
        className="w-full p-2 border rounded" required />

      <label className="block text-sm">
        <input type="checkbox" name="collegeStudent" onChange={handleChange}
          className="mr-2" />
        College Student
      </label>

      <select name="gender" onChange={handleChange} required
        className="w-full p-2 border rounded">
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
        Register
      </button>
    </form>
  );
}
