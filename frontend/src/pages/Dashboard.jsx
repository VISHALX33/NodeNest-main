import { useEffect, useState } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import NoteNestLogo from "/NoteNestLogo.png";
import Chatbot from "./chatbot"; // ✅ import your chatbot

export default function Dashboard() {
  const [semesters, setSemesters] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/semesters").then((res) => setSemesters(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 relative">
      {/* Banner */}
      <div className="bg-green-100 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6 mb-10 shadow-lg border border-green-200">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 leading-snug">
            Discover Smart Study & Services with{" "}
            <span className="text-green-900">NoteNest</span>
          </h2>
          <p className="mt-3 text-green-700 text-sm max-w-md">
            One platform to download notes, manage tasks, chat with peers, and
            book services — all in one place.
          </p>
          <br />
          <br />
          <h2 className="text-xl md:text-xl font-bold text-green-800 leading-snug">
            Select your semester to get free notes!
          </h2>
        </div>
        <div className="flex-1">
          <img
            src={NoteNestLogo}
            alt="Study Illustration"
            className="hidden md:block w-66 max-w-xs md:max-w-sm mx-auto"
          />
        </div>
      </div>

      {/* Semester Cards */}
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


      {/* Floating Chatbot Icon */}
      <div
        className="fixed bottom-28 right-6 w-16 h-16 bg-emerald-600 rounded-full shadow-lg flex items-center justify-center cursor-pointer z-50 hover:scale-110 transition-transform"
        onClick={() => setShowChatbot(!showChatbot)}
        title="Solve your problems"
      >
        <FaRobot className="text-white text-xl" />
      </div>


      {/* Chatbot Popup */}
      {showChatbot && (
        <div className="fixed bottom-20 right-6 w-80 h-[28rem] bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col overflow-hidden">
          <div className="bg-emerald-600 text-white px-4 py-2 flex justify-between items-center">
            <span className="font-semibold">Solve your problems 🤖</span>
            <button
              onClick={() => setShowChatbot(false)}
              className="text-white hover:text-gray-200"
            >
              ✖
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Chatbot />
          </div>
        </div>
      )}
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
