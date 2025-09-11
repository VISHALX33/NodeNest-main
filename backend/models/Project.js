// models/Project.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    enum: ['easy', 'medium', 'hard'], 
    required: true 
  },
  icon: { 
    type: String, 
    default: '📁' 
  },
  studentPrice: { 
    type: Number, 
    required: true 
  },
  businessPrice: { 
    type: Number, 
    required: true 
  },
  features: [{ 
    type: String 
  }],
  deliveryTime: { 
    type: Number, // in days
    default: 7 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);