// models/PYQ.js
import mongoose from "mongoose";

const pyqSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // e.g. "2023 End Sem Paper"
    pdfUrl: { type: String, required: true },
    year: { type: String, default: "" },     // e.g. "2023"
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PYQSubject",
      required: true,
    },
    subjectTitle: { type: String },
    semesterNumber: { type: Number },
    branch: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("PYQ", pyqSchema);
