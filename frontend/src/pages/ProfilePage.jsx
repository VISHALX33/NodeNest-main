import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axios';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/users')
      .then(res => {
        setUser(res.data);
        setForm(res.data);
      })
      .catch((err) => {
        console.log("Token or Auth error:", err.response?.data);
        navigate('/');
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleDelete = async () => {
    await API.delete('/users');
    handleLogout();
  };

  const handleUpdate = async () => {
    if (imageFile) {
      form.image = URL.createObjectURL(imageFile); // TEMPORARY. In real app, upload to cloud.
    }

    const res = await API.put('/users', form);
    setUser(res.data);
    setEdit(false);
    setImageFile(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Profile</h2>

      {user && (
        <div className="space-y-4">
          <div className="relative w-32 h-32 mx-auto">
            <img
              src={
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : form.image || 'https://i.pravatar.cc/150'
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-400"
            />

            {edit && (
              <>
                <label
                  htmlFor="imageUpload"
                  className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 cursor-pointer hover:bg-blue-700"
                  title="Upload Image"
                >
                  +
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setImageFile(file);
                  }}
                />
              </>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Name:</label>
            <input
              className="border w-full px-2 py-1 rounded"
              disabled={!edit}
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone:</label>
            <input
              className="border w-full px-2 py-1 rounded"
              disabled={!edit}
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Gender:</label>
            <input
              className="border w-full px-2 py-1 rounded"
              disabled={!edit}
              name="gender"
              value={form.gender}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-3 mt-3">
            {edit ? (
              <>
                <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-1 rounded">Save</button>
                <button onClick={() => { setEdit(false); setImageFile(null); }} className="bg-gray-600 text-white px-4 py-1 rounded">Cancel</button>
              </>
            ) : (
              <button onClick={() => setEdit(true)} className="bg-blue-600 text-white px-4 py-1 rounded">Edit</button>
            )}
            <button onClick={handleLogout} className="bg-yellow-500 text-white px-4 py-1 rounded">Logout</button>
            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-1 rounded">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
