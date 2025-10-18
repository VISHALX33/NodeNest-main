import React, { useState } from "react";
import { FiMail, FiMessageCircle } from "react-icons/fi";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 flex items-center justify-center px-6 py-16">
      {/* Waves background */}
      <div className="absolute inset-0">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none">
          <path
            d="M0,300 C360,100 1080,500 1440,300 L1440,600 L0,600 Z"
            fill="url(#grad1)"
            className="animate-wave"
          />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#10B981", stopOpacity: 0.5 }} />
              <stop offset="100%" style={{ stopColor: "#34D399", stopOpacity: 0.5 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left illustration */}
        <div className="flex flex-col justify-center items-center space-y-6 animate-slideInLeft">
          
          <h2 className="text-4xl font-extrabold text-gray-900 text-center">
            📩 Contact Us
          </h2>
          <p className="text-gray-700 text-center">
            Have questions, feedback, or suggestions?  
            We’d love to hear from you! Or reach us at{" "}
            <span className="text-emerald-600 font-semibold">notesea.help@gmail.com</span>
          </p>
        </div>

        {/* Right form */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10 space-y-6 animate-slideInRight">
          {submitted && (
            <div className="p-4 rounded text-center bg-emerald-100 text-emerald-800 font-semibold">
              Thank you! We will get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition shadow-sm hover:shadow-md"
              />
            </div>

            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition shadow-sm hover:shadow-md"
              />
            </div>

            <div className="relative">
              <FiMessageCircle className="absolute left-3 top-3 text-gray-400" />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full pl-10 p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition shadow-sm hover:shadow-md"
                rows="5"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white rounded-2xl hover:from-emerald-600 hover:to-emerald-800 transition font-bold shadow-lg hover:shadow-2xl"
            >
              Send Message
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500 text-center">
            🔒 <span className="font-semibold">Support:</span> For any queries or refund requests, write to us at <span className="text-emerald-600">notesea.help@gmail.com</span>. We aim to respond within 5–7 working days.
          </p>
        </div>
      </div>

      {/* Tailwind animations */}
      <style>{`
        @keyframes slideInLeft { from {opacity:0; transform:translateX(-50px);} to{opacity:1; transform:translateX(0);} }
        .animate-slideInLeft { animation: slideInLeft 1s ease forwards; }
        @keyframes slideInRight { from {opacity:0; transform:translateX(50px);} to{opacity:1; transform:translateX(0);} }
        .animate-slideInRight { animation: slideInRight 1s ease forwards; }

        @keyframes wave { 0% { transform: translateX(0); } 50% { transform: translateX(-20px); } 100% { transform: translateX(0); } }
        .animate-wave { animation: wave 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default ContactUs;
