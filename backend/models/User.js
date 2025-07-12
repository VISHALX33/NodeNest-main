import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w.+\-]+@gmail\.com$/, 'Only Gmail addresses allowed']
  },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  collegeStudent: { type: Boolean, default: false },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  user_uni_id: { type: String, unique: true }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  const User = this.constructor;
  const count = await User.countDocuments();
  const nextId = `USR${(count + 1).toString().padStart(4, '0')}`;
  this.user_uni_id = nextId;

  next();
});

export default mongoose.model('User', userSchema);
