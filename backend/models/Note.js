import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Unit 1: Introduction"
  pdfUrl: { type: String, required: true }, // PDF URL
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  subjectTitle: { type: String }, // optional
  semesterTitle: { type: String }, // optional
}, { timestamps: true });

export default mongoose.model('Note', noteSchema);
