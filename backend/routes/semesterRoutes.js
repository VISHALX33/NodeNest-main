// routes/semesterRoutes.js
import express from 'express';
import Semester from '../models/Semester.js';
import Subject from '../models/Subject.js';
import Note from '../models/Note.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ GET all semesters
router.get('/', async (req, res) => {
  const semesters = await Semester.find();
  res.json(semesters);
});

// ✅ POST new semester (admin only)
router.post('/', protect, isAdmin, async (req, res) => {
  const semester = await Semester.create({ title: req.body.title });
  res.status(201).json(semester);
});

// ✅ GET subjects for a semester
router.get('/:semesterId/subjects', async (req, res) => {
  const subjects = await Subject.find({ semesterId: req.params.semesterId });
  res.json(subjects);
});

// ✅ POST a new subject under a semester (admin only)
router.post('/:semesterId/subjects', protect, isAdmin, async (req, res) => {
  const subject = await Subject.create({
    title: req.body.title,
    semesterId: req.params.semesterId,
  });
  res.status(201).json(subject);
});

// ✅ POST a new note for a subject (admin only)
router.post('/subjects/:subjectId/notes', protect, isAdmin, async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.subjectId).populate('semesterId');

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const note = await Note.create({
      title: req.body.title,
      pdfUrl: req.body.pdfUrl,
      subjectId: req.params.subjectId,
      subjectTitle: subject.title,
      semesterTitle: subject.semesterId?.title || '',
    });

    res.status(201).json(note);
  } catch (error) {
    console.error('Error creating note:', error.message);
    res.status(500).json({ message: 'Failed to create note' });
  }
});

// ✅ GET all notes of a subject with subject & semester info
router.get('/subjects/:subjectId/notes', async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.subjectId).populate('semesterId');

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const notes = await Note.find({ subjectId: req.params.subjectId });

    const notesWithDetails = notes.map(note => ({
      ...note.toObject(),
      subjectName: subject.title,
      semesterName: subject.semesterId?.title || 'Unknown Semester',
    }));

    res.json(notesWithDetails);
  } catch (error) {
    console.error("Error fetching notes with subject & semester:", error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
