import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axios';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
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
    await API.delete('/user');
    handleLogout();
  };

  const handleUpdate = async () => {
    const res = await API.put('/user', form);
    setUser(res.data);
    setEdit(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Profile</h2>

      {user && (
        <div className="space-y-4">
          <div className="text-center">
            <img
              src={user.image || 'https://i.pravatar.cc/150'}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Name:</label>
            <input
              className="border w-full px-2 py-1"
              disabled={!edit}
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone:</label>
            <input
              className="border w-full px-2 py-1"
              disabled={!edit}
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Gender:</label>
            <input
              className="border w-full px-2 py-1"
              disabled={!edit}
              value={form.gender}
              onChange={e => setForm({ ...form, gender: e.target.value })}
            />
          </div>

          <div className="flex gap-3 mt-3">
            {edit ? (
              <>
                <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-1 rounded">Save</button>
                <button onClick={() => setEdit(false)} className="bg-gray-600 text-white px-4 py-1 rounded">Cancel</button>
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
