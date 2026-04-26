import React, { useState, useEffect } from "react";
import API from "../utils/axios";
import { 
  FileText, CheckCircle, Clock, AlertCircle, 
  ExternalLink, User, Phone, Mail, X, Image as ImageIcon,
  Download, Upload, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminServiceOrders({ filters }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [uploadingId, setUploadingId] = useState(null);
  const [deliveryFiles, setDeliveryFiles] = useState({});
  const [advanceProofFile, setAdvanceProofFile] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/service-orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch service orders", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    // Date filter
    const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
    if (filters?.startDate && orderDate < filters.startDate) return false;
    if (filters?.endDate && orderDate > filters.endDate) return false;

    // Search filter
    if (filters?.search) {
      const s = filters.search.toLowerCase();
      const match = 
        order.serviceName.toLowerCase().includes(s) || 
        order.orderId.toLowerCase().includes(s) ||
        (order.userDetails?.name || order.user?.name || "").toLowerCase().includes(s);
      if (!match) return false;
    }

    return true;
  });

  const updateStatus = async (id, statusData) => {
    setUpdatingId(id);
    try {
      await API.put(`/service-orders/${id}/status`, statusData);
      fetchOrders();
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleFileUpload = async (id) => {
    if (!deliveryFiles[id]) return alert("Please select a file first");
    setUploadingId(id);
    const formData = new FormData();
    formData.append("files", deliveryFiles[id]);

    try {
      await API.post(`/service-orders/${id}/files`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("File uploaded successfully");
      fetchOrders();
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploadingId(null);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading service orders...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-emerald-100 rounded-xl">
          <FileText className="text-emerald-700" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Research & Custom Orders</h2>
      </div>

      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No service orders found yet.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <motion.div 
              key={order._id}
              layout
              className="bg-white rounded-3xl shadow-sm border border-emerald-50 overflow-hidden transition-all hover:shadow-md"
            >
              <div 
                className="p-6 flex flex-wrap items-center justify-between gap-4 cursor-pointer"
                onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${order.formData?.orderType === "30_70_Custom" ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"}`}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{order.serviceName}</h3>
                    <p className="text-xs text-gray-400 font-medium">ID: {order.orderId} • {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-black text-emerald-900 text-lg">₹{order.totalAmount}</p>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      order.paymentStatus === "completed" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${
                    order.orderStatus === "delivered" ? "bg-blue-100 text-blue-700" : 
                    order.orderStatus === "in_progress" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
                  }`}>
                    {order.orderStatus}
                  </div>
                  <ChevronDown className={`text-gray-400 transition-transform ${expandedOrder === order._id ? "rotate-180" : ""}`} size={20} />
                </div>
              </div>

              <AnimatePresence>
                {expandedOrder === order._id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-50 bg-gray-50/30 p-6 space-y-8"
                  >
                    {/* User & Project Details Overhaul */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {/* Section 1: Customer Identity */}
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] flex items-center gap-2">
                          <User size={12} /> Customer Identity
                        </h4>
                        <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-3 shadow-sm">
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Full Name</p>
                            <p className="text-sm font-bold text-gray-800">{order.userDetails?.name || order.user?.name}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Contact Details</p>
                            <p className="text-sm font-medium text-gray-600 break-all">{order.userDetails?.email || order.user?.email}</p>
                            <p className="text-sm font-bold text-emerald-600">{order.userDetails?.phone || order.user?.phone}</p>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Academic Context */}
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] flex items-center gap-2">
                          <ImageIcon size={12} /> Academic Context
                        </h4>
                        <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-3 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-[10px] text-gray-400 uppercase font-bold">Course</p>
                              <p className="text-xs font-bold text-gray-700">{order.formData?.course || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-400 uppercase font-bold">Branch</p>
                              <p className="text-xs font-bold text-gray-700">{order.formData?.branch || "N/A"}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">College / University</p>
                            <p className="text-xs font-bold text-gray-700">{order.formData?.college || "N/A"}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-[10px] text-gray-400 uppercase font-bold">Subject</p>
                              <p className="text-xs font-bold text-gray-700">{order.formData?.subject || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-400 uppercase font-bold">Semester</p>
                              <p className="text-xs font-bold text-gray-700">{order.formData?.semester || "N/A"}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Project Scope */}
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] flex items-center gap-2">
                          <FileText size={12} /> Project Scope
                        </h4>
                        <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-3 shadow-sm">
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Topic Title</p>
                            <p className="text-xs font-bold text-gray-800 line-clamp-2">{order.formData?.title || "N/A"}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Objective</p>
                            <p className="text-[11px] text-gray-600 line-clamp-3 leading-relaxed italic">"{order.formData?.objective || "No objective provided"}"</p>
                          </div>
                          {order.formData?.keywords && (
                            <div>
                              <p className="text-[10px] text-gray-400 uppercase font-bold">Keywords</p>
                              <p className="text-[10px] font-medium text-purple-600">{order.formData.keywords}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Section 4: Formatting & Delivery */}
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em] flex items-center gap-2">
                          <Clock size={12} /> Formatting & Timing
                        </h4>
                        <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-3 shadow-sm">
                          <div className="flex justify-between items-center bg-rose-50 p-2 rounded-lg">
                            <span className="text-[10px] font-bold text-rose-700 uppercase">Deadline</span>
                            <span className="text-xs font-black text-rose-700">{order.formData?.deadline || "N/A"}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <p><span className="text-gray-400 font-bold uppercase">Format:</span> <span className="text-gray-700 font-bold">{Array.isArray(order.formData?.fileFormat) ? order.formData.fileFormat.join(", ") : order.formData?.fileFormat || "N/A"}</span></p>
                            <p><span className="text-gray-400 font-bold uppercase">Citation:</span> <span className="text-gray-700 font-bold">{order.formData?.citationStyle || "N/A"}</span></p>
                            <p><span className="text-gray-400 font-bold uppercase">Limit:</span> <span className="text-gray-700 font-bold">{order.formData?.limit || "N/A"}</span></p>
                            <p><span className="text-gray-400 font-bold uppercase">Urgency:</span> <span className="text-rose-600 font-black">{order.formData?.urgency || "Normal"}</span></p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Team & Special Instructions */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Team Members ({order.formData?.teamSize || 1})</h4>
                        <div className="bg-white p-4 rounded-2xl border border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3 shadow-sm">
                          {order.formData?.studentNames?.map((name, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl">
                              <span className="w-5 h-5 flex items-center justify-center bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full">{idx + 1}</span>
                              <span className="text-xs font-bold text-gray-700">{name || "Unnamed"}</span>
                            </div>
                          ))}
                          <div className="col-span-full mt-2 pt-2 border-t border-gray-50">
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Guide Name</p>
                            <p className="text-xs font-bold text-gray-800">{order.formData?.guideName || "None mentioned"}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Requirements & Instructions</h4>
                        <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100 space-y-4 shadow-sm">
                          <div className="flex flex-wrap gap-2">
                            {order.formData?.includeDiagrams && <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-[10px] font-bold">DIAGRAMS</span>}
                            {order.formData?.includeCode && <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-[10px] font-bold">CODE/SIM</span>}
                            {order.formData?.includePlagiarism && <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-[10px] font-bold">PLAG REPORT</span>}
                            <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-[10px] font-bold">{order.formData?.revisions || 0} REVISIONS</span>
                          </div>
                          <div>
                            <p className="text-[10px] text-amber-700 uppercase font-bold mb-1">Faculty Instructions</p>
                            <p className="text-xs text-amber-900 leading-relaxed italic">
                              {order.formData?.facultyInstructions || "No special instructions provided by faculty."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Admin Actions Bar */}
                    <div className="bg-emerald-900 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
                      <div className="flex items-center gap-6">
                        <div className="space-y-1">
                          <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Update Order Status</p>
                          <select 
                            className="bg-emerald-800 text-white text-xs font-bold rounded-lg px-3 py-1.5 outline-none border border-emerald-700"
                            value={order.orderStatus}
                            onChange={(e) => updateStatus(order._id, { orderStatus: e.target.value })}
                            disabled={updatingId === order._id}
                          >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Payment Status</p>
                          <select 
                            className="bg-emerald-800 text-white text-xs font-bold rounded-lg px-3 py-1.5 outline-none border border-emerald-700"
                            value={order.paymentStatus}
                            onChange={(e) => updateStatus(order._id, { paymentStatus: e.target.value })}
                            disabled={updatingId === order._id}
                          >
                            <option value="pending">Awaiting Verification</option>
                            <option value="completed">Payment Verified</option>
                            <option value="failed">Verification Failed</option>
                          </select>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Platform Note</p>
                        <p className="text-[10px] text-white font-medium italic opacity-60">Verified via NoteSea Secure Checkout</p>
                      </div>
                    </div>

                    {/* Files Section */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Client Uploads & Proofs</h4>
                      <div className="flex flex-wrap gap-4">
                        {order.clientFiles?.map((file, i) => {
                          const isImage = file.match(/\.(jpg|jpeg|png|gif|webp)$/i);
                          return (
                            <div key={i} className="group relative">
                              {isImage ? (
                                <div 
                                  className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-white shadow-sm cursor-zoom-in group-hover:shadow-md transition-all"
                                  onClick={() => setSelectedImage(file)}
                                >
                                  <img src={file} alt="Proof" className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <ImageIcon className="text-white" size={20} />
                                  </div>
                                </div>
                              ) : (
                                <a 
                                  href={file} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="w-32 h-32 rounded-2xl bg-white border-2 border-white shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-emerald-50 transition-all text-emerald-600"
                                >
                                  <FileText size={24} />
                                  <span className="text-[10px] font-black uppercase">Download</span>
                                </a>
                              )}
                            </div>
                          );
                        })}
                        {(!order.clientFiles || order.clientFiles.length === 0) && <p className="text-xs text-gray-400 italic">No files uploaded by client.</p>}
                      </div>
                    </div>

                    {/* Delivery Section */}
                    <div className="bg-white rounded-2xl p-6 border border-emerald-100 space-y-4">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Final Delivery</h4>
                      <div className="flex flex-wrap items-center gap-4">
                        {order.deliveredFiles?.map((file, i) => (
                          <a 
                            key={i} 
                            href={file} 
                            target="_blank" 
                            rel="noreferrer"
                            className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-emerald-100"
                          >
                            <Download size={14} /> File {i + 1}
                          </a>
                        ))}
                        <div className="flex items-center gap-2">
                          <input 
                            type="file" 
                            id={`file-upload-${order._id}`}
                            className="hidden" 
                            onChange={(e) => setDeliveryFiles({ ...deliveryFiles, [order._id]: e.target.files[0] })}
                          />
                          <label 
                            htmlFor={`file-upload-${order._id}`}
                            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-xs font-bold cursor-pointer hover:bg-gray-200 flex items-center gap-2"
                          >
                            <Upload size={14} /> {deliveryFiles[order._id] ? deliveryFiles[order._id].name : "Select Delivery File"}
                          </label>
                          {deliveryFiles[order._id] && (
                            <button 
                              onClick={() => handleFileUpload(order._id)}
                              disabled={uploadingId === order._id}
                              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 disabled:bg-gray-300"
                            >
                              {uploadingId === order._id ? "Uploading..." : "Send to Client"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
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
