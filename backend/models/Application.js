import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  position: { type: String, required: true },
  linkedin: { type: String },
  portfolio: { type: String },
  skills: [{ type: String }],
  experience: { type: String },
  about: { type: String },
  resumeUrl: { type: String, required: true },
  resumePublicId: { type: String }, // optional: Cloudinary public_id for delete
  status: { type: String, enum: ["Pending","Reviewed","Shortlisted","Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Application", applicationSchema);
