// routes/pyqRoutes.js
import express from "express";
import PYQSubject from "../models/PYQSubject.js";
import PYQ from "../models/PYQ.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ── User: get subjects filtered by semester + branch ──────────────────────────
router.get("/subjects", protect, async (req, res) => {
  try {
    const { semester, branch } = req.query;
    const filter = {};
    if (semester) filter.semesterNumber = Number(semester);
    if (branch) filter.branch = branch;
    const subjects = await PYQSubject.find(filter).sort({ title: 1 });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── User: get PYQ papers for a subject ───────────────────────────────────────
router.get("/:subjectId/papers", protect, async (req, res) => {
  try {
    const papers = await PYQ.find({ subjectId: req.params.subjectId }).sort({
      year: -1,
    });
    res.json(papers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── Admin: create a PYQ subject ───────────────────────────────────────────────
router.post("/subjects", protect, isAdmin, async (req, res) => {
  try {
    const { title, semesterNumber, branch } = req.body;
    const subject = new PYQSubject({ title, semesterNumber, branch });
    await subject.save();
    res.status(201).json(subject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ── Admin: add a PYQ paper to a subject ──────────────────────────────────────
router.post("/:subjectId/papers", protect, isAdmin, async (req, res) => {
  try {
    const { title, pdfUrl, year } = req.body;
    const subject = await PYQSubject.findById(req.params.subjectId);
    if (!subject) return res.status(404).json({ message: "Subject not found" });

    const paper = new PYQ({
      title,
      pdfUrl,
      year: year || "",
      subjectId: subject._id,
      subjectTitle: subject.title,
      semesterNumber: subject.semesterNumber,
      branch: subject.branch,
    });
    await paper.save();
    res.status(201).json(paper);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ── Admin: delete a PYQ paper ─────────────────────────────────────────────────
router.delete("/papers/:paperId", protect, isAdmin, async (req, res) => {
  try {
    await PYQ.findByIdAndDelete(req.params.paperId);
    res.json({ message: "Paper deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── Admin: delete a PYQ subject ───────────────────────────────────────────────
router.delete("/subjects/:subjectId", protect, isAdmin, async (req, res) => {
  try {
    await PYQ.deleteMany({ subjectId: req.params.subjectId });
    await PYQSubject.findByIdAndDelete(req.params.subjectId);
    res.json({ message: "Subject and its papers deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
