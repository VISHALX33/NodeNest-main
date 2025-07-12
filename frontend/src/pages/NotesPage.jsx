import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../axios';

export default function NotesPage() {
  const { subjectId } = useParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/semesters/subjects/${subjectId}/notes`)
      .then(res => {
        setNotes(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching notes:', err);
        setLoading(false);
      });
  }, [subjectId]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">Unit-wise Notes</h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : notes.length === 0 ? (
        <div className="text-center text-gray-500">No notes found for this subject.</div>
      ) : (
        <ul className="space-y-4">
          {notes.map(note => (
            <li
              key={note._id}
              className="flex justify-between items-center bg-white shadow-md rounded-lg px-4 py-3 hover:bg-indigo-50 transition"
            >
              <span className="font-medium text-gray-800">{note.title}</span>
              <a
                href={note.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-full text-sm"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
