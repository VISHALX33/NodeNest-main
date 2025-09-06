import express from 'express';
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteAccount,
  verifyEmailOtp,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-otp', verifyEmailOtp);  // ✅ New route
router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);
router.delete('/', protect, deleteAccount);

export default router;
