// frontend/src/components/DashboardPopup.jsx
import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const DashboardPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup when dashboard loads
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal
  isOpen={isOpen}
  onRequestClose={handleClose}
  className="relative bg-white p-4 rounded-lg max-w-md w-[90%] mx-auto mt-10 shadow-lg overflow-y-auto max-h-[90vh]"
  overlayClassName="fixed inset-0 bg-black/40 flex justify-center items-start z-50"
>
  {/* Close Button */}
  <button
    onClick={handleClose}
    className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-xl font-bold"
  >
    ×
  </button>

  {/* Image */}
  <img
    src="https://res.cloudinary.com/dwq5qifuk/image/upload/v1764833310/WhatsApp_Image_2025-12-03_at_18.38.20_8f6941b1_kcw04v.jpg"
    alt="Dashboard Popup"
    className="w-full h-auto rounded-lg"
  />
</Modal>

  );
};

export default DashboardPopup;
