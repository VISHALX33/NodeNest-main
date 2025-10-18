import express from "express";
import { createApplication } from "../controllers/applicationController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// POST /api/applications  (form-data: file=resume + other fields)
router.post("/", upload.single("resume"), createApplication);

export default router;
