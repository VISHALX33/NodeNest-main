// routes/orderRoutes.js
import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import {
  createOrder,
  createRazorpayOrder,
  verifyPayment,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  uploadProjectFiles,
} from "../controllers/orderController.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/projects/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

const router = express.Router();

router.post("/", protect, createOrder);
router.post("/create-razorpay-order", protect, createRazorpayOrder);
router.post("/verify-payment", protect, verifyPayment);

router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

router.put("/:id/status", protect, isAdmin, updateOrderStatus);
router.post(
  "/:id/files",
  protect,
  isAdmin,
  upload.array("files", 5),
  uploadProjectFiles
);

export default router;
