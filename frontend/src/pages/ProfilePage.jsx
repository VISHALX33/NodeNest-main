import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axios';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/users')
      .then(res => {
        setUser(res.data);
        setForm(res.data);
      })
      .catch(() => navigate('/'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;
    await API.delete('/users');
    handleLogout();
  };

  const handleUpdate = async () => {
    const updatedData = {
      ...form,
      image: imageFile ? URL.createObjectURL(imageFile) : form.image,
    };

    try {
      const res = await API.put('/users', updatedData);
      setUser(res.data);
      setForm(res.data);
      setEdit(false);
      setImageFile(null);
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-gradient-to-tr from-emerald-100 via-white to-green-100 rounded-3xl shadow-xl">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
        {/* Profile Avatar and Name */}
        <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md w-full lg:w-1/3">
          <h2 className="mt-4 text-xl font-bold text-emerald-700">{form.name || 'User Name'}</h2>
          {edit && (
            <>
              <label
                htmlFor="imageUpload"
                className="mt-3 text-sm text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded-full cursor-pointer"
              >
                Change Picture
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </>
          )}
        </div>

        {/* Info Form */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-md w-full space-y-4">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center lg:text-left">
            {edit ? 'Edit Your Profile' : 'Your Profile Details'}
          </h3>

          {['name', 'phone', 'gender', 'location', 'bio'].map(field => (
            <div key={field} className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 capitalize">{field}</label>
              <input
                type="text"
                name={field}
                disabled={!edit}
                value={form[field] || ''}
                onChange={handleChange}
                className={`px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${!edit ? 'bg-gray-100 text-gray-600' : ''}`}
              />
            </div>
          ))}

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={form.email || ''}
              disabled
              className="px-4 py-2 border rounded-lg mt-1 bg-gray-100 text-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">New Password</label>
            <div className="flex">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                disabled={!edit}
                onChange={handleChange}
                className={`px-4 py-2 border rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-emerald-400 ${!edit ? 'bg-gray-100 text-gray-600' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 py-2 bg-gray-200 rounded-r-lg text-sm"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-6">
            {edit ? (
              <>
                <button onClick={handleUpdate} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium shadow">
                  Save
                </button>
                <button onClick={() => { setEdit(false); setImageFile(null); }} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium shadow">
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={() => setEdit(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium shadow">
                Edit Profile
              </button>
            )}
            <button onClick={handleLogout} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium shadow">
              Logout
            </button>
            <button onClick={handleDelete} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium shadow">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
