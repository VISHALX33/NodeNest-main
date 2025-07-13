import express from 'express';
import { saveUserPDF, getUserPDFs } from '../controllers/userPdfController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, saveUserPDF);
router.get('/', protect, getUserPDFs);

export default router;
