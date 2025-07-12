import express from 'express';
import Semester from '../models/Semester.js';
import Subject from '../models/Subject.js';
import Note from '../models/Note.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all semesters
router.get('/', async (req, res) => {
  const semesters = await Semester.find();
  res.json(semesters);
});

// POST semester (admin only)
router.post('/', protect, isAdmin, async (req, res) => {
  const semester = await Semester.create({ title: req.body.title });
  res.status(201).json(semester);
});

// GET subjects of semester
router.get('/:semesterId/subjects', async (req, res) => {
  const subjects = await Subject.find({ semesterId: req.params.semesterId });
  res.json(subjects);
});

// POST subject (admin only)
router.post('/:semesterId/subjects', protect, isAdmin, async (req, res) => {
  const subject = await Subject.create({
    title: req.body.title,
    semesterId: req.params.semesterId
  });
  res.status(201).json(subject);
});

// GET notes of subject
router.get('/subjects/:subjectId/notes', async (req, res) => {
  const notes = await Note.find({ subjectId: req.params.subjectId });
  res.json(notes);
});

// POST note (admin only)
router.post('/subjects/:subjectId/notes', protect, isAdmin, async (req, res) => {
  const note = await Note.create({
    title: req.body.title,
    pdfUrl: req.body.pdfUrl,
    subjectId: req.params.subjectId
  });
  res.status(201).json(note);
});

export default router;
