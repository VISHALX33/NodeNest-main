import React, { useState, useEffect } from "react";
import API from "../utils/axios";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Example API call (you can replace this with your backend route)
        const res = await API.get("/notifications");
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-emerald-700 mb-6 text-center">
        🔔 Notifications & Updates
      </h1>

      {notifications.length === 0 ? (
        <p className="text-center text-gray-500">
          No new notifications right now. Stay tuned!
        </p>
      ) : (
        <div className="space-y-6">
          {notifications.map((note) => (
            <div
              key={note._id}
              className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-emerald-600 mb-2">
                {note.title}
              </h2>
              <p className="text-gray-700 text-sm mb-3">{note.message}</p>
              <p className="text-xs text-gray-400 text-right">
                📅 {new Date(note.createdAt).toLocaleDateString()} | 🕒{" "}
                {new Date(note.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
