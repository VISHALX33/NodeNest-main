import { useEffect, useState } from 'react';
import API from '../axios';
import { FaLinkedin } from 'react-icons/fa';

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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">My Downloaded Notes</h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : downloads.length === 0 ? (

        <div>
          <div className="text-center text-gray-500">Under Consturction !! </div>
          <div className="text-center text-gray-500">if any one want to contribute then contact me on Linkedin !! </div>
          <div className="flex justify-center mt-4">
            <a href="https://www.linkedin.com/in/vishal-prajapati-445799289/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
              <FaLinkedin size={40} />
            </a>
          </div>
        </div>
        
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {downloads.map((file, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-xl p-5 border border-green-100 hover:shadow-lg hover:bg-green-50 transition"
            >
              <div className="font-semibold text-green-800 text-lg mb-1 truncate">
                {file.subject}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                Semester: <span className="font-medium">{file.semester}</span>
              </div>
              <a
                href={file.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-green-600 hover:bg-green-700 text-white text-center px-4 py-2 rounded-full text-sm transition"
              >
                View PDF
              </a>
              <p className="text-xs text-gray-500 mt-3 text-right">
                Downloaded on: {new Date(file.uploadedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
