import React, { useState } from "react";
import axios from "axios";
import getBaseUrl from "../utils/getBaseUrl";
import { FiUpload } from "react-icons/fi";
import career from "/careers.png";

export default function CareerForm() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", position: "", linkedin: "", portfolio: "", skills: "", experience: "", about: ""
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(null);

  const backendUrl = getBaseUrl();

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(f.type)) {
      setMessage("Only PDF/DOC/DOCX allowed.");
      return;
    }
    setResumeFile(f);
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) { setMessage("Please attach your resume."); return; }
    if (!form.name || !form.email || !form.phone || !form.position) { setMessage("Please fill required fields."); return; }

    setLoading(true);
    setMessage(null);
    setProgress(0);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
      fd.append("skills", form.skills);
      fd.append("resume", resumeFile);

      await axios.post(`${backendUrl}/api/applications`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (ev) => {
          setProgress(Math.round((ev.loaded * 100) / ev.total));
        }
      });

      setMessage("Application submitted successfully!");
      setForm({ name: "", email: "", phone: "", position: "", linkedin: "", portfolio: "", skills: "", experience: "", about: "" });
      setResumeFile(null);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Waves background */}
      <div className="absolute inset-0">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none">
          <path
            d="M0,200 C360,400 1080,0 1440,200 L1440,600 L0,600 Z"
            fill="url(#grad1)"
            className="animate-wave"
          />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#10B981", stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: "#34D399", stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
        </svg>

        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none">
          <path
            d="M0,300 C360,100 1080,500 1440,300 L1440,600 L0,600 Z"
            fill="url(#grad2)"
            className="animate-wave animation-delay-2000"
          />
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#6EE7B7", stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: "#34D399", stopOpacity: 0.6 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main content */}
      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6 py-16">
        {/* Left side - hero / illustration */}
        <div className="flex flex-col justify-center items-start space-y-6 animate-slideInLeft">
          <h1 className="text-5xl font-extrabold text-gray-900">Join Our Team</h1>
          <p className="text-gray-700 text-lg">Build amazing products with NoteSea and take your career to the next level. We’re looking for passionate developers, designers, and innovators.</p>
          <div className="w-full h-[400px] rounded-2xl shadow-lg overflow-hidden animate-pulse">
  <img
    src={career}
    alt="Hero Illustration"
    className="w-full  object-cover"
  />
</div>
          
        </div>

        {/* Right side - form */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-10 space-y-6 animate-slideInRight">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center">Apply Now</h2>

          {message && (
            <div className={`p-3 rounded text-sm text-center ${
              message.includes("successfully") ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["name", "email", "phone", "position"].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  required
                  className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition shadow-sm hover:shadow-md"
                />
              ))}
            </div>

            <input
              name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn URL (optional)"
              className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition shadow-sm hover:shadow-md"
            />
            <input
              name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="Portfolio / Website (optional)"
              className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition shadow-sm hover:shadow-md"
            />
            <input
              name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma separated)"
              className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition shadow-sm hover:shadow-md"
            />
            <input
              name="experience" value={form.experience} onChange={handleChange} placeholder="Experience"
              className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition shadow-sm hover:shadow-md"
            />
            <textarea
              name="about" value={form.about} onChange={handleChange} placeholder="Short bio / cover letter"
              className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition shadow-sm hover:shadow-md" rows="4"
            />

            <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition">
              <FiUpload className="text-gray-500" size={22} />
              {resumeFile ? resumeFile.name : "Attach Resume (PDF/DOCX)"}
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" />
            </label>

            {loading && (
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all animate-pulse" style={{ width: `${progress}%` }} />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white rounded-2xl hover:from-emerald-600 hover:to-emerald-800 transition font-bold shadow-lg hover:shadow-2xl flex justify-center items-center gap-2"
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
              ) : null}
              {loading ? `Uploading ${progress}%` : "Submit Application"}
            </button>
          </form>
        </div>
      </div>

      {/* Tailwind animations */}
      <style>{`
        @keyframes slideInLeft { from {opacity:0; transform:translateX(-50px);} to{opacity:1; transform:translateX(0);} }
        .animate-slideInLeft { animation: slideInLeft 1s ease forwards; }
        @keyframes slideInRight { from {opacity:0; transform:translateX(50px);} to{opacity:1; transform:translateX(0);} }
        .animate-slideInRight { animation: slideInRight 1s ease forwards; }

        @keyframes wave { 0% { transform: translateX(0); } 50% { transform: translateX(-20px); } 100% { transform: translateX(0); } }
        .animate-wave { animation: wave 6s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 9s; }
      `}</style>
    </div>
  );
}
