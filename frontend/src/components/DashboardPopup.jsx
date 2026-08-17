import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import API from "../utils/axios";

Modal.setAppElement("#root");

const DashboardPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popup, setPopup] = useState({
    enabled: true,
    imageUrl:
      "https://res.cloudinary.com/dwq5qifuk/image/upload/q_auto/f_auto/v1776101963/Gemini_Generated_Image_hn8u5khn8u5khn8u_b4nvqb.png",
    link: "",
  });

  useEffect(() => {
    API.get("/cms/content/dashboard_popup")
      .then((res) => {
        const d = res.data || {};
        setPopup((prev) => ({ ...prev, ...d }));
        if (d.enabled !== false && d.imageUrl) setIsOpen(true);
      })
      .catch(() => setIsOpen(true));
  }, []);

  const handleClose = () => setIsOpen(false);

  if (!popup.imageUrl) return null;

  const img = (
    <img src={popup.imageUrl} alt="Dashboard Popup" className="w-full h-auto rounded-lg" />
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="relative bg-white p-4 rounded-lg max-w-md w-[90%] mx-auto mt-10 shadow-lg overflow-y-auto max-h-[90vh]"
      overlayClassName="fixed inset-0 bg-black/40 flex justify-center items-start z-50"
    >
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-xl font-bold z-10"
      >
        ×
      </button>

      {popup.link ? (
        <a href={popup.link} target="_blank" rel="noopener noreferrer" onClick={handleClose}>
          {img}
        </a>
      ) : (
        img
      )}
    </Modal>
  );
};

export default DashboardPopup;
