import express from 'express';
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteAccount,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);
router.delete('/', protect, deleteAccount);

export default router;
