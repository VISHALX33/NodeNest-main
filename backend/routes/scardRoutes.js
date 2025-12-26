import express from "express";
import { getTodayScard, scratchCard, leaderboard, userProfile } from "../controllers/scardController.js";
import { protect } from "../middleware/authMiddleware.js"; // renamed from authMiddleware to protect

const router = express.Router();

// Get today's scard or create if not exists
router.get("/today", protect, getTodayScard);

// Scratch a card
router.post("/scratch", protect, scratchCard);

// Leaderboard
router.get("/leaderboard", protect, leaderboard);

// User profile
router.get("/profile", protect, userProfile);

export default router;
