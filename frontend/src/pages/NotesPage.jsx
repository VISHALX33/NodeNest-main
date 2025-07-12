import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../axios';

export default function NotesPage() {
  const { subjectId } = useParams();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    API.get(`/semesters/subjects/${subjectId}/notes`)
      .then(res => setNotes(res.data))
      .catch(err => console.error('Error fetching notes:', err));
  }, [subjectId]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Unit-wise Notes</h1>
      <ul className="space-y-3">
        {notes.map(note => (
          <li
            key={note._id}
            className="flex justify-between items-center border p-3 rounded shadow"
          >
            <span>{note.title}</span>
            <a
              href={note.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
