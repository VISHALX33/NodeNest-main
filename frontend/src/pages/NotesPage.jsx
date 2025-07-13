import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../axios';

export default function NotesPage() {
  const { subjectId } = useParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subjectId) return;

    const fetchNotes = async () => {
      try {
        const res = await API.get(`/semesters/subjects/${subjectId}/notes`);
        setNotes(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching notes:', err);
        setLoading(false);
      }
    };

    fetchNotes();
  }, [subjectId]);

  const handleDownload = async (note) => {
    try {
      window.open(note.pdfUrl, '_blank');
      await API.post('/user-pdfs', {
        noteId: note._id,
        subjectName: note.subjectName,
        semesterName: note.semesterName,
        pdfUrl: note.pdfUrl
      });
    } catch (error) {
      console.error("Failed to log download:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">Unit-wise Notes</h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : notes.length === 0 ? (
        <div className="text-center text-gray-500">No notes found for this subject.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {notes.map(note => (
            <div
              key={note._id}
              className="bg-white shadow-md rounded-lg p-4 hover:bg-indigo-50 transition"
            >
              <div className="text-gray-800 font-semibold text-lg mb-1">{note.title}</div>
              <div className="text-sm text-gray-600">Semester: {note.semesterName}</div>
              <div className="text-sm text-gray-600 mb-3">Subject: {note.subjectName}</div>
              <button
                onClick={() => handleDownload(note)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-full text-sm w-full"
              >
                View PDF
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
