import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w.+\-]+@gmail\.com$/, 'Only Gmail addresses allowed'],
  },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  collegeStudent: { type: Boolean, default: false },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },

  // 🆕 Verification fields
  isVerified: { type: Boolean, default: false },
  emailOtp: { type: String },
  emailOtpExpires: { type: Date },

  // 🆕 Unique user ID
  user_uni_id: { type: String, unique: true },

  // 🆕 Password reset fields
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
}, { timestamps: true });

// Pre-save hook to auto-generate unique user ID
userSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  const User = this.constructor;
  const lastUser = await User.findOne({}).sort({ createdAt: -1 }).lean();

  let lastId = 0;
  if (lastUser && lastUser.user_uni_id) {
    const match = lastUser.user_uni_id.match(/USR(\d+)/);
    if (match) {
      lastId = parseInt(match[1], 10);
    }
  }

  const nextId = `USR${(lastId + 1).toString().padStart(4, '0')}`;
  this.user_uni_id = nextId;

  next();
});

export default mongoose.model('User', userSchema);
