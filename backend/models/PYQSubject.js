// models/PYQSubject.js
import mongoose from "mongoose";

const pyqSubjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    semesterNumber: { type: Number, required: true, min: 1, max: 8 },
    branch: {
      type: String,
      required: true,
      enum: ["CSE", "AI & DS", "IT", "ECE", "ME", "Other"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("PYQSubject", pyqSubjectSchema);
