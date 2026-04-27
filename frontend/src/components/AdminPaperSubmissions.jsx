import React, { useState, useEffect } from "react";
import API from "../utils/axios";
import { 
  FileText, CheckCircle, Clock, AlertCircle, 
  User, Phone, Mail, X, Image as ImageIcon,
  DollarSign, Check, Ban, ChevronLeft, ChevronRight, Download, ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPaperSubmissions({ filters }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [galleryData, setGalleryData] = useState(null); // { images: [], index: 0, title: "" }
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

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      // Fallback for cross-origin or other errors
      window.open(url, "_blank");
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
                        className="w-20 h-20 rounded-xl overflow-hidden cursor-zoom-in border border-gray-100 hover:shadow-md transition-all relative group"
                        onClick={() => setGalleryData({ images: sub.paperImages, index: i, title: `${sub.subjectName} - Page ${i + 1}` })}
                      >
                        <img src={img} alt="Paper" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ImageIcon className="text-white" size={20} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* User QR Code */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">User Payment QR (UPI)</h4>
                  <div 
                    className="w-20 h-20 rounded-xl overflow-hidden cursor-zoom-in border-2 border-emerald-100 p-1 hover:shadow-md transition-all relative group"
                    onClick={() => setGalleryData({ images: [sub.qrCode], index: 0, title: `UPI QR - ${sub.user?.name}` })}
                  >
                    <img src={sub.qrCode} alt="QR Code" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ImageIcon className="text-emerald-700" size={20} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-6 text-xs font-medium text-gray-500">
                  <span className="flex items-center gap-2"><Phone size={14}/> {sub.user?.phone}</span>
                  <span className="flex items-center gap-2"><Mail size={14}/> {sub.user?.email}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {sub.status === "pending" ? (
                    <>
                      <button 
                        onClick={() => updateStatus(sub._id, { status: "rejected" })}
                        disabled={updatingId === sub._id}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                        title="Reject"
                      >
                        {updatingId === sub._id ? <Clock size={20} className="animate-spin text-gray-400" /> : <Ban size={20} />}
                      </button>
                      <button 
                        onClick={() => updateStatus(sub._id, { status: "paid" })}
                        disabled={updatingId === sub._id}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all min-w-[140px] justify-center"
                      >
                        {updatingId === sub._id ? <Clock size={16} className="animate-spin" /> : <Check size={16} />} 
                        {updatingId === sub._id ? "Processing..." : "Mark as Paid (₹20)"}
                      </button>
                    </>
                  ) : sub.status === "paid" ? (
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-black border border-emerald-100">
                      <CheckCircle size={16} /> Payment Verified
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-black border border-rose-100">
                      <Ban size={16} /> Rejected
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Image Modal Popup / Gallery */}
      <AnimatePresence>
        {galleryData && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setGalleryData(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-6xl h-full max-h-[90vh] flex flex-col bg-gray-900 rounded-[2rem] overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 bg-gray-900/50 backdrop-blur-md border-b border-white/5 absolute top-0 left-0 w-full z-10">
                <div>
                  <h3 className="text-white font-bold">{galleryData.title}</h3>
                  <p className="text-gray-400 text-xs uppercase tracking-widest font-black mt-1">
                    Image {galleryData.index + 1} of {galleryData.images.length}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleDownload(galleryData.images[galleryData.index], `${galleryData.title.replace(/\s+/g, '_')}.jpg`)}
                    className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all flex items-center gap-2 text-xs font-bold"
                  >
                    <Download size={18} /> Download
                  </button>
                  <button 
                    className="p-3 bg-white/10 hover:bg-rose-500/20 text-white hover:text-rose-400 rounded-2xl transition-all"
                    onClick={() => setGalleryData(null)}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-grow flex items-center justify-center p-8 relative group">
                {/* Navigation Buttons */}
                {galleryData.images.length > 1 && (
                  <>
                    <button 
                      onClick={() => setGalleryData(prev => ({ ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }))}
                      className="absolute left-6 p-4 bg-white/5 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={32} />
                    </button>
                    <button 
                      onClick={() => setGalleryData(prev => ({ ...prev, index: (prev.index + 1) % prev.images.length }))}
                      className="absolute right-6 p-4 bg-white/5 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={32} />
                    </button>
                  </>
                )}

                <img 
                  src={galleryData.images[galleryData.index]} 
                  alt="Preview" 
                  className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                />
              </div>

              {/* Modal Footer / Thumbnails (only if multiple images) */}
              {galleryData.images.length > 1 && (
                <div className="p-4 bg-gray-900/50 backdrop-blur-md border-t border-white/5 flex justify-center gap-2 overflow-x-auto">
                  {galleryData.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setGalleryData(prev => ({ ...prev, index: idx }))}
                      className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${galleryData.index === idx ? "border-emerald-500 scale-110 shadow-lg shadow-emerald-500/20" : "border-transparent opacity-50 hover:opacity-100"}`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
