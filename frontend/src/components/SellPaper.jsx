import React, { useState, useEffect } from "react";
import API from "../utils/axios";
import {
  Upload, Image as ImageIcon, CheckCircle,
  Clock, AlertCircle, Trash2, Camera, QrCode as QrIcon,
  ChevronRight, ArrowRight, Wallet
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SellPaper() {
  const [subjectName, setSubjectName] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [paperImages, setPaperImages] = useState([]);
  const [qrCode, setQrCode] = useState(null);
  const [mySubmissions, setMySubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchMySubmissions();
  }, []);

  const fetchMySubmissions = async () => {
    try {
      const res = await API.get("/paper-submissions/mine");
      setMySubmissions(res.data);
    } catch (err) {
      console.error("Failed to fetch submissions", err);
    } finally {
      setFetching(false);
    }
  };

  const handlePaperImages = (e) => {
    const files = Array.from(e.target.files);
    setPaperImages([...paperImages, ...files]);
  };

  const removePaperImage = (index) => {
    setPaperImages(paperImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subjectName || !year || !semester || !branch || paperImages.length === 0 || !qrCode) {
      return setMessage({ type: "error", text: "Please fill all fields and upload required images." });
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("subjectName", subjectName);
    formData.append("year", year);
    formData.append("semester", semester);
    formData.append("branch", branch);
    paperImages.forEach((img) => formData.append("paperImages", img));
    formData.append("qrCode", qrCode);

    try {
      await API.post("/paper-submissions", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMessage({ type: "success", text: "Paper submitted successfully! Our team will verify and pay you ₹20 shortly." });
      setSubjectName("");
      setYear("");
      setSemester("");
      setBranch("");
      setPaperImages([]);
      setQrCode(null);
      fetchMySubmissions();
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Submission failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-xl shadow-emerald-900/5">
          <div className="flex-1 text-center md:text-left space-y-4">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold"
            >
              <Wallet size={16} /> Earn ₹20 per Paper
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Sell Your <span className="text-emerald-600">Exam Papers</span>
            </h1>
            <p className="text-slate-500 max-w-xl font-medium text-lg">
              Help other students prepare and get paid instantly. Upload clear images of your PYQs and your payment QR code.
            </p>
          </div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-slate-50"
          >
            <img src="/sellpaper.png" alt="How to Earn with NoteSea" className="w-full h-auto" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Submission Form */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-emerald-900/5 border border-slate-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Subject Name</label>
                <input
                  type="text"
                  placeholder="e.g. Data Structures & Algorithms"
                  className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-slate-700 font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-emerald-500 transition-all"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Year (2026+)</label>
                  <select
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-slate-700 font-bold focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option value="">Select</option>
                    {[2026, 2027, 2028, 2029, 2030].map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Semester</label>
                  <select
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-slate-700 font-bold focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                  >
                    <option value="">Select</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s}>Sem {s}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Branch</label>
                  <select
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-slate-700 font-bold focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  >
                    <option value="">Select</option>
                    {["CSE", "AI & DS", "IT", "ECE", "EE", "ME", "CE", "CHE", "Robotics", "Biomedical", "Aerospace", "Biotech", "Other"].map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Paper Images (Clear Shots)</label>
                <div className="grid grid-cols-3 gap-3">
                  {paperImages.map((img, i) => (
                    <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-100">
                      <img src={URL.createObjectURL(img)} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePaperImage(i)}
                        className="absolute inset-0 bg-rose-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer group">
                    <Camera className="text-slate-300 group-hover:text-emerald-500 transition-colors" size={24} />
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-emerald-600">Add Image</span>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handlePaperImages} />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Your Payment QR (UPI)</label>
                <label className={`block p-4 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${qrCode ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:border-emerald-500"}`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${qrCode ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"}`}>
                      <QrIcon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">{qrCode ? qrCode.name : "Upload QR Code Screenshot"}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{qrCode ? "Image selected" : "JPEG, PNG supported"}</p>
                    </div>
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => setQrCode(e.target.files[0])} />
                </label>
              </div>

              {/* Disclaimer */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 space-y-2">
                <div className="flex gap-3">
                  <AlertCircle className="text-amber-600 shrink-0" size={18} />
                  <p className="text-[11px] text-amber-800 font-black leading-relaxed uppercase">
                    Important: If this paper is already available on NoteSea, your submission will be rejected.
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="text-emerald-600 shrink-0" size={18} />
                  <p className="text-[11px] text-slate-600 font-bold leading-relaxed uppercase">
                    Upload only clear, high-quality images. Ensure there is no handwriting, overwriting, or any type of watermark on the paper.
                  </p>
                </div>
              </div>

              {message && (
                <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-bold ${message.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                  {message.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group disabled:bg-slate-300 disabled:shadow-none"
              >
                {loading ? "Uploading..." : (
                  <>
                    Submit & Earn ₹20 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Activity Section */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-slate-800 px-2 flex items-center gap-2">
              <Clock className="text-emerald-500" size={20} /> My Submissions
            </h3>

            <div className="space-y-4">
              {fetching ? (
                [1, 2].map(i => <div key={i} className="h-20 bg-white rounded-3xl animate-pulse" />)
              ) : mySubmissions.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-[2rem] border border-slate-100">
                  <p className="text-slate-400 font-medium">No submissions yet.</p>
                </div>
              ) : (
                mySubmissions.map((sub) => (
                  <div key={sub._id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-emerald-600">
                        <ImageIcon size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{sub.subjectName}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{new Date(sub.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-slate-900">₹{sub.paymentAmount}</p>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${sub.status === "paid" ? "bg-emerald-100 text-emerald-700" :
                          sub.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"
                        }`}>
                        {sub.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
