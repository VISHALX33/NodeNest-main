import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/axios';

export default function SubjectsPage() {
  const { semesterId } = useParams();
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/semesters/${semesterId}/subjects`).then(res => setSubjects(res.data));
  }, [semesterId]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-emerald-700">Subjects</h1>

      {subjects.length === 0 ? (
        <p className="text-gray-500 text-center">No subjects found for this semester.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subjects.map((sub) => (
            <div
              key={sub._id}
              onClick={() => navigate(`/subjects/${sub._id}`)}
              className="p-5 bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md hover:bg-emerald-50 cursor-pointer transition-all duration-200"
            >
              <p className="text-lg font-semibold text-emerald-800 text-center">{sub.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
