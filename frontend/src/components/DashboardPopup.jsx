import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import API from "../utils/axios";

const POPUP_IMAGE =
  "https://res.cloudinary.com/dwq5qifuk/image/upload/f_auto,q_auto,w_900/v1786958161/Untitled_design_a1dweg.png";

/** Prefer a width-capped Cloudinary URL so the popup fits the viewport */
function fitPopupImageUrl(url) {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  if (url.includes("/upload/f_auto") || url.includes("/upload/w_")) return url;
  return url.replace("/upload/", "/upload/f_auto,q_auto,w_900/");
}

const DashboardPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popup, setPopup] = useState({
    enabled: true,
    imageUrl: POPUP_IMAGE,
    link: "",
  });

  useEffect(() => {
    API.get("/cms/content/dashboard_popup")
      .then((res) => {
        const d = res.data || {};
        const imageUrl = fitPopupImageUrl(d.imageUrl || POPUP_IMAGE);
        setPopup({
          enabled: d.enabled !== false,
          imageUrl,
          link: d.link || "",
        });
        if (d.enabled !== false && imageUrl) setIsOpen(true);
      })
      .catch(() => setIsOpen(true));
  }, []);

  const handleClose = () => setIsOpen(false);

  if (!popup.enabled || !popup.imageUrl) return null;

  const imageEl = (
    <motion.img
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      src={popup.imageUrl}
      alt="NoteSea — One Platform for Every Student Need"
      className="max-w-full max-h-[calc(100vh-5rem)] sm:max-h-[calc(100vh-6rem)] w-auto h-auto object-contain rounded-lg mx-auto block"
      draggable={false}
    />
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-5"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex items-center justify-center max-w-[min(900px,96vw)]"
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleClose}
              className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-9 h-9 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-lg z-30 ring-2 ring-white"
              aria-label="Close popup"
            >
              <X size={18} />
            </motion.button>

            <div className="bg-white rounded-2xl p-2 sm:p-3 shadow-2xl max-h-[calc(100vh-2.5rem)] flex items-center justify-center overflow-hidden">
              {popup.link ? (
                <a
                  href={popup.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  className="block leading-none"
                >
                  {imageEl}
                </a>
              ) : (
                imageEl
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DashboardPopup;
