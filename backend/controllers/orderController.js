// controllers/orderController.js
import Order from "../models/Order.js";
import Project from "../models/Project.js";
import crypto from "crypto";
import Razorpay from "razorpay";

// Initialize Razorpay with LIVE keys from .env
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ---------------- Create Order ----------------
// export const createOrder = async (req, res) => {
//   try {
//     const { projectId, planType, userDetails, projectDetails } = req.body;

//     const project = await Project.findById(projectId);
//     if (!project) return res.status(404).json({ message: "Project not found" });

//     const basePrice =
//       planType === "student" ? project.studentPrice : project.businessPrice;
//     const totalAmount = basePrice;

//     const order = new Order({
//       user: req.user._id,
//       project: project._id,
//       planType,
//       basePrice,
//       totalAmount,
//       userDetails,
//       projectDetails: {
//         ...projectDetails,
//         name: project.name,
//         description: project.description,
//       },
//     });

//     await order.save();
//     res.status(201).json({ orderId: order.orderId });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

export const createOrder = async (req, res) => {
  try {
    const { projectId, planType, userDetails, projectDetails, couponCode } = req.body;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const basePrice = planType === "student" ? project.studentPrice : project.businessPrice;

    // ✅ Apply coupon logic
    // let totalAmount = basePrice;
    // let discountAmount = 0;

    // if (couponCode && couponCode.toUpperCase() === "KHUSHI" ) {
    //   discountAmount = basePrice * 0.10; // 10% off
    //   totalAmount = basePrice - discountAmount;
    // }

    // ✅ Apply coupon logic
    let totalAmount = basePrice;
    let discountAmount = 0;

    if (
      couponCode &&
      ["KHUSHI", "MANGALAM", "GUPTA10"].includes(couponCode.toUpperCase())
    ) {
      discountAmount = basePrice * 0.10; // 10% off
      totalAmount = basePrice - discountAmount;
    }


    const order = new Order({
      user: req.user._id,
      project: project._id,
      planType,
      basePrice,
      totalAmount,
      couponCode: couponCode || "",
      discountAmount,
      finalAmount: totalAmount, // store final amount for clarity
      userDetails,
      projectDetails: {
        ...projectDetails,
        name: project.name,
        description: project.description,
      },
    });

    await order.save();
    res.status(201).json({ orderId: order.orderId, totalAmount });
  } catch (err) {
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
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Verify Razorpay Payment ----------------
export const verifyPayment = async (req, res) => {
  try {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Generate signature for verification
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // Update order in DB
    const order = await Order.findOne({ orderId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.paymentStatus = "completed";
    order.paymentId = razorpay_payment_id;
    await order.save();

    res.json({ message: "Payment verified successfully", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Get User Orders ----------------
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
      paymentStatus: "completed", // only show paid
    })
      .populate("project", "name category")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Get Order By ID ----------------
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("project");
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.email !== "vishalprajapati2303@gmail.com"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Update Order Status (Admin) ----------------
export const updateOrderStatus = async (req, res) => {
  try {
    const { paymentStatus, orderStatus, deliveryDate, paymentId } = req.body;
    const updateData = {};
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (deliveryDate) updateData.deliveryDate = deliveryDate;
    if (paymentId) updateData.paymentId = paymentId;

    const order = await Order.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ---------------- Upload Project Files ----------------
import fs from "fs";
import path from "path";
export const uploadProjectFiles = async (req, res) => {
  try {
    const files = req.files.map((file) => `/uploads/projects/${file.filename}`);
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $push: { projectFiles: { $each: files } }, orderStatus: "delivered" },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
