import { useState, useEffect } from "react";
import API from "../utils/axios";
import { 
  PlusCircle, BookOpen, GraduationCap, FileText, 
  CheckCircle, AlertCircle, ChevronRight, Menu, X, 
  Search, Calendar, Filter, LayoutDashboard, LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminPYQ from "./AdminPYQ";
import AdminServiceOrders from "./AdminServiceOrders";
import AdminPaperSubmissions from "./AdminPaperSubmissions";
import { Briefcase, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [activeTab, setActiveTab] = useState("semesters");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Shared Filters
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    search: "",
  });

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
    { id: "pyq", label: "PYQ Papers", icon: FileText },
    { id: "services", label: "Service Orders", icon: Briefcase },
    { id: "submissions", label: "Earn Program", icon: Coins },
  ];

  return (
    <div className="flex min-h-screen bg-[#f1f5f9] font-sans">
      
      {/* Sidebar Navigation */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="fixed left-0 top-0 h-full bg-[#0f172a] text-white z-50 transition-all duration-300 shadow-2xl flex flex-col"
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-black text-white text-xl">N</div>
              <span className="font-black text-xl tracking-tight">NodeNest</span>
            </div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-xl transition"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
                activeTab === tab.id 
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <tab.icon size={20} />
              {isSidebarOpen && <span>{tab.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-4 p-4 text-slate-400 font-bold hover:text-rose-400 transition"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Exit Dashboard</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main 
        className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-[280px]" : "ml-[80px]"}`}
      >
        {/* Top bar with Filters */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 p-6 z-40 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-emerald-600" size={24} />
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-2xl border border-slate-200">
              <Calendar size={16} className="text-slate-400 ml-2" />
              <input 
                type="date" 
                className="bg-transparent text-xs font-bold text-slate-600 outline-none border-none p-1"
                value={filters.startDate}
                onChange={(e) => setFilters({...filters, startDate: e.target.value})}
              />
              <span className="text-slate-300 text-xs">—</span>
              <input 
                type="date" 
                className="bg-transparent text-xs font-bold text-slate-600 outline-none border-none p-1"
                value={filters.endDate}
                onChange={(e) => setFilters({...filters, endDate: e.target.value})}
              />
            </div>

            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Global Search..."
                className="pl-12 pr-6 py-3 bg-slate-100 border-none rounded-2xl text-sm font-bold text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 transition-all w-64"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>
            
            <button 
              onClick={() => setFilters({startDate: "", endDate: "", search: ""})}
              className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-rose-500 transition"
              title="Reset Filters"
            >
              <Filter size={20} />
            </button>
          </div>
        </header>

        {/* Content View */}
        <div className="p-8 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {message.text && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mb-8 p-5 rounded-[2rem] flex items-center gap-4 shadow-sm border ${
                  message.type === "success" 
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                  : "bg-rose-50 text-rose-800 border-rose-200"
                }`}
              >
                <div className={`p-2 rounded-full ${message.type === "success" ? "bg-emerald-200" : "bg-rose-200"}`}>
                  {message.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                </div>
                <span className="font-bold">{message.text}</span>
                <button 
                  onClick={() => setMessage({ type: "", text: "" })} 
                  className="ml-auto p-2 hover:bg-black/5 rounded-xl transition"
                >
                  <X size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {activeTab === "semesters" && (
              <motion.section
                key="semesters"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-900/5 border border-slate-100"
              >
                <form onSubmit={handleSemesterSubmit} className="space-y-6 max-w-xl">
                  <div className="space-y-3">
                    <label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] ml-2">New Semester Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Semester 1"
                      className="w-full px-6 py-5 bg-slate-50 border-none rounded-3xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-slate-700 font-bold"
                      value={semesterTitle}
                      onChange={(e) => setSemesterTitle(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 text-white px-8 py-5 rounded-3xl font-black text-lg hover:bg-emerald-700 shadow-xl shadow-emerald-600/20 active:scale-[0.98] transition-all disabled:bg-slate-200 disabled:text-slate-400"
                  >
                    {loading ? "Processing..." : "Register Semester"}
                  </button>
                </form>
              </motion.section>
            )}

            {activeTab === "subjects" && (
              <motion.section
                key="subjects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-900/5 border border-slate-100"
              >
                <form onSubmit={handleSubjectSubmit} className="space-y-8 max-w-xl">
                  <div className="space-y-3">
                    <label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] ml-2">Parent Semester</label>
                    <select
                      className="w-full px-6 py-5 bg-slate-50 border-none rounded-3xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-slate-700 font-bold appearance-none"
                      value={subjectData.semesterId}
                      onChange={(e) => setSubjectData({ ...subjectData, semesterId: e.target.value })}
                      required
                    >
                      <option value="">Select Target Semester</option>
                      {semesters.map((s) => (
                        <option key={s._id} value={s._id}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] ml-2">Subject Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Operating Systems"
                      className="w-full px-6 py-5 bg-slate-50 border-none rounded-3xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-slate-700 font-bold"
                      value={subjectData.title}
                      onChange={(e) => setSubjectData({ ...subjectData, title: e.target.value })}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 text-white px-8 py-5 rounded-3xl font-black text-lg hover:bg-emerald-700 shadow-xl shadow-emerald-600/20 transition-all disabled:bg-slate-200"
                  >
                    {loading ? "Linking..." : "Add Subject to Library"}
                  </button>
                </form>
              </motion.section>
            )}

            {activeTab === "notes" && (
              <motion.section
                key="notes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl shadow-slate-900/40"
              >
                <form onSubmit={handleNoteSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-emerald-200 text-[10px] font-black uppercase tracking-[0.2em] ml-2">Choose Semester</label>
                      <select
                        className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-3xl focus:ring-2 focus:ring-emerald-400 focus:bg-white/10 transition-all outline-none text-white font-bold"
                        onChange={(e) => e.target.value && fetchSubjects(e.target.value)}
                        required
                      >
                        <option value="" className="bg-slate-900">Select...</option>
                        {semesters.map((s) => (
                          <option key={s._id} value={s._id} className="bg-slate-900">{s.title}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-emerald-200 text-[10px] font-black uppercase tracking-[0.2em] ml-2">Choose Subject</label>
                      <select
                        className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-3xl focus:ring-2 focus:ring-emerald-400 focus:bg-white/10 transition-all outline-none text-white font-bold"
                        value={noteData.subjectId}
                        onChange={(e) => setNoteData({ ...noteData, subjectId: e.target.value })}
                        required
                      >
                        <option value="" className="bg-slate-900">Select...</option>
                        {subjects.map((sub) => (
                          <option key={sub._id} value={sub._id} className="bg-slate-900">{sub.title}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-emerald-200 text-[10px] font-black uppercase tracking-[0.2em] ml-2">Note Headline</label>
                      <input
                        type="text"
                        placeholder="e.g. Module 1 Notes"
                        className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-3xl focus:ring-2 focus:ring-emerald-400 focus:bg-white/10 transition-all outline-none text-white font-bold placeholder:text-white/20"
                        value={noteData.title}
                        onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-emerald-200 text-[10px] font-black uppercase tracking-[0.2em] ml-2">Cloud PDF URL</label>
                      <input
                        type="url"
                        placeholder="Link to file..."
                        className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-3xl focus:ring-2 focus:ring-emerald-400 focus:bg-white/10 transition-all outline-none text-white font-bold placeholder:text-white/20"
                        value={noteData.pdfUrl}
                        onChange={(e) => setNoteData({ ...noteData, pdfUrl: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-500 text-slate-900 px-8 py-6 rounded-3xl font-black text-xl hover:bg-emerald-400 shadow-xl shadow-emerald-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {loading ? "Syncing..." : "Launch Study Note"}
                  </button>
                </form>
              </motion.section>
            )}
            
            {activeTab === "pyq" && (
              <motion.div key="pyq" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <AdminPYQ filters={filters} />
              </motion.div>
            )}
            
            {activeTab === "services" && (
              <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <AdminServiceOrders filters={filters} />
              </motion.div>
            )}
            
            {activeTab === "submissions" && (
              <motion.div key="submissions" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <AdminPaperSubmissions filters={filters} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

