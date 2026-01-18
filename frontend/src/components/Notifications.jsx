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


{/* --- NEW BLOCK: Call for Contributors --- */}
<div className="bg-white shadow-md rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 mb-10">
  
  {/* LEFT SIDE — IMAGE */}
  <div className="flex-1 flex justify-center">
    <img
      src="https://res.cloudinary.com/dwq5qifuk/image/upload/v1768754606/Gemini_Generated_Image_jabgg9jabgg9jabg_itgqof.png"
      alt="Notesea Call for Contributors"
      className="rounded-xl shadow-md w-[280px] md:w-[340px]"
    />
  </div>

  {/* RIGHT SIDE — CONTENT */}
  <div className="flex-1">
    <h2 className="text-2xl font-bold text-emerald-600 mb-3">
      📢 Call for Contributors
    </h2>

    <p className="text-gray-700 leading-relaxed">
      <strong>NoteSea is inviting students</strong> to share their semester notes and help
      thousands of learners prepare better for exams.  
      <br /><br />
      📘 Branches accepted: <strong>Mechanical, Electrical & Civil</strong>  
      <br />
      🌟 Contributors will be <strong>featured with their name & photo</strong> on the
      NoteSea Contributors Page.  
      <br /><br />
      📩 Interested students can connect with us via our social media links
      in the website footer or email us at{" "}
      <strong>notesea.help@gmail.com</strong>.
    </p>
  </div>
</div>


   <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 mb-10">
        

        
         {/* RIGHT SIDE — IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://res.cloudinary.com/dwq5qifuk/image/upload/v1764223632/WhatsApp_Image_2025-11-27_at_11.21.56_377e55e2_sqqh3v.jpg" // Replace with your image
            alt="100 users"
            className="rounded-xl shadow-md w-[280px] md:w-[320px]"
          />
        </div>
        {/* LEFT SIDE — DESCRIPTION */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-emerald-600 mb-2">
            📢Announcement !!!
          </h2>
          <p className="text-gray-700 leading-relaxed">
      📢 <strong>Announcement for all NoteSea students:</strong>  
      You can share your semester notes to help other students in their exams.  
      If anyone contributes notes, we will proudly add their <strong>name and image</strong> in our Contributors section.  
      If you're interested, connect with us through our social media platforms in the website footer,  
      or email us at <strong>notesea.help@gmail.com</strong>.  
      Thank you! 🙌
    </p>
        </div>

       
      </div>


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
