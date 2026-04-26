// routes/serviceOrderRoutes.js
import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createServiceOrder,
  createRazorpayOrder,
  verifyPayment,
  getMyServiceOrders,
  getAllServiceOrders,
  updateServiceOrderStatus,
  uploadDeliveredFiles,
  downloadDeliveredFile,
} from "../controllers/serviceOrderController.js";

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "service-orders",
    allowed_formats: ["jpg", "jpeg", "png", "pdf", "docx", "pptx", "xlsx"],
    resource_type: "auto", // Crucial for non-image files like PDF/DOCX
  },
});

const upload = multer({ storage });

const router = express.Router();

// User routes
router.post("/", protect, upload.array("clientFiles", 5), createServiceOrder);
router.post("/create-razorpay-order", protect, createRazorpayOrder);
router.post("/verify-payment", protect, verifyPayment);
router.get("/mine", protect, getMyServiceOrders);
router.get("/:id/download", protect, downloadDeliveredFile);

// Admin routes
router.put("/:id/status", protect, isAdmin, updateServiceOrderStatus);
router.post(
  "/:id/files",
  protect,
  isAdmin,
  upload.array("files", 5),
  uploadDeliveredFiles
);
router.get("/", protect, isAdmin, getAllServiceOrders);

export default router;
