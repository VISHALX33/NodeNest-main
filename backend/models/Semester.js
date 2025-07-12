import mongoose from 'mongoose';

const semesterSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Semester 1"
}, { timestamps: true });

export default mongoose.model('Semester', semesterSchema);
