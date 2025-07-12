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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Subjects</h1>
      <div className="space-y-2">
        {subjects.map((sub) => (
          <div
            key={sub._id}
            className="p-3 border rounded shadow hover:bg-green-50 cursor-pointer"
            onClick={() => navigate(`/subjects/${sub._id}`)}
          >
            {sub.title}
          </div>
        ))}
      </div>
    </div>
  );
}
