import { useEffect, useState } from 'react';
import API from '../axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [semesters, setSemesters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/semesters').then(res => setSemesters(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-indigo-700">Select Your Semester</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {semesters.map((s) => (
          <div
            key={s._id}
            className="bg-white rounded-2xl shadow-md text-center py-6 px-4 cursor-pointer border border-gray-200 hover:bg-indigo-50 transition-all"
            onClick={() => navigate(`/semesters/${s._id}`)}
          >
            <span className="text-lg font-semibold text-gray-700">{s.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
