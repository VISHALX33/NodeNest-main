import { useState, useEffect } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";

const BRANCHES = ["CSE", "AI & DS", "IT", "ECE", "EE", "ME", "CE", "CHE", "Robotics", "Biomedical", "Aerospace", "Biotech", "Other"];

export default function PYQPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1=semester, 2=branch, 3=subjects, 4=papers
  const [selectedSem, setSelectedSem] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch subjects when sem + branch chosen
  useEffect(() => {
    if (selectedSem && selectedBranch) {
      setLoading(true);
      API.get(`/pyq/subjects?semester=${selectedSem}&branch=${encodeURIComponent(selectedBranch)}`)
        .then((res) => setSubjects(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [selectedSem, selectedBranch]);

  // Fetch papers when subject chosen
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-emerald-900 tracking-tight mb-3">
          PYQ Papers
        </h1>
        <div className="h-1.5 w-20 bg-emerald-500 mx-auto rounded-full mb-4" />
        <p className="text-sm sm:text-base text-gray-500 font-medium px-4">
          Previous Year Question Papers — Semester-wise &amp; Branch-wise
        </p>
      </div>

      {/* Sell Paper Banner */}
      <div 
        onClick={() => navigate("/sell-paper")}
        className="mb-8 p-4 sm:p-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-[2rem] text-white flex items-center justify-between gap-4 cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all shadow-emerald-200"
      >
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl items-center justify-center text-3xl">
            💰
          </div>
          <div>
            <h3 className="font-black text-lg sm:text-xl leading-tight">Got a question paper?</h3>
            <p className="text-white/80 text-xs sm:text-sm font-medium">Sell your exam papers and earn ₹20 instantly!</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-white text-emerald-700 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider">
          Sell Now
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-8 flex-wrap">
        <span className={`font-semibold ${step >= 1 ? "text-emerald-700" : "text-gray-400"}`}>
          {selectedSem ? `Sem ${selectedSem}` : "Semester"}
        </span>
        <span className="text-gray-300">›</span>
        <span className={`font-semibold ${step >= 2 ? "text-emerald-700" : "text-gray-400"}`}>
          {selectedBranch || "Branch"}
        </span>
        <span className="text-gray-300">›</span>
        <span className={`font-semibold ${step >= 3 ? "text-emerald-700" : "text-gray-400"}`}>
          {selectedSubject?.title || "Subject"}
        </span>
        <span className="text-gray-300">›</span>
        <span className={`font-semibold ${step >= 4 ? "text-emerald-700" : "text-gray-400"}`}>
          Papers
        </span>
      </div>

      {/* Back button */}
      {step > 1 && (
        <button
          onClick={back}
          className="mb-6 flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-600 transition"
        >
          ← Back
        </button>
      )}

      {/* ── STEP 1: Semester ── */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold text-emerald-800 mb-6">
            Select Semester
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <button
                key={sem}
                onClick={() => handleSemSelect(sem)}
                className="group bg-white border-2 border-emerald-100 hover:border-emerald-500 hover:bg-emerald-50 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="text-3xl font-black text-emerald-700 group-hover:text-emerald-600">
                  {sem}
                </div>
                <div className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wider">
                  Semester
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── STEP 2: Branch ── */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold text-emerald-800 mb-6">
            Select Branch — Semester {selectedSem}
          </h2>
          <div className="flex flex-wrap gap-4">
            {BRANCHES.map((branch) => (
              <button
                key={branch}
                onClick={() => handleBranchSelect(branch)}
                className="px-8 py-4 rounded-2xl border-2 border-emerald-100 bg-white hover:border-emerald-500 hover:bg-emerald-50 font-bold text-emerald-800 shadow-sm hover:shadow-md transition-all duration-200 text-lg"
              >
                {branch}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── STEP 3: Subjects ── */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold text-emerald-800 mb-6">
            Subjects — Sem {selectedSem} · {selectedBranch}
          </h2>
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-emerald-500" />
            </div>
          ) : subjects.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-5xl mb-4">📂</p>
              <p className="font-semibold">No subjects added yet for this selection.</p>
              <p className="text-sm mt-1">Check back later or contact admin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {subjects.map((sub) => (
                <div
                  key={sub._id}
                  onClick={() => handleSubjectSelect(sub)}
                  className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-400 hover:bg-emerald-50 cursor-pointer transition-all duration-200"
                >
                  <p className="text-lg font-bold text-emerald-900 text-center">
                    {sub.title}
                  </p>
                  <p className="text-xs text-gray-400 text-center mt-1 uppercase tracking-wider">
                    {sub.branch} · Sem {sub.semesterNumber}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── STEP 4: Papers ── */}
      {step === 4 && (
        <div>
          <h2 className="text-xl font-bold text-emerald-800 mb-2">
            {selectedSubject?.title}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {selectedBranch} · Semester {selectedSem}
          </p>
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-emerald-500" />
            </div>
          ) : papers.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-5xl mb-4">📝</p>
              <p className="font-semibold">No PYQ papers uploaded yet.</p>
              <p className="text-sm mt-1">Papers will appear here once added by admin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {papers.map((paper) => (
                <div
                  key={paper._id}
                  className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">📄</span>
                      <h3 className="font-bold text-emerald-900 text-sm leading-snug">
                        {paper.title}
                      </h3>
                    </div>
                    {paper.year && (
                      <p className="text-xs text-gray-400 mb-4 font-medium uppercase tracking-wider">
                        Year: {paper.year}
                      </p>
                    )}
                  </div>
                  <a
                    href={paper.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl text-center transition"
                  >
                    Open Paper
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Footer note */}
      <p className="text-center text-xs text-gray-400 mt-16">
        PYQ papers are shared by the community for educational purposes.
      </p>
    </div>
  );
}
