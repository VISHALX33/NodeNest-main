import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, CheckCircle, Phone, X, CreditCard, User, Mail, 
  MessageSquare, ChevronDown, Camera, ShieldCheck, Info
} from "lucide-react";
import Modal from "react-modal";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";

// Modal accessibility
Modal.setAppElement("#root");

export default function ResearchCustom() {
  const navigate = useNavigate();
  const [isLoggedIn] = useState(!!localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [files, setFiles] = useState([]);
  const [eSignFile, setESignFile] = useState(null);
  const [advanceProofFile, setAdvanceProofFile] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "Custom Project",
    totalAgreedPrice: "",
    course: "",
    branch: "",
    college: "",
    subject: "",
    semester: "",
    title: "",
    objective: "",
    keywords: "",
    abstract: "",
    deadline: "",
    platform: "",
    fileFormat: ["Word (DOCX)"],
    fontDetails: "",
    lineSpacing: "",
    citationStyle: "IEEE",
    limit: "",
    teamSize: 1,
    studentNames: [""],
    guideName: "",
    facultyInstructions: "",
    includeDiagrams: false,
    includeCode: false,
    includePlagiarism: false,
    revisions: 2,
    urgency: "Normal",
    referenceMaterial: "",
    formDate: new Date().toISOString().split('T')[0],
    orderType: "30_70_Custom",
  });

  /* ================= HANDLERS ================= */
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTeamSizeChange = (e) => {
    const val = e.target.value;
    const size = val === "" ? "" : parseInt(val);
    const effectiveSize = Math.max(1, parseInt(val) || 1);
    
    const names = [...formData.studentNames];
    if (names.length < effectiveSize) {
      for (let i = names.length; i < effectiveSize; i++) names.push("");
    } else {
      names.length = effectiveSize;
    }
    setFormData({ ...formData, teamSize: size, studentNames: names });
  };

  const handleStudentNameChange = (index, value) => {
    const names = [...formData.studentNames];
    names[index] = value;
    setFormData({ ...formData, studentNames: names });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleMultiSelectChange = (name, val) => {
    const current = formData[name] || [];
    const updated = current.includes(val)
      ? current.filter(i => i !== val)
      : [...current, val];
    setFormData({ ...formData, [name]: updated });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) return alert("Please login to proceed.");
    if (loading) return;
    if (!agreed) return alert("Please agree to the Terms & Conditions.");
    if (!eSignFile) return alert("Please upload your e-signature.");
    if (!advanceProofFile) return alert("Please upload the 30% advance payment proof.");
    if (!formData.totalAgreedPrice) return alert("Please enter the total agreed price.");

    setLoading(true);

    try {
      const data = new FormData();
      data.append("serviceName", "Custom Project (30/70)");
      data.append("servicePrice", formData.totalAgreedPrice);
      data.append("userDetails", JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      }));
      
      const { name, email, phone, ...rest } = formData;
      data.append("formData", JSON.stringify(rest));
      
      // Append files
      if (eSignFile) data.append("clientFiles", eSignFile);
      if (advanceProofFile) data.append("clientFiles", advanceProofFile);
      files.forEach(file => data.append("clientFiles", file));

      const res = await API.post("/service-orders", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("✅ Custom Order Submitted Successfully! Our team will verify the payment and get back to you.");
      navigate("/my-bookings");
    } catch (err) {
      alert(err.response?.data?.message || "Order submission failed");
    } finally {
      setLoading(false);
    }
  };

  const advanceAmount = formData.totalAgreedPrice ? (parseFloat(formData.totalAgreedPrice) * 0.3).toFixed(2) : 0;
  const remainingAmount = formData.totalAgreedPrice ? (parseFloat(formData.totalAgreedPrice) * 0.7).toFixed(2) : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block p-1 rounded-full bg-emerald-50 border border-emerald-100 mb-4 px-4 py-2"
          >
            <p className="text-emerald-700 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={14} /> Direct Client Portal
            </p>
          </motion.div>
          <h2 className="text-3xl font-black text-emerald-900 mb-4">Custom Project Request</h2>
          <p className="text-gray-600 font-medium">30% Advance | 70% After Handover Model</p>
          
          {/* Progress Tracker */}
          <div className="mt-8 flex justify-between items-center max-w-2xl mx-auto relative px-2">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
            <motion.div 
              className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 z-0"
              animate={{ width: `${((step - 1) / 7) * 100}%` }}
            ></motion.div>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <div 
                key={s} 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-all duration-500 ${
                  s <= step ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" : "bg-white text-gray-400 border border-gray-200"
                }`}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-emerald-50">
          <div className="p-8 sm:p-12">
            <form id="custom-project-form" onSubmit={handleFormSubmit} className="space-y-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-xl font-bold text-emerald-900 border-l-4 border-emerald-500 pl-4">1. Project Economics & Identity</h3>
                    <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 mb-6">
                      <div className="flex items-center gap-3 text-emerald-800 mb-4">
                        <Info size={20} />
                        <p className="text-sm font-bold">Please enter the total project price as discussed with our team.</p>
                      </div>
                      <InputField 
                        label="Total Agreed Price (₹)" 
                        name="totalAgreedPrice" 
                        type="number" 
                        value={formData.totalAgreedPrice} 
                        onChange={handleFormChange} 
                        placeholder="e.g., 5000"
                        icon={<CreditCard size={14} />}
                        required 
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="Full Name" name="name" value={formData.name} onChange={handleFormChange} icon={<User size={14} />} required />
                      <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleFormChange} icon={<Mail size={14} />} required />
                    </div>
                    <InputField label="Contact Number (WhatsApp)" name="phone" value={formData.phone} onChange={handleFormChange} icon={<Phone size={14} />} required />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-xl font-bold text-emerald-900 border-l-4 border-emerald-500 pl-4">2. Academic Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <SelectField label="Service Type" name="serviceType" value={formData.serviceType} onChange={handleFormChange} options={["Custom Project", "Research Paper", "Report", "PPT + Report", "PPT", "Other"]} />
                      <InputField label="Course / Degree" name="course" value={formData.course} onChange={handleFormChange} placeholder="e.g., B.Tech, MBA" required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="Branch / Stream" name="branch" value={formData.branch} onChange={handleFormChange} required />
                      <InputField label="College Name" name="college" value={formData.college} onChange={handleFormChange} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="Subject Name" name="subject" value={formData.subject} onChange={handleFormChange} required />
                      <InputField label="Semester / Year" name="semester" value={formData.semester} onChange={handleFormChange} required />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-xl font-bold text-emerald-900 border-l-4 border-emerald-500 pl-4">3. Project Scope</h3>
                    <InputField label="Title / Topic" name="title" value={formData.title} onChange={handleFormChange} required />
                    <TextAreaField label="Objective / Problem Statement" name="objective" value={formData.objective} onChange={handleFormChange} required />
                    <InputField label="Keywords" name="keywords" value={formData.keywords} onChange={handleFormChange} />
                    <TextAreaField label="Abstract / Idea" name="abstract" value={formData.abstract} onChange={handleFormChange} />
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-xl font-bold text-emerald-900 border-l-4 border-emerald-500 pl-4">4. Formatting & Deadline</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="Deadline" name="deadline" type="date" value={formData.deadline} onChange={handleFormChange} required />
                      <InputField label="Submission Platform" name="platform" value={formData.platform} onChange={handleFormChange} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <MultiSelectField label="File Format" name="fileFormat" value={formData.fileFormat} onToggle={(val) => handleMultiSelectChange("fileFormat", val)} options={["Word", "PDF", "PPT", "Excel", "Other"]} />
                      <InputField label="Font Details" name="fontDetails" value={formData.fontDetails} onChange={handleFormChange} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <InputField label="Line Spacing" name="lineSpacing" value={formData.lineSpacing} onChange={handleFormChange} />
                      <SelectField label="Citation Style" name="citationStyle" value={formData.citationStyle} onChange={handleFormChange} options={["IEEE", "APA", "MLA", "Harvard", "Not Required"]} />
                      <InputField label="Limit" name="limit" value={formData.limit} onChange={handleFormChange} />
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-xl font-bold text-emerald-900 border-l-4 border-emerald-500 pl-4">5. Team Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="Team Size" name="teamSize" type="number" value={formData.teamSize} onChange={handleTeamSizeChange} required />
                      <InputField label="Guide Name" name="guideName" value={formData.guideName} onChange={handleFormChange} />
                    </div>
                    <div className="space-y-4">
                      {formData.studentNames.map((name, i) => (
                        <InputField key={i} label={`Student ${i + 1}`} value={name} onChange={(e) => handleStudentNameChange(i, e.target.value)} required />
                      ))}
                    </div>
                    <TextAreaField label="Faculty Instructions" name="facultyInstructions" value={formData.facultyInstructions} onChange={handleFormChange} />
                  </motion.div>
                )}

                {step === 6 && (
                  <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-xl font-bold text-emerald-900 border-l-4 border-emerald-500 pl-4">6. Delivery Requirements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <CheckboxField label="Diagrams" name="includeDiagrams" checked={formData.includeDiagrams} onChange={handleCheckboxChange} />
                      <CheckboxField label="Code" name="includeCode" checked={formData.includeCode} onChange={handleCheckboxChange} />
                      <CheckboxField label="Plagiarism Report" name="includePlagiarism" checked={formData.includePlagiarism} onChange={handleCheckboxChange} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="Revisions" name="revisions" type="number" value={formData.revisions} onChange={handleFormChange} />
                      <SelectField label="Urgency" name="urgency" value={formData.urgency} onChange={handleFormChange} options={["Normal", "Urgent", "Critical"]} />
                    </div>
                    <div className="space-y-4">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Reference Material</label>
                      <input type="file" multiple onChange={(e) => setFiles([...files, ...Array.from(e.target.files)])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-xs file:font-black file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-all cursor-pointer" />
                    </div>
                  </motion.div>
                )}

                {step === 7 && (
                  <motion.div key="step7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-xl font-bold text-emerald-900 border-l-4 border-emerald-500 pl-4">7. Advance Payment (30%)</h3>
                    
                    <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[2rem] p-8 text-white shadow-xl">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <p className="text-emerald-100 text-xs font-bold uppercase tracking-[0.2em] mb-1">Total Agreed Price</p>
                          <h4 className="text-4xl font-black">₹{formData.totalAgreedPrice || 0}</h4>
                        </div>
                        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                          <CreditCard size={24} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                        <div>
                          <p className="text-emerald-100 text-[10px] font-bold uppercase tracking-widest mb-1">30% Advance Now</p>
                          <p className="text-2xl font-black">₹{advanceAmount}</p>
                        </div>
                        <div>
                          <p className="text-emerald-100 text-[10px] font-bold uppercase tracking-widest mb-1">70% After Handover</p>
                          <p className="text-2xl font-black opacity-80">₹{remainingAmount}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border-2 border-dashed border-emerald-200 flex flex-col items-center text-center">
                      <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-emerald-600">
                        <Camera size={32} />
                      </div>
                      <h4 className="font-bold text-emerald-900 mb-2">Upload Payment Proof</h4>
                      <p className="text-xs text-gray-500 mb-6 px-4">Take a screenshot of your successful transaction and upload it here.</p>
                      
                      <input 
                        type="file" 
                        onChange={(e) => setAdvanceProofFile(e.target.files[0])} 
                        required 
                        className="block w-full max-w-xs text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 transition-all cursor-pointer"
                      />
                      {advanceProofFile && (
                        <p className="mt-3 text-xs font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle size={12} /> {advanceProofFile.name} uploaded
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {step === 8 && (
                  <motion.div key="step8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-xl font-bold text-emerald-900 border-l-4 border-emerald-500 pl-4">8. Finalize Submission</h3>
                    
                    <TermsAndConditionsDropdown />

                    <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 space-y-4">
                      <label className="flex items-start gap-4 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          required 
                          className="mt-1 w-6 h-6 rounded-lg border-emerald-300 text-emerald-600 focus:ring-emerald-500 transition-all"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                        />
                        <span className="text-sm text-emerald-950 font-medium leading-relaxed">
                          I confirm that all provided details are correct and I have uploaded the valid 30% advance payment proof. I understand the remaining 70% is due upon project completion.
                        </span>
                      </label>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Digital Signature</label>
                      <input 
                        type="file" 
                        onChange={(e) => setESignFile(e.target.files[0])} 
                        required 
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-xs file:font-black file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-all cursor-pointer"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-8 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setStep(s => Math.max(1, s - 1))}
                  disabled={step === 1 || loading}
                  className={`px-8 py-4 rounded-2xl font-bold text-sm transition-all ${step === 1 ? "text-gray-300 cursor-not-allowed" : "text-emerald-700 hover:bg-emerald-50 active:scale-95"}`}
                >
                  Back
                </button>

                {step < 8 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === 1 && !formData.totalAgreedPrice) return alert("Please enter the total agreed price.");
                      if (step === 7 && !advanceProofFile) return alert("Please upload payment proof.");
                      setStep(s => Math.min(8, s + 1));
                    }}
                    className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 active:scale-95"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || !agreed}
                    className={`px-12 py-4 rounded-2xl text-white font-black text-lg transition-all flex items-center justify-center gap-2 shadow-2xl active:scale-95 ${loading || !agreed ? "bg-emerald-300 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"}`}
                  >
                    {loading ? "Submitting Request..." : "Finalize Custom Order"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-12 text-center text-gray-400 text-xs font-medium">
          <p>© {new Date().getFullYear()} NoteSea Documentation Services. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENT UTILS ================= */

function InputField({ label, name, value, onChange, type = "text", placeholder = "", icon, required = false }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
        {icon} {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-emerald-950 font-medium placeholder:text-gray-300"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, required = false }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative group">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-emerald-950 font-medium appearance-none cursor-pointer"
        >
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
          <ChevronDown size={18} />
        </div>
      </div>
    </div>
  );
}

function MultiSelectField({ label, name, value = [], onToggle, options }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-2xl">
        {options.map(opt => {
          const isSelected = value.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                isSelected 
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" 
                  : "bg-white text-gray-400 border-gray-100 hover:border-emerald-200 hover:text-emerald-600"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, rows = 3, placeholder = "", required = false }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-emerald-950 font-medium placeholder:text-gray-300 resize-none"
      />
    </div>
  );
}

function CheckboxField({ label, name, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-100">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
      />
      <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{label}</span>
    </label>
  );
}

function TermsAndConditionsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const tc = [
    { title: "1. 30/70 Payment Model", content: "Clients must pay 30% of the total agreed amount as an advance to initiate the work. The remaining 70% must be paid upon project completion and before the final handover." },
    { title: "2. Payment Verification", content: "The advance payment is verified via the uploaded screenshot/transaction ID. Work starts only after successful verification by the NoteSea team." },
    { title: "3. Non-Refundable Advance", content: "The 30% advance payment is non-refundable once work has been initiated, as it covers resource allocation and initial research." },
    { title: "4. Project Delivery", content: "Final delivery is subject to the 70% balance payment. Partial files or drafts may be shared for review before final payment." },
    { title: "5. Academic Integrity", content: "Delivered materials are for reference and learning purposes only. Submission as original work is at the client's own risk." }
  ];

  return (
    <div className="border border-emerald-100 rounded-3xl overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 bg-emerald-50 text-emerald-900 font-black text-sm uppercase tracking-widest"
      >
        Custom Order Terms & Conditions
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }}><ChevronDown size={20} /></motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white p-6 space-y-4 max-h-60 overflow-y-auto text-xs text-gray-600 leading-relaxed custom-scrollbar"
          >
            {tc.map((item, i) => (
              <div key={i} className="space-y-2">
                <p className="font-black text-emerald-800 uppercase tracking-tighter">{item.title}</p>
                <p>{item.content}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
