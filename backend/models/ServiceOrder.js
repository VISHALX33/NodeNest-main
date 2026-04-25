// models/ServiceOrder.js
import mongoose from "mongoose";

const serviceOrderSchema = new mongoose.Schema(
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

    // Service details (e.g. "Report / Research Paper", "Presentation")
    serviceName: {
      type: String,
      required: true,
    },

    servicePrice: {
      type: Number,
      required: true,
    },

    // Coupon
    couponCode: {
      type: String,
      default: "",
    },

    discountAmount: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    // Customer info filled in the booking form
    userDetails: {
      name: String,
      email: String,
      phone: String,
    },

    // Extended form data from the new multi-step form
    formData: {
      type: Object,
      default: {},
    },

    // Files uploaded by client (e-sign, reference material)
    clientFiles: [
      {
        type: String,
      },
    ],

    // Requirements entered by user (legacy/summary)
    requirements: {
      type: String,
      default: "",
    },

    // Payment
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },

    paymentId: {
      type: String,
    },

    // Work progress managed by Admin
    orderStatus: {
      type: String,
      enum: ["pending", "in_progress", "delivered"],
      default: "pending",
    },

    deliveryDate: {
      type: Date,
    },

    // Delivered files (uploaded by admin)
    deliveredFiles: [
      {
        type: String, // file paths
      },
    ],
  },
  { timestamps: true }
);

// Auto-generate sequential orderId like SVC0001
serviceOrderSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  try {
    const ServiceOrder = this.constructor;
    const lastOrder = await ServiceOrder.findOne({})
      .sort({ createdAt: -1 })
      .lean();

    let lastId = 0;
    if (lastOrder && lastOrder.orderId) {
      const match = lastOrder.orderId.match(/SVC(\d+)/);
      if (match) lastId = parseInt(match[1], 10);
    }

    this.orderId = `SVC${(lastId + 1).toString().padStart(4, "0")}`;
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("ServiceOrder", serviceOrderSchema);
