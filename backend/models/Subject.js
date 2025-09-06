import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  semesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester', required: true },
}, { timestamps: true });

export default mongoose.model('Subject', subjectSchema);