// controllers/serviceOrderController.js
import ServiceOrder from "../models/ServiceOrder.js";
import crypto from "crypto";
import Razorpay from "razorpay";
import fs from "fs";
import path from "path";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ---------------- Create Service Order ----------------
export const createServiceOrder = async (req, res) => {
  try {
    let { serviceName, servicePrice, userDetails, requirements, couponCode, formData } = req.body;

    if (!serviceName || !servicePrice) {
      return res.status(400).json({ message: "serviceName and servicePrice are required" });
    }

    // Parse stringified JSON if needed (for multipart/form-data)
    if (typeof userDetails === "string") userDetails = JSON.parse(userDetails);
    if (typeof formData === "string") formData = JSON.parse(formData);

    const clientFiles = req.files ? req.files.map(file => `/uploads/service-orders/${file.filename}`) : [];

    let totalAmount = Number(servicePrice);
    let discountAmount = 0;

    if (
      couponCode &&
      ["KHUSHI", "MANGALAM", "GUPTASTORE"].includes(couponCode.toUpperCase())
    ) {
      discountAmount = totalAmount * 0.1; // 10% off
      totalAmount = totalAmount - discountAmount;
    }

    const order = new ServiceOrder({
      user: req.user._id,
      serviceName,
      servicePrice: Number(servicePrice),
      couponCode: couponCode || "",
      discountAmount,
      totalAmount,
      userDetails,
      formData: formData || {},
      clientFiles,
      requirements: requirements || "",
    });

    await order.save();
    res.status(201).json({ orderId: order.orderId, totalAmount });
  } catch (err) {
    console.error("❌ createServiceOrder error:", err.message);
    res.status(400).json({ message: err.message });
  }
};

// ---------------- Create Razorpay Order ----------------
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: orderId,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      key: process.env.RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      razorpayOrderId: razorpayOrder.id,
    });
  } catch (err) {
    console.error("❌ createRazorpayOrder error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Verify Payment ----------------
export const verifyPayment = async (req, res) => {
  try {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const order = await ServiceOrder.findOne({ orderId });
    if (!order) return res.status(404).json({ message: "Service order not found" });

    order.paymentStatus = "completed";
    order.paymentId = razorpay_payment_id;
    await order.save();

    res.json({ message: "Payment verified successfully", order });
  } catch (err) {
    console.error("❌ verifyPayment error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Get My Service Orders ----------------
export const getMyServiceOrders = async (req, res) => {
  try {
    const orders = await ServiceOrder.find({
      user: req.user._id,
      paymentStatus: "completed",
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Update Status (Admin) ----------------
export const updateServiceOrderStatus = async (req, res) => {
  try {
    const { orderStatus, deliveryDate, paymentStatus } = req.body;
    const updateData = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (deliveryDate) updateData.deliveryDate = deliveryDate;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const order = await ServiceOrder.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Service order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ---------------- Upload Delivered Files (Admin) ----------------
export const uploadDeliveredFiles = async (req, res) => {
  try {
    const files = req.files.map((file) => `/uploads/service-orders/${file.filename}`);
    const order = await ServiceOrder.findByIdAndUpdate(
      req.params.id,
      {
        $push: { deliveredFiles: { $each: files } },
        orderStatus: "delivered",
      },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Service order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ---------------- Download Delivered File ----------------
export const downloadDeliveredFile = async (req, res) => {
  try {
    const order = await ServiceOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Service order not found" });

    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.email !== "vishalprajapati2303@gmail.com"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!order.deliveredFiles || order.deliveredFiles.length === 0) {
      return res.status(404).json({ message: "No files delivered yet" });
    }

    const filePath = path.join(process.cwd(), order.deliveredFiles[0]);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found on server" });
    }

    res.download(filePath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
