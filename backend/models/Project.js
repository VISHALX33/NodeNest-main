import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  icon: { type: String, default: '📁' },

  images: {        // <-- Updated to support multiple images
    type: [String],
    default: []
  },

  videoLink: { type: String, default: '' },

  studentPrice: { type: Number, required: true },
  businessPrice: { type: Number, required: true },
  features: [{ type: String }],
  deliveryTime: { type: Number, default: 7 },
  isActive: { type: Boolean, default: true }

}, { timestamps: true });


export default mongoose.model('Project', projectSchema);