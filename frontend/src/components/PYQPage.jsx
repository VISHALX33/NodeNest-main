import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  Layers,
  ExternalLink,
  IndianRupee,
  Search,
  FolderOpen,
} from "lucide-react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";

const BRANCHES = ["CSE", "AI & DS", "IT", "ECE", "EE", "ME", "CE", "CHE", "Robotics", "Biomedical", "Aerospace", "Biotech", "Other"];

const STEPS = [
  { id: 1, label: "Semester", icon: GraduationCap },
  { id: 2, label: "Branch", icon: Layers },
  { id: 3, label: "Subject", icon: BookOpen },
  { id: 4, label: "Papers", icon: FileText },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

export default function PYQPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedSem, setSelectedSem] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedSem && selectedBranch) {
      setLoading(true);
      API.get(`/pyq/subjects?semester=${selectedSem}&branch=${encodeURIComponent(selectedBranch)}`)
        .then((res) => setSubjects(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [selectedSem, selectedBranch]);

  useEffect(() => {
    if (selectedSubject) {
      setLoading(true);
      API.get(`/pyq/${selectedSubject._id}/papers`)
        .then((res) => setPapers(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [selectedSubject]);

  const handleSemSelect = (sem) => {
    setSelectedSem(sem);
    setSelectedBranch(null);
    setSelectedSubject(null);
    setSubjects([]);
    setPapers([]);
    setStep(2);
  };

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    setSelectedSubject(null);
    setPapers([]);
    setStep(3);
  };

  const handleSubjectSelect = (sub) => {
    setSelectedSubject(sub);
    setStep(4);
  };

  const back = () => {
    if (step === 4) { setStep(3); setSelectedSubject(null); setPapers([]); }
    else if (step === 3) { setStep(2); setSelectedBranch(null); setSubjects([]); }
    else if (step === 2) { setStep(1); setSelectedSem(null); }
  };

  const stepTitle = () => {
    if (step === 1) return "Select your semester";
    if (step === 2) return `Choose branch — Semester ${selectedSem}`;
    if (step === 3) return `Pick a subject — ${selectedBranch}`;
    return selectedSubject?.title || "Question papers";
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-emerald-50/50 via-white to-white overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-emerald-200/25 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-20 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 p-8 md:p-10 mb-8 text-white shadow-xl"
        >
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
                <Sparkles size={12} /> Exam Prep
              </span>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Previous Year Question Papers
              </h1>
              <p className="mt-4 text-emerald-50/90 text-sm md:text-base leading-relaxed">
                Browse semester-wise, branch-wise PYQs shared by the NoteSea community — free to open and download.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-lg text-xs font-bold">
                  <Search size={14} /> Semester → Branch → Subject
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-lg text-xs font-bold">
                  <FileText size={14} /> PDF downloads
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sell paper banner */}
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate("/sell-paper")}
          className="w-full mb-8 p-5 sm:p-6 bg-white border border-emerald-100 rounded-3xl flex items-center justify-between gap-4 cursor-pointer hover:border-emerald-300 hover:shadow-lg transition-all shadow-sm text-left group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700 shrink-0">
              <IndianRupee size={24} />
            </div>
            <div>
              <h3 className="font-black text-emerald-900 text-base sm:text-lg leading-tight">
                Got a question paper?
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm font-medium mt-0.5">
                Upload your exam papers and earn ₹20 instantly!
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 group-hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-colors shrink-0">
            Sell Now <ArrowRight size={14} />
          </span>
        </motion.button>

        {/* Step progress */}
        <div className="mb-8 bg-white border border-emerald-100 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const active = step >= s.id;
              const current = step === s.id;
              return (
                <div key={s.id} className="flex items-center flex-1 min-w-0">
                  <div className="flex flex-col items-center flex-1 min-w-0">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all ${
                        current
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                          : active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs font-bold mt-1.5 truncate w-full text-center ${
                        active ? "text-emerald-700" : "text-gray-400"
                      }`}
                    >
                      {s.id === 1 && selectedSem ? `Sem ${selectedSem}` : s.id === 2 && selectedBranch ? selectedBranch : s.id === 3 && selectedSubject ? "Selected" : s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-1 sm:mx-2 rounded-full mb-5 ${
                        step > s.id ? "bg-emerald-400" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step header + back */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">
              Step {step} of 4
            </p>
            <h2 className="text-xl sm:text-2xl font-black text-emerald-900">{stepTitle()}</h2>
          </div>
          {step > 1 && (
            <button
              type="button"
              onClick={back}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-emerald-200 text-emerald-700 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-colors shrink-0"
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem, i) => (
                <motion.button
                  key={sem}
                  type="button"
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSemSelect(sem)}
                  className="group bg-white border-2 border-emerald-100 hover:border-emerald-500 rounded-2xl p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="text-3xl sm:text-4xl font-black text-emerald-700 group-hover:text-emerald-600">
                    {sem}
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-500 mt-2 font-bold uppercase tracking-wider">
                    Semester
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-wrap gap-3"
            >
              {BRANCHES.map((branch, i) => (
                <motion.button
                  key={branch}
                  type="button"
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBranchSelect(branch)}
                  className="px-5 sm:px-7 py-3.5 rounded-2xl border-2 border-emerald-100 bg-white hover:border-emerald-500 hover:bg-emerald-50 font-bold text-emerald-800 shadow-sm hover:shadow-md transition-all text-sm sm:text-base"
                >
                  {branch}
                </motion.button>
              ))}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {loading ? (
                <LoadingState label="Loading subjects…" />
              ) : subjects.length === 0 ? (
                <EmptyState
                  icon={FolderOpen}
                  title="No subjects yet"
                  desc="Nothing added for this semester and branch. Check back later or contact admin."
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjects.map((sub, i) => (
                    <motion.button
                      key={sub._id}
                      type="button"
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ y: -4 }}
                      onClick={() => handleSubjectSelect(sub)}
                      className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-400 hover:bg-emerald-50/50 cursor-pointer transition-all text-left group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                        <BookOpen size={20} />
                      </div>
                      <p className="text-base font-bold text-emerald-900 leading-snug">{sub.title}</p>
                      <p className="text-xs text-gray-400 mt-2 font-semibold uppercase tracking-wider">
                        {sub.branch} · Sem {sub.semesterNumber}
                      </p>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <p className="text-sm text-gray-500 mb-6 -mt-2">
                {selectedBranch} · Semester {selectedSem}
              </p>
              {loading ? (
                <LoadingState label="Loading papers…" />
              ) : papers.length === 0 ? (
                <EmptyState
                  icon={FileText}
                  title="No papers uploaded yet"
                  desc="PYQ papers will appear here once added by admin or community uploads."
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {papers.map((paper, i) => (
                    <motion.article
                      key={paper._id}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      className="bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
                    >
                      <div className="h-24 bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center relative">
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage: "radial-gradient(circle at 2px 2px, #059669 1px, transparent 0)",
                            backgroundSize: "14px 14px",
                          }}
                        />
                        <FileText size={36} className="text-emerald-600 relative" />
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="font-bold text-emerald-900 text-sm leading-snug mb-2 line-clamp-2">
                          {paper.title}
                        </h3>
                        {paper.year && (
                          <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-4">
                            Year {paper.year}
                          </p>
                        )}
                        <a
                          href={paper.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl text-center transition flex items-center justify-center gap-2"
                        >
                          Open Paper <ExternalLink size={14} />
                        </a>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-xs text-gray-400 mt-16">
          PYQ papers are shared by the community for educational purposes only.
        </p>
      </div>
    </div>
  );
}

function LoadingState({ label }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="animate-spin rounded-full h-10 w-10 border-2 border-emerald-200 border-t-emerald-600" />
      <p className="text-sm font-semibold text-gray-500">{label}</p>
    </div>
  );
}

function EmptyState({ icon: Icon, title, desc }) {
  return (
    <div className="text-center py-16 px-6 bg-white border border-emerald-100 rounded-3xl">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
        <Icon size={28} />
      </div>
      <p className="font-bold text-emerald-900 text-lg">{title}</p>
      <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">{desc}</p>
    </div>
  );
}
