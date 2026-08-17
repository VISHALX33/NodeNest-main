import React, { useState, useEffect } from "react";
import API from "../utils/axios";
import { Coins, CheckCircle, ArrowRight } from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/notifications")
      .then((res) => setNotifications(Array.isArray(res.data) ? res.data : []))
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-emerald-700 mb-8 text-center">
        🔔 Notifications & Updates
      </h1>

      {loading && <p className="text-center text-slate-400 font-medium py-10">Loading...</p>}

      {!loading && notifications.length === 0 && (
        <div className="bg-white shadow-md rounded-[2rem] p-10 text-center border border-slate-100">
          <p className="text-slate-500 font-medium">No announcements yet. Check back soon!</p>
        </div>
      )}

      <div className="space-y-10">
        {notifications.map((n) => {
          const imageLeft = n.layout === "image-left";
          return (
            <div
              key={n._id}
              className={`bg-white shadow-md rounded-[2rem] p-6 md:p-10 flex flex-col items-center gap-10 border border-slate-100 ${
                imageLeft ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div className="flex-1 space-y-4">
                {n.badge && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <Coins size={12} /> {n.badge}
                  </div>
                )}
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">{n.title}</h2>
                <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">{n.body || n.message}</p>
                {n.bullets?.length > 0 && (
                  <ul className="space-y-2">
                    {n.bullets.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-500 font-bold">
                        <CheckCircle size={16} className="text-emerald-500 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                )}
                {n.ctaText && n.ctaLink && (
                  <button
                    type="button"
                    onClick={() => { window.location.href = n.ctaLink; }}
                    className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95 mt-4"
                  >
                    {n.ctaText} <ArrowRight size={18} />
                  </button>
                )}
              </div>
              {n.image && (
                <div className="flex-1 flex justify-center">
                  <img src={n.image} alt={n.title} className="rounded-3xl shadow-2xl w-full max-w-sm" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
