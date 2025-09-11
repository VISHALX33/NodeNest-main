// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    planType: {
      type: String,
      enum: ["student", "business"],
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    projectDetails: {
      name: String,
      description: String,
      requirements: String,
      deadline: Date,
    },
    userDetails: {
      name: String,
      email: String,
      phone: String,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentId: {
      type: String, // Razorpay Payment ID
    },
    orderStatus: {
      type: String,
      enum: ["pending", "in_progress", "completed", "delivered"],
      default: "pending",
    },
    deliveryDate: {
      type: Date,
    },
    projectFiles: [
      {
        type: String, // file URLs
      },
    ],
  },
  { timestamps: true }
);

// 🔥 Auto-generate sequential orderId like ORD0001
orderSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  try {
    const Order = this.constructor;
    const lastOrder = await Order.findOne({}).sort({ createdAt: -1 }).lean();

    let lastId = 0;
    if (lastOrder && lastOrder.orderId) {
      const match = lastOrder.orderId.match(/ORD(\d+)/);
      if (match) lastId = parseInt(match[1], 10);
    }

    this.orderId = `ORD${(lastId + 1).toString().padStart(4, "0")}`;
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("Order", orderSchema);
