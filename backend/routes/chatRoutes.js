import express from 'express';
import Message from '../models/Message.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all messages
router.get('/', protect, async (req, res) => {
  const messages = await Message.find().populate('user', 'name').sort({ createdAt: 1 });
  res.json(messages);
});

// Send a message
router.post('/', protect, async (req, res) => {
  const message = await Message.create({
    user: req.user._id,
    text: req.body.text
  });
  const populated = await message.populate('user', 'name');
  res.status(201).json(populated);
});

export default router;
