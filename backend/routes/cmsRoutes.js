import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import {
  getPublicGallery,
  getAllGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  createContactMessage,
  getContactMessages,
  updateContactMessage,
  deleteContactMessage,
  getPublicAnnouncements,
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getPublicContent,
  upsertContent,
  getApplications,
  updateApplication,
  deleteApplication,
  getAllProjectsAdmin,
} from "../controllers/cmsController.js";

const router = express.Router();

/* Gallery */
router.get("/gallery/public", getPublicGallery);
router.get("/gallery", protect, isAdmin, getAllGallery);
router.post("/gallery", protect, isAdmin, createGalleryItem);
router.put("/gallery/:id", protect, isAdmin, updateGalleryItem);
router.delete("/gallery/:id", protect, isAdmin, deleteGalleryItem);

/* Contact */
router.post("/contact", createContactMessage);
router.get("/contact", protect, isAdmin, getContactMessages);
router.put("/contact/:id", protect, isAdmin, updateContactMessage);
router.delete("/contact/:id", protect, isAdmin, deleteContactMessage);

/* Announcements (also expose as /notifications for existing frontend) */
router.get("/announcements/public", getPublicAnnouncements);
router.get("/announcements", protect, isAdmin, getAllAnnouncements);
router.post("/announcements", protect, isAdmin, createAnnouncement);
router.put("/announcements/:id", protect, isAdmin, updateAnnouncement);
router.delete("/announcements/:id", protect, isAdmin, deleteAnnouncement);

/* Site content */
router.get("/content/:key", getPublicContent);
router.put("/content/:key", protect, isAdmin, upsertContent);

/* Careers applications */
router.get("/applications", protect, isAdmin, getApplications);
router.put("/applications/:id", protect, isAdmin, updateApplication);
router.delete("/applications/:id", protect, isAdmin, deleteApplication);

/* Projects admin */
router.get("/projects", protect, isAdmin, getAllProjectsAdmin);

export default router;
