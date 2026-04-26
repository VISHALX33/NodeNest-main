import mongoose from "mongoose";

const paperSubmissionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subjectName: { type: String, required: true },
    year: { type: String, required: true },
    semester: { type: String, required: true },
    branch: { type: String, required: true },
    paperImages: [{ type: String, required: true }], // Cloudinary URLs
    qrCode: { type: String, required: true }, // Cloudinary URL
    status: {
      type: String,
      enum: ["pending", "verified", "paid", "rejected"],
      default: "pending",
    },
    paymentAmount: { type: Number, default: 20 },
    adminNote: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("PaperSubmission", paperSubmissionSchema);
