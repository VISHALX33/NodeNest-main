import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import {
  getPublicTeam,
  getAllTeam,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  reorderTeamMembers,
} from "../controllers/teamController.js";

const router = express.Router();

router.get("/public", getPublicTeam);
router.get("/", protect, isAdmin, getAllTeam);
router.post("/", protect, isAdmin, createTeamMember);
router.put("/reorder", protect, isAdmin, reorderTeamMembers);
router.put("/:id", protect, isAdmin, updateTeamMember);
router.delete("/:id", protect, isAdmin, deleteTeamMember);

export default router;
