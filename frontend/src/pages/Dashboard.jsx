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
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/*  Banner */}
      <div className="bg-green-100 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6 mb-10 shadow-lg border border-green-200">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 leading-snug">
            Discover Smart Study & Services with <span className="text-green-900">NoteNest</span>
          </h2>
          <p className="mt-3 text-green-700 text-sm max-w-md">
            One platform to download notes, manage tasks, chat with peers, and book services — all in one place.
          </p><br /><br />
          <h2 className="text-xl md:text-xl font-bold text-green-800 leading-snug">
            Select your semester to get free notes!        </h2>
          
        </div>
        <div className="flex-1">
          <img
            src="data:image/jpeg;base64,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"
            alt="Study Illustration"
            className="hidden md:block w-40 max-w-xs md:max-w-sm mx-auto"
          />
        </div>
      </div>

      {/*  Semester Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {semesters.map((s) => (
          <div
            key={s._id}
            onClick={() => navigate(`/semesters/${s._id}`)}
            className="bg-green-100 rounded-xl shadow-md border border-green-100 hover:bg-green-50 hover:shadow-lg transition-all duration-200 cursor-pointer p-6 text-center"
          >
            <span className="text-lg font-semibold text-black">{s.title}</span>
          </div>
        ))}
      </div>
      <br />
    <br />
    </div>
    
  );
}
