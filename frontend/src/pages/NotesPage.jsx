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
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        Unit-wise Notes
      </h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : notes.length === 0 ? (
        <div className="text-center text-gray-500">No notes found for this subject.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {notes.map(note => (
            <div
              key={note._id}
              className="bg-white border border-green-100 shadow-sm rounded-2xl p-4 hover:shadow-md transition duration-300 hover:border-green-200"
            >
              <h2 className="text-lg font-semibold text-green-800 mb-1">{note.title}</h2>
              <p className="text-sm text-gray-600">Semester: {note.semesterName}</p>
              <p className="text-sm text-gray-600 mb-4">Subject: {note.subjectName}</p>

              <button
                onClick={() => handleDownload(note)}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-full transition"
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
