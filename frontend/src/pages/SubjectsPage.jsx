import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../axios';

export default function SubjectsPage() {
  const { semesterId } = useParams();
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/semesters/${semesterId}/subjects`).then(res => setSubjects(res.data));
  }, [semesterId]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">📚 Subjects</h1>

      {subjects.length === 0 ? (
        <p className="text-gray-500 text-center">No subjects found for this semester.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {subjects.map((sub) => (
            <div
              key={sub._id}
              className="p-4 bg-white rounded-2xl shadow-md border hover:shadow-lg transition duration-200 cursor-pointer hover:bg-purple-50"
              onClick={() => navigate(`/subjects/${sub._id}`)}
            >
              <p className="text-lg font-semibold text-purple-800">{sub.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
