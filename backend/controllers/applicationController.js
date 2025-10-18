import fs from "fs";
import Application from "../models/Application.js";
import cloudinary from "../utils/cloudinaryConfig.js";

export const createApplication = async (req, res) => {
  try {
    // Multer attaches file to req.file
    if (!req.file) return res.status(400).json({ message: "Resume file is required." });

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "notesea/resumes",
      resource_type: "auto",
      use_filename: true,
      unique_filename: false
    });

    // Build application doc
    const { name, email, phone, position, linkedin, portfolio, skills, experience, about } = req.body;

    const skillsArray = skills
      ? (typeof skills === "string" ? skills.split(",").map(s => s.trim()).filter(Boolean) : skills)
      : [];

    const application = new Application({
      name,
      email,
      phone,
      position,
      linkedin,
      portfolio,
      skills: skillsArray,
      experience,
      about,
      resumeUrl: result.secure_url,
      resumePublicId: result.public_id
    });

    await application.save();

    // delete temp file
    fs.unlink(req.file.path, (err) => { if (err) console.error("Failed to delete temp file:", err); });

    return res.status(201).json({ message: "Application submitted", application });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
