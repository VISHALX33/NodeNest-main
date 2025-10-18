import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  // allow PDF and DOCX (you can add .doc)
  const allowed = /pdf|docx|doc/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) return cb(null, true);
  cb(new Error("Only PDF/DOC/DOCX files are allowed"));
};

export const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit
