import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {
  submitPaper,
  getMySubmissions,
  getAllSubmissions,
  updateSubmissionStatus,
} from "../controllers/paperSubmissionController.js";

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "paper-submissions",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

// User routes
router.post(
  "/",
  protect,
  upload.fields([
    { name: "paperImages", maxCount: 10 },
    { name: "qrCode", maxCount: 1 },
  ]),
  submitPaper
);
router.get("/mine", protect, getMySubmissions);

// Admin routes
router.get("/", protect, isAdmin, getAllSubmissions);
router.put("/:id", protect, isAdmin, updateSubmissionStatus);

export default router;
