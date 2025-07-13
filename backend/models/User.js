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

  // 🆕 New Fields
  image: { type: String, default: '' },
  location: { type: String, default: '' },
  bio: { type: String, default: '' },

  user_uni_id: { type: String, unique: true },
}, { timestamps: true });

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
