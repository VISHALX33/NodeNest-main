// // ProfilePage.jsx
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../axios';

// export default function ProfilePage() {
//   const [user, setUser] = useState(null);
//   const [edit, setEdit] = useState(false);
//   const [form, setForm] = useState({});
//   const [imageFile, setImageFile] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     API.get('/users')
//       .then(res => {
//         setUser(res.data);
//         setForm(res.data);
//       })
//       .catch((err) => {
//         console.log("Token or Auth error:", err.response?.data);
//         navigate('/');
//       });
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   const handleDelete = async () => {
//     if (!window.confirm('Are you sure you want to delete your account?')) return;
//     await API.delete('/users');
//     handleLogout();
//   };

//   const handleUpdate = async () => {
//     const updatedData = {
//       ...form,
//       image: imageFile ? URL.createObjectURL(imageFile) : form.image,
//     };

//     try {
//       const res = await API.put('/users', updatedData);
//       setUser(res.data);
//       setForm(res.data);
//       setEdit(false);
//       setImageFile(null);
//     } catch (err) {
//       console.error("Update failed:", err.response?.data || err.message);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4 text-center">Your Profile</h2>

//       {user && (
//         <div className="space-y-4">
//           <div className="relative w-32 h-32 mx-auto">
//             <img
//               src={
//                 imageFile
//                   ? URL.createObjectURL(imageFile)
//                   : form.image || 'https://i.pravatar.cc/150'
//               }
//               alt="Profile"
//               className="w-32 h-32 rounded-full object-cover border-4 border-blue-400"
//             />

//             {edit && (
//               <>
//                 <label
//                   htmlFor="imageUpload"
//                   className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 cursor-pointer hover:bg-blue-700"
//                   title="Upload Image"
//                 >
//                   +
//                 </label>
//                 <input
//                   id="imageUpload"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     if (file) setImageFile(file);
//                   }}
//                 />
//               </>
//             )}
//           </div>

//           <div>
//             <label className="text-sm font-medium">Name:</label>
//             <input
//               className="border w-full px-2 py-1 rounded"
//               disabled={!edit}
//               name="name"
//               value={form.name || ''}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium">Email:</label>
//             <input
//               className="border w-full px-2 py-1 rounded bg-gray-100"
//               disabled
//               name="email"
//               value={form.email || ''}
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium">Phone:</label>
//             <input
//               className="border w-full px-2 py-1 rounded"
//               disabled={!edit}
//               name="phone"
//               value={form.phone || ''}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium">Gender:</label>
//             <input
//               className="border w-full px-2 py-1 rounded"
//               disabled={!edit}
//               name="gender"
//               value={form.gender || ''}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium">Location:</label>
//             <input
//               className="border w-full px-2 py-1 rounded"
//               disabled={!edit}
//               name="location"
//               value={form.location || ''}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium">Bio:</label>
//             <textarea
//               className="border w-full px-2 py-1 rounded"
//               disabled={!edit}
//               name="bio"
//               value={form.bio || ''}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium">New Password:</label>
//             <div className="flex">
//               <input
//                 className="border w-full px-2 py-1 rounded"
//                 disabled={!edit}
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 onChange={handleChange}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="ml-2 px-2 py-1 bg-gray-300 rounded"
//               >
//                 {showPassword ? 'Hide' : 'Show'}
//               </button>
//             </div>
//           </div>

//           <div className="flex gap-3 mt-3 flex-wrap">
//             {edit ? (
//               <>
//                 <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-1 rounded">Save</button>
//                 <button onClick={() => { setEdit(false); setImageFile(null); }} className="bg-gray-600 text-white px-4 py-1 rounded">Cancel</button>
//               </>
//             ) : (
//               <button onClick={() => setEdit(true)} className="bg-blue-600 text-white px-4 py-1 rounded">Edit</button>
//             )}
//             <button onClick={handleLogout} className="bg-yellow-500 text-white px-4 py-1 rounded">Logout</button>
//             <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-1 rounded">Delete</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
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
    <div className="max-w-5xl mx-auto my-6 bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header (Mobile View) */}
      <div className="block md:hidden bg-gradient-to-r from-purple-600 to-indigo-500 text-white py-6 px-4 text-center">
        <div className="flex justify-center -mb-12 relative">
          <img
            src={
              imageFile
                ? URL.createObjectURL(imageFile)
                : form.image || 'https://i.pravatar.cc/150'
            }
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
          />
          {edit && (
            <>
              <label
                htmlFor="imageUpload"
                className="absolute mt-[70px] ml-[70px] bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-2 py-1 rounded-full cursor-pointer"
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
        <h2 className="mt-16 text-xl font-semibold">Your Profile</h2>
      </div>

      {/* Desktop View Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar Profile (Desktop Only) */}
        <div className="hidden md:flex flex-col items-center bg-gradient-to-b from-purple-600 to-indigo-500 text-white p-6 w-full md:w-1/3">
          <img
            src={
              imageFile
                ? URL.createObjectURL(imageFile)
                : form.image || 'https://i.pravatar.cc/150'
            }
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
          />
          <h2 className="mt-4 text-xl font-semibold">{form.name || 'User Name'}</h2>
          {edit && (
            <>
              <label
                htmlFor="imageUpload"
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded-full cursor-pointer"
                title="Upload Image"
              >
                Change
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

        {/* Form Section */}
        <div className="w-full md:w-2/3 p-6 space-y-4">
          <h2 className="text-xl font-bold mb-2 block md:hidden text-center">Edit Profile</h2>

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Name:</label>
            <input
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              disabled={!edit}
              name="name"
              value={form.name || ''}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email:</label>
            <input
              className="w-full border px-3 py-2 rounded-lg bg-gray-100"
              disabled
              name="email"
              value={form.email || ''}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">Phone:</label>
            <input
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              disabled={!edit}
              name="phone"
              value={form.phone || ''}
              onChange={handleChange}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium text-gray-700">Gender:</label>
            <input
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              disabled={!edit}
              name="gender"
              value={form.gender || ''}
              onChange={handleChange}
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-gray-700">Location:</label>
            <input
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              disabled={!edit}
              name="location"
              value={form.location || ''}
              onChange={handleChange}
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm font-medium text-gray-700">Bio:</label>
            <textarea
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              disabled={!edit}
              name="bio"
              value={form.bio || ''}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">New Password:</label>
            <div className="flex">
              <input
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                disabled={!edit}
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-sm bg-gray-200 px-3 py-1 rounded-lg"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4 flex-wrap">
            {edit ? (
              <>
                <button onClick={handleUpdate} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">Save</button>
                <button onClick={() => { setEdit(false); setImageFile(null); }} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">Cancel</button>
              </>
            ) : (
              <button onClick={() => setEdit(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">Edit</button>
            )}
            <button onClick={handleLogout} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">Logout</button>
            <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
