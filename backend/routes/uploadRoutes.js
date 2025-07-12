import express from 'express';
import upload from '../middleware/upload.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/upload (admin only)
router.post('/', protect, isAdmin, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.status(200).json({ pdfUrl: fileUrl });
});

export default router;
