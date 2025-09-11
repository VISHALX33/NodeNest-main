// routes/projectRoutes.js
import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { createProject, getProjects, getProjectById, updateProject, deleteProject } from '../controllers/projectController.js';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, isAdmin, createProject);

router.route('/:id')
  .get(getProjectById)
  .put(protect, isAdmin, updateProject)
  .delete(protect, isAdmin, deleteProject);

export default router;