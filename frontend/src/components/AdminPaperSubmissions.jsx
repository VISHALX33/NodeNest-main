import React, { useState, useEffect } from "react";
import API from "../utils/axios";
import { 
  FileText, CheckCircle, Clock, AlertCircle, 
  User, Phone, Mail, X, Image as ImageIcon,
  DollarSign, Check, Ban
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPaperSubmissions({ filters }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await API.get("/paper-submissions");
      setSubmissions(res.data);
    } catch (err) {
      console.error("Failed to fetch submissions", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubmissions = submissions.filter((sub) => {
    // Date filter
    const subDate = new Date(sub.createdAt).toISOString().split('T')[0];
    if (filters?.startDate && subDate < filters.startDate) return false;
    if (filters?.endDate && subDate > filters.endDate) return false;

    // Search filter
    if (filters?.search) {
      const s = filters.search.toLowerCase();
      const match = 
        sub.subjectName.toLowerCase().includes(s) || 
        sub.user?.name?.toLowerCase().includes(s) ||
        sub.branch?.toLowerCase().includes(s);
      if (!match) return false;
    }

    return true;
  });

  const updateStatus = async (id, statusData) => {
    setUpdatingId(id);
    try {
      await API.put(`/paper-submissions/${id}`, statusData);
      fetchSubmissions();
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading submissions...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-100 rounded-xl">
          <DollarSign className="text-blue-700" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Paper Submissions (₹20 Program)</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No submissions to review.</p>
          </div>
        ) : (
          filteredSubmissions.map((sub) => (
            <div key={sub._id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                    {sub.subjectName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{sub.subjectName}</h3>
                    <p className="text-xs text-gray-400 font-medium">
                      Submitted by {sub.user?.name} • {new Date(sub.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded uppercase">Year: {sub.year}</span>
                      <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded uppercase">Sem: {sub.semester}</span>
                      <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded uppercase">Branch: {sub.branch}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    sub.status === "paid" ? "bg-emerald-100 text-emerald-700" :
                    sub.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"
                  }`}>
                    {sub.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Paper Images */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Exam Paper Images</h4>
                  <div className="flex flex-wrap gap-2">
                    {sub.paperImages.map((img, i) => (
                      <div 
                        key={i} 
                        className="w-20 h-20 rounded-xl overflow-hidden cursor-zoom-in border border-gray-100 hover:shadow-md transition-all"
                        onClick={() => setSelectedImage(img)}
                      >
                        <img src={img} alt="Paper" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* User QR Code */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">User Payment QR (UPI)</h4>
                  <div 
                    className="w-20 h-20 rounded-xl overflow-hidden cursor-zoom-in border-2 border-emerald-100 p-1 hover:shadow-md transition-all"
                    onClick={() => setSelectedImage(sub.qrCode)}
                  >
                    <img src={sub.qrCode} alt="QR Code" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-6 text-xs font-medium text-gray-500">
                  <span className="flex items-center gap-2"><Phone size={14}/> {sub.user?.phone}</span>
                  <span className="flex items-center gap-2"><Mail size={14}/> {sub.user?.email}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => updateStatus(sub._id, { status: "rejected" })}
                    disabled={updatingId === sub._id}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                    title="Reject"
                  >
                    <Ban size={20} />
                  </button>
                  <button 
                    onClick={() => updateStatus(sub._id, { status: "paid" })}
                    disabled={updatingId === sub._id}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all"
                  >
                    <Check size={16} /> Mark as Paid (₹20)
                  </button>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Image Modal Popup */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-[2rem] overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </button>
              <img src={selectedImage} alt="Preview" className="w-full h-full object-contain bg-gray-900" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
