import { useState, useEffect } from "react";
import API from "../utils/axios";
import { PlusCircle, BookOpen, GraduationCap, FileText, CheckCircle, AlertCircle, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminPYQ from "./AdminPYQ";

export default function AdminPage() {
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [activeTab, setActiveTab] = useState("semesters"); // semesters, subjects, notes, pyq

  const [semesterTitle, setSemesterTitle] = useState("");
  const [subjectData, setSubjectData] = useState({ semesterId: "", title: "" });
  const [noteData, setNoteData] = useState({ subjectId: "", title: "", pdfUrl: "" });

  useEffect(() => {
    fetchSemesters();
  }, []);

  const fetchSemesters = async () => {
    try {
      const res = await API.get("/semesters");
      setSemesters(res.data);
    } catch (err) {
      console.error("Failed to fetch semesters", err);
    }
  };

  const fetchSubjects = async (semesterId) => {
    try {
      const res = await API.get(`/semesters/${semesterId}/subjects`);
      setSubjects(res.data);
    } catch (err) {
      console.error("Failed to fetch subjects", err);
    }
  };

  const handleSemesterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/semesters", { title: semesterTitle });
      setMessage({ type: "success", text: "Semester added successfully!" });
      setSemesterTitle("");
      fetchSemesters();
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to add semester" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post(`/semesters/${subjectData.semesterId}/subjects`, { title: subjectData.title });
      setMessage({ type: "success", text: "Subject added successfully!" });
      setSubjectData({ ...subjectData, title: "" });
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to add subject" });
    } finally {
      setLoading(false);
    }
  };

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post(`/semesters/subjects/${noteData.subjectId}/notes`, {
        title: noteData.title,
        pdfUrl: noteData.pdfUrl,
      });
      setMessage({ type: "success", text: "Note added successfully!" });
      setNoteData({ ...noteData, title: "", pdfUrl: "" });
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to add note" });
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "semesters", label: "Semesters", icon: GraduationCap },
    { id: "subjects", label: "Subjects", icon: BookOpen },
    { id: "notes", label: "Notes", icon: FileText },
    { id: "pyq", label: "PYQ", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-black text-emerald-900 tracking-tight flex items-center justify-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-2xl">
              <PlusCircle size={32} className="text-emerald-700" />
            </div>
            Admin Control
          </h1>
          <p className="mt-4 text-gray-500 font-medium">Create and expand your academic library</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-10 p-1.5 bg-white rounded-[2rem] shadow-xl shadow-emerald-900/5 border border-emerald-50 max-w-md mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-[1.5rem] font-bold transition-all duration-300 ${
                activeTab === tab.id 
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" 
                : "text-gray-500 hover:text-emerald-600 hover:bg-emerald-50"
              }`}
            >
              <tab.icon size={18} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {message.text && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`mb-8 p-5 rounded-2xl flex items-center gap-4 shadow-sm border ${
                message.type === "success" 
                ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                : "bg-rose-50 text-rose-800 border-rose-200"
              }`}
            >
              <div className={`p-2 rounded-full ${message.type === "success" ? "bg-emerald-200" : "bg-rose-200"}`}>
                {message.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              </div>
              <span className="font-semibold">{message.text}</span>
              <button 
                onClick={() => setMessage({ type: "", text: "" })} 
                className="ml-auto hover:bg-black/5 p-1 rounded-lg transition"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {activeTab === "semesters" && (
            <motion.section
              key="semesters"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-emerald-900/5 border border-emerald-50"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-emerald-50 rounded-xl">
                  <GraduationCap className="text-emerald-600" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Add Semester</h2>
              </div>
              <form onSubmit={handleSemesterSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-gray-400 text-xs font-bold uppercase ml-4">Semester Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Semester 1"
                    className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-gray-700 font-medium"
                    value={semesterTitle}
                    onChange={(e) => setSemesterTitle(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-[0.98] transition-all disabled:bg-gray-400"
                >
                  {loading ? "Creating..." : "Create Semester"}
                </button>
              </form>
            </motion.section>
          )}

          {activeTab === "subjects" && (
            <motion.section
              key="subjects"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-emerald-900/5 border border-emerald-50"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-emerald-50 rounded-xl">
                  <BookOpen className="text-emerald-600" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Add Subject</h2>
              </div>
              <form onSubmit={handleSubjectSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-gray-400 text-xs font-bold uppercase ml-4">Parent Semester</label>
                  <select
                    className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-gray-700 font-medium appearance-none"
                    value={subjectData.semesterId}
                    onChange={(e) => setSubjectData({ ...subjectData, semesterId: e.target.value })}
                    required
                  >
                    <option value="">Select a Semester</option>
                    {semesters.map((s) => (
                      <option key={s._id} value={s._id}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-gray-400 text-xs font-bold uppercase ml-4">Subject Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Data Structures"
                    className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-gray-700 font-medium"
                    value={subjectData.title}
                    onChange={(e) => setSubjectData({ ...subjectData, title: e.target.value })}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-[0.98] transition-all disabled:bg-gray-400"
                >
                  {loading ? "Creating..." : "Create Subject"}
                </button>
              </form>
            </motion.section>
          )}

          {activeTab === "notes" && (
            <motion.section
              key="notes"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-emerald-900 p-8 rounded-[2rem] shadow-2xl shadow-emerald-900/40"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-emerald-800 rounded-xl">
                  <FileText className="text-emerald-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Add Study Note</h2>
              </div>
              <form onSubmit={handleNoteSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-emerald-200 text-xs font-bold uppercase ml-4">Semester</label>
                    <select
                      className="w-full px-6 py-4 bg-emerald-800/50 border border-emerald-700/50 rounded-2xl focus:ring-2 focus:ring-emerald-400 focus:bg-emerald-800 transition-all outline-none text-white font-medium appearance-none"
                      onChange={(e) => {
                        const semId = e.target.value;
                        if (semId) fetchSubjects(semId);
                      }}
                      required
                    >
                      <option value="" className="bg-emerald-900">Select Semester</option>
                      {semesters.map((s) => (
                        <option key={s._id} value={s._id} className="bg-emerald-900">{s.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-emerald-200 text-xs font-bold uppercase ml-4">Subject</label>
                    <select
                      className="w-full px-6 py-4 bg-emerald-800/50 border border-emerald-700/50 rounded-2xl focus:ring-2 focus:ring-emerald-400 focus:bg-emerald-800 transition-all outline-none text-white font-medium appearance-none"
                      value={noteData.subjectId}
                      onChange={(e) => setNoteData({ ...noteData, subjectId: e.target.value })}
                      required
                    >
                      <option value="" className="bg-emerald-900">Select Subject</option>
                      {subjects.map((sub) => (
                        <option key={sub._id} value={sub._id} className="bg-emerald-900">{sub.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-emerald-200 text-xs font-bold uppercase ml-4">Note Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Unit 1: Introduction"
                      className="w-full px-6 py-4 bg-emerald-800/50 border border-emerald-700/50 rounded-2xl focus:ring-2 focus:ring-emerald-400 focus:bg-emerald-800 transition-all outline-none text-white font-medium placeholder:text-emerald-400/50"
                      value={noteData.title}
                      onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-emerald-200 text-xs font-bold uppercase ml-4">PDF Link</label>
                    <input
                      type="url"
                      placeholder="Google Drive URL"
                      className="w-full px-6 py-4 bg-emerald-800/50 border border-emerald-700/50 rounded-2xl focus:ring-2 focus:ring-emerald-400 focus:bg-emerald-800 transition-all outline-none text-white font-medium placeholder:text-emerald-400/50"
                      value={noteData.pdfUrl}
                      onChange={(e) => setNoteData({ ...noteData, pdfUrl: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 bg-white text-emerald-900 px-8 py-5 rounded-2xl font-black text-lg hover:bg-emerald-50 hover:shadow-xl hover:shadow-black/20 active:scale-[0.98] transition-all disabled:bg-emerald-800 disabled:text-emerald-600"
                >
                  {loading ? "Publishing..." : "Publish Note Now"}
                </button>
              </form>
            </motion.section>
          )}
          {activeTab === "pyq" && (
            <motion.section
              key="pyq"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <AdminPYQ />
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

