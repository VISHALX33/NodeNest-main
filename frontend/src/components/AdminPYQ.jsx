// components/AdminPYQ.jsx
// Refactored to follow "Notes" admin flow: All-in-one forms instead of wizard steps
import { useState, useEffect } from "react";
import API from "../utils/axios";
import { CheckCircle, AlertCircle, Plus, BookOpen, FileText } from "lucide-react";

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
const BRANCHES = ["CSE", "AI & DS", "IT", "ECE", "EE", "ME", "CE", "CHE", "Robotics", "Biomedical", "Aerospace", "Biotech", "Other"];

export default function AdminPYQ({ filters }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  // Add Subject State
  const [subForm, setSubForm] = useState({
    semesterNumber: "",
    branch: "",
    title: "",
  });

  // Add Paper State
  const [paperForm, setPaperForm] = useState({
    semesterNumber: "",
    branch: "",
    subjectId: "",
    title: "",
    year: "",
    pdfUrl: "",
  });

  const [subjectsForPaper, setSubjectsForPaper] = useState([]);

  const showMsg = (type, text) => {
    setMsg({ type, text });
    setTimeout(() => setMsg({ type: "", text: "" }), 4000);
  };

  // Fetch subjects for cascading select in Paper Form
  useEffect(() => {
    if (paperForm.semesterNumber && paperForm.branch) {
      API.get(`/pyq/subjects?semester=${paperForm.semesterNumber}&branch=${encodeURIComponent(paperForm.branch)}`)
        .then((res) => setSubjectsForPaper(res.data))
        .catch(console.error);
    } else {
      setSubjectsForPaper([]);
    }
  }, [paperForm.semesterNumber, paperForm.branch]);

  const handleAddSubject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/pyq/subjects", {
        title: subForm.title,
        semesterNumber: Number(subForm.semesterNumber),
        branch: subForm.branch,
      });
      showMsg("success", "PYQ Subject created successfully!");
      setSubForm({ semesterNumber: "", branch: "", title: "" });
    } catch (err) {
      showMsg("error", err.response?.data?.message || "Failed to create subject");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPaper = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post(`/pyq/${paperForm.subjectId}/papers`, {
        title: paperForm.title,
        pdfUrl: paperForm.pdfUrl,
        year: paperForm.year,
      });
      showMsg("success", "PYQ Paper published successfully!");
      setPaperForm({
        ...paperForm,
        title: "",
        year: "",
        pdfUrl: "",
      });
    } catch (err) {
      showMsg("error", err.response?.data?.message || "Failed to add paper");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Toast Notification */}
      {msg.text && (
        <div className={`fixed top-24 right-4 z-50 flex items-center gap-3 p-5 rounded-2xl border shadow-xl animate-in slide-in-from-right duration-300 ${
          msg.type === "success"
            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
            : "bg-rose-50 border-rose-200 text-rose-800"
        }`}>
          {msg.type === "success" ? <CheckCircle size={22} className="text-emerald-600" /> : <AlertCircle size={22} className="text-rose-600" />}
          <span className="font-bold">{msg.text}</span>
        </div>
      )}

      {/* ── FORM 1: CREATE SUBJECT ── */}
      <section className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-emerald-900/5 border border-emerald-50 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-emerald-50 rounded-2xl">
            <BookOpen className="text-emerald-600" size={26} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-800 tracking-tight">Create PYQ Subject</h2>
            <p className="text-sm text-gray-400 font-medium font-sans">Define a subject for a specific semester and branch</p>
          </div>
        </div>

        <form onSubmit={handleAddSubject} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-gray-400 text-xs font-bold uppercase ml-4">Semester</label>
              <select
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:border-emerald-500 focus:bg-white transition-all outline-none text-gray-700 font-bold appearance-none cursor-pointer"
                value={subForm.semesterNumber}
                onChange={(e) => setSubForm({ ...subForm, semesterNumber: e.target.value })}
                required
              >
                <option value="">Select Semester</option>
                {SEMESTERS.map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-gray-400 text-xs font-bold uppercase ml-4">Branch</label>
              <select
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:border-emerald-500 focus:bg-white transition-all outline-none text-gray-700 font-bold appearance-none cursor-pointer"
                value={subForm.branch}
                onChange={(e) => setSubForm({ ...subForm, branch: e.target.value })}
                required
              >
                <option value="">Select Branch</option>
                {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-gray-400 text-xs font-bold uppercase ml-4">Subject Title</label>
            <input
              type="text"
              placeholder="e.g. Data Structures & Algorithms"
              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:border-emerald-500 focus:bg-white transition-all outline-none text-gray-700 font-bold placeholder:text-gray-300"
              value={subForm.title}
              onChange={(e) => setSubForm({ ...subForm, title: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white px-8 py-4 rounded-[1.5rem] font-black text-lg hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/20 active:scale-[0.98] transition-all disabled:bg-gray-200 disabled:text-gray-400"
          >
            {loading ? "Creating..." : "Create PYQ Subject"}
          </button>
        </form>
      </section>

      {/* ── FORM 2: ADD PAPER ── */}
      <section className="bg-emerald-900 p-8 rounded-[2.5rem] shadow-2xl shadow-emerald-900/30 border border-emerald-800/50 max-w-3xl mx-auto overflow-hidden relative">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <FileText size={200} className="text-white" />
        </div>

        <div className="flex items-center gap-4 mb-8 relative z-10">
          <div className="p-3 bg-emerald-800 rounded-2xl border border-emerald-700">
            <Plus className="text-emerald-400" size={26} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Add PYQ Paper</h2>
            <p className="text-sm text-emerald-400/80 font-medium">Upload previous year papers to existing subjects</p>
          </div>
        </div>

        <form onSubmit={handleAddPaper} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-emerald-300 text-xs font-bold uppercase ml-4">Step 1: Semester</label>
              <select
                className="w-full px-6 py-4 bg-emerald-800/50 border-2 border-emerald-700/50 rounded-[1.5rem] focus:border-emerald-400 focus:bg-emerald-800 transition-all outline-none text-white font-bold appearance-none cursor-pointer"
                value={paperForm.semesterNumber}
                onChange={(e) => setPaperForm({ ...paperForm, semesterNumber: e.target.value, subjectId: "" })}
                required
              >
                <option value="" className="bg-emerald-900">Select Semester</option>
                {SEMESTERS.map(s => <option key={s} value={s} className="bg-emerald-900">Semester {s}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-emerald-300 text-xs font-bold uppercase ml-4">Step 2: Branch</label>
              <select
                className="w-full px-6 py-4 bg-emerald-800/50 border-2 border-emerald-700/50 rounded-[1.5rem] focus:border-emerald-400 focus:bg-emerald-800 transition-all outline-none text-white font-bold appearance-none cursor-pointer"
                value={paperForm.branch}
                onChange={(e) => setPaperForm({ ...paperForm, branch: e.target.value, subjectId: "" })}
                required
              >
                <option value="" className="bg-emerald-900">Select Branch</option>
                {BRANCHES.map(b => <option key={b} value={b} className="bg-emerald-900">{b}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-emerald-300 text-xs font-bold uppercase ml-4">Step 3: Target Subject</label>
            <select
              className="w-full px-6 py-4 bg-emerald-800/50 border-2 border-emerald-700/50 rounded-[1.5rem] focus:border-emerald-400 focus:bg-emerald-800 transition-all outline-none text-white font-bold appearance-none cursor-pointer disabled:opacity-50"
              value={paperForm.subjectId}
              onChange={(e) => setPaperForm({ ...paperForm, subjectId: e.target.value })}
              required
              disabled={!paperForm.semesterNumber || !paperForm.branch}
            >
              <option value="" className="bg-emerald-900">
                {!paperForm.branch ? "Select Semester & Branch first" : subjectsForPaper.length === 0 ? "No subjects found for this branch" : "Select Subject"}
              </option>
              {subjectsForPaper.map(sub => (
                <option key={sub._id} value={sub._id} className="bg-emerald-900">{sub.title}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-emerald-800/50">
            <div className="space-y-2">
              <label className="text-emerald-300 text-xs font-bold uppercase ml-4">Paper Title</label>
              <input
                type="text"
                placeholder="e.g. 2023 End Semester"
                className="w-full px-6 py-4 bg-emerald-800/50 border-2 border-emerald-700/50 rounded-[1.5rem] focus:border-emerald-400 focus:bg-emerald-800 transition-all outline-none text-white font-bold placeholder:text-emerald-600"
                value={paperForm.title}
                onChange={(e) => setPaperForm({ ...paperForm, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-emerald-300 text-xs font-bold uppercase ml-4">Year (optional)</label>
              <input
                type="text"
                placeholder="e.g. 2023"
                className="w-full px-6 py-4 bg-emerald-800/50 border-2 border-emerald-700/50 rounded-[1.5rem] focus:border-emerald-400 focus:bg-emerald-800 transition-all outline-none text-white font-bold placeholder:text-emerald-600"
                value={paperForm.year}
                onChange={(e) => setPaperForm({ ...paperForm, year: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-emerald-300 text-xs font-bold uppercase ml-4">PDF / Google Drive Link</label>
            <input
              type="url"
              placeholder="https://drive.google.com/..."
              className="w-full px-6 py-4 bg-emerald-800/50 border-2 border-emerald-700/50 rounded-[1.5rem] focus:border-emerald-400 focus:bg-emerald-800 transition-all outline-none text-white font-bold placeholder:text-emerald-600"
              value={paperForm.pdfUrl}
              onChange={(e) => setPaperForm({ ...paperForm, pdfUrl: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !paperForm.subjectId}
            className="w-full bg-white text-emerald-900 px-8 py-5 rounded-[1.5rem] font-black text-xl hover:bg-emerald-50 hover:shadow-2xl active:scale-[0.98] transition-all disabled:bg-emerald-800 disabled:text-emerald-700 mt-4"
          >
            {loading ? "Publishing..." : "Add Paper to Subject"}
          </button>
        </form>
      </section>

      <p className="text-center text-gray-400 text-sm font-medium pb-10">
        PYQ content is automatically categorized by Semester and Branch in the user app.
      </p>
    </div>
  );
}
