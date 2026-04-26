import PaperSubmission from "../models/PaperSubmission.js";

// ---------------- Submit Paper ----------------
export const submitPaper = async (req, res) => {
  try {
    const { subjectName, year, semester, branch } = req.body;
    
    if (!subjectName || !year || !semester || !branch) {
      return res.status(400).json({ message: "All fields (Subject, Year, Semester, Branch) are required" });
    }

    if (!req.files || !req.files['paperImages'] || !req.files['qrCode']) {
      return res.status(400).json({ message: "Paper images and QR code are required" });
    }

    const paperImages = req.files['paperImages'].map(file => file.path);
    const qrCode = req.files['qrCode'][0].path;

    const submission = new PaperSubmission({
      user: req.user._id,
      subjectName,
      year,
      semester,
      branch,
      paperImages,
      qrCode,
    });

    await submission.save();
    res.status(201).json({ message: "Paper submitted successfully!", submission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Get My Submissions ----------------
export const getMySubmissions = async (req, res) => {
  try {
    const submissions = await PaperSubmission.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Get All Submissions (Admin) ----------------
export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await PaperSubmission.find({})
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Update Submission Status (Admin) ----------------
export const updateSubmissionStatus = async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const submission = await PaperSubmission.findByIdAndUpdate(
      req.params.id,
      { status, adminNote },
      { new: true }
    );
    if (!submission) return res.status(404).json({ message: "Submission not found" });
    res.json(submission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
