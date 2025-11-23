import React, { useState, useEffect } from "react";
import API from "../utils/axios";

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

      {/* --- NEW BLOCK: 100 Users Section --- */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 mb-10">
        
        {/* LEFT SIDE — DESCRIPTION */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-emerald-600 mb-2">
            🎉 We Reached 100 Users!
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our platform has officially crossed <strong>100 active users</strong>!  
            Thank you for your continuous support and trust.  
            We promise to bring more RTU notes, projects, and updates regularly.
          </p>
        </div>

        {/* RIGHT SIDE — IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://res.cloudinary.com/dwq5qifuk/image/upload/v1763888809/Gemini_Generated_Image_s9y1jas9y1jas9y1_1_x000iz.jpg" // Replace with your image
            alt="100 users"
            className="rounded-xl shadow-md w-[280px] md:w-[320px]"
          />
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
