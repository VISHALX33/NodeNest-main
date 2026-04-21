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
  updateServiceOrderStatus,
  uploadDeliveredFiles,
  downloadDeliveredFile,
} from "../controllers/serviceOrderController.js";

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "uploads/service-orders");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/service-orders/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

const router = express.Router();

// User routes
router.post("/", protect, createServiceOrder);
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

export default router;
