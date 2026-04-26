import React, { useState, useEffect } from "react";
import API from "../utils/axios";
import { Coins, CheckCircle, ArrowRight } from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await API.get("/notifications");
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-emerald-700 mb-8 text-center">
        🔔 Notifications & Updates
      </h1>


      {/* 1. SELL PAPER (Image Right) */}
      <div className="bg-white shadow-md rounded-[2rem] p-6 md:p-10 flex flex-col md:flex-row items-center gap-10 mb-10 border border-slate-100">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">
            <Coins size={12} /> Earning Opportunity
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Sell Your PYQs & Earn ₹20!</h2>
          <p className="text-slate-600 font-medium leading-relaxed">
            NoteSea is now paying students for their previous year exam papers! Upload clear, clean images of papers from <strong>2026 onwards</strong> and get paid directly via UPI.
          </p>
          <ul className="space-y-2">
            {["2026+ Year Papers", "Clear & Clean Images", "No Watermarks", "Instant Payment"].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-slate-500 font-bold">
                <CheckCircle size={16} className="text-emerald-500" /> {item}
              </li>
            ))}
          </ul>
          <button 
            onClick={() => window.location.href = "/pyq"}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95 mt-4"
          >
            Sell Now & Earn <ArrowRight size={18} />
          </button>
        </div>
        <div className="flex-1 flex justify-center">
          <img src="/sellpaper.png" alt="Earn Guide" className="rounded-3xl shadow-2xl w-full max-w-sm" />
        </div>
      </div>

      {/* 2. CALL FOR CONTRIBUTORS (Image Left) */}
      <div className="bg-white shadow-md rounded-[2rem] p-6 md:p-10 flex flex-col md:flex-row-reverse items-center gap-10 mb-10 border border-slate-100">
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Call for Contributors</h2>
          <p className="text-slate-600 font-medium leading-relaxed">
            Join the NoteSea community as a contributor! We are looking for students from <strong>Mechanical, Electrical, and Civil</strong> branches to share their high-quality notes.
          </p>
          <p className="text-sm text-slate-500 font-bold bg-slate-50 p-4 rounded-xl border border-slate-100">
            ✅ Contributors get featured with their name and photo in our elite contributors section!
          </p>
          <p className="text-xs text-slate-400 font-bold">Connect with us via Instagram or Email: notesea.help@gmail.com</p>
        </div>
        <div className="flex-1 flex justify-center">
          <img src="https://res.cloudinary.com/dwq5qifuk/image/upload/v1768754606/Gemini_Generated_Image_jabgg9jabgg9jabg_itgqof.png" alt="Contributors" className="rounded-3xl shadow-xl w-full max-w-sm" />
        </div>
      </div>

      {/* 3. MILESTONE: 100 USERS (Image Right) */}
      <div className="bg-white shadow-md rounded-[2rem] p-6 md:p-10 flex flex-col md:flex-row items-center gap-10 mb-10 border border-slate-100">
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">🎉 100+ Active Users!</h2>
          <p className="text-slate-600 font-medium leading-relaxed">
            We are thrilled to announce that NoteSea has officially crossed the 100-user milestone. Thank you for your incredible support and trust in our platform.
          </p>
          <div className="w-20 h-1 bg-emerald-500 rounded-full" />
          <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest">More updates coming soon!</p>
        </div>
        <div className="flex-1 flex justify-center">
          <img src="https://res.cloudinary.com/dwq5qifuk/image/upload/v1763888809/Gemini_Generated_Image_s9y1jas9y1jas9y1_1_x000iz.jpg" alt="100 users" className="rounded-3xl shadow-xl w-full max-w-sm" />
        </div>
      </div>

   

      {/* --- Example Notifications List --- */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center">No notifications yet.</p>
        ) : (
          notifications.map((n, i) => (
            <div
              key={i}
              className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl shadow"
            >
              <h3 className="font-semibold text-emerald-700">{n.title}</h3>
              <p className="text-gray-700">{n.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
