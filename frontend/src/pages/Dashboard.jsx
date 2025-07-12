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
    <div className="p-4 grid grid-cols-2 gap-4">
      {semesters.map((s) => (
        <div
          key={s._id}
          className="bg-white p-4 shadow rounded text-center cursor-pointer hover:bg-blue-100"
          onClick={() => navigate(`/semesters/${s._id}`)}
        >
          {s.title}
        </div>
      ))}
    </div>
  );
}
