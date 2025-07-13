import { useEffect, useState } from 'react';
import API from '../axios';

export default function MyPDFsPage() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const res = await API.get('/user-pdfs');
        setDownloads(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch your downloads:', err);
        setLoading(false);
      }
    };

    fetchDownloads();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">My Downloaded Notes</h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : downloads.length === 0 ? (
        <div className="text-center text-gray-500">You haven’t downloaded any notes yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {downloads.map((file, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 hover:bg-indigo-50 transition"
            >
              <div className="font-semibold text-gray-800 mb-1">{file.subject}</div>
              <div className="text-sm text-gray-600 mb-2">Semester: {file.semester}</div>
              <a
                href={file.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-indigo-600 hover:bg-indigo-700 text-white text-center px-4 py-2 rounded-full text-sm"
              >
                View PDF
              </a>
              <p className="text-xs text-gray-400 mt-2 text-right">
                Downloaded on: {new Date(file.uploadedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
