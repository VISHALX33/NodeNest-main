import GalleryItem from "../models/GalleryItem.js";
import ContactMessage from "../models/ContactMessage.js";
import Announcement from "../models/Announcement.js";
import SiteContent from "../models/SiteContent.js";
import Application from "../models/Application.js";
import Project from "../models/Project.js";

/* ---------- Gallery ---------- */
export const getPublicGallery = async (req, res) => {
  try {
    const items = await GalleryItem.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllGallery = async (req, res) => {
  try {
    const items = await GalleryItem.find().sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createGalleryItem = async (req, res) => {
  try {
    const item = await GalleryItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateGalleryItem = async (req, res) => {
  try {
    const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await GalleryItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------- Contact ---------- */
export const createContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ message: "Name, email and message are required." });
    }
    const doc = await ContactMessage.create({ name: name.trim(), email: email.trim(), message: message.trim() });
    res.status(201).json({ message: "Message sent", id: doc._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getContactMessages = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search?.trim()) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }
    const list = await ContactMessage.find(filter).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateContactMessage = async (req, res) => {
  try {
    const doc = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteContactMessage = async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------- Announcements / Notifications ---------- */
export const getPublicAnnouncements = async (req, res) => {
  try {
    const list = await Announcement.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllAnnouncements = async (req, res) => {
  try {
    const list = await Announcement.find().sort({ order: 1, createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const doc = await Announcement.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const doc = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------- Site content (channel, about, how_it_works, popup, careers) ---------- */
const DEFAULTS = {
  channel: {
    name: "Vishal Prajapati",
    handle: "@Vishalprajapati-q7l",
    description: "Full-stack development tutorials, real projects, and coding tips. Learn by building and grow as a developer.",
    profileImage: "",
    bannerImage: "",
    youtubeChannelUrl: "https://www.youtube.com/@Vishalprajapati-q7l",
  },
  about: {
    eyebrow: "Our Story",
    title: "About NoteSea",
    summary: "NoteSea was built with a simple goal — to make quality education and resources accessible to every student. What started as a small idea to share notes has now grown into a student-powered platform helping thousands across RTU and beyond.",
    heroImage: "/login1.png",
  },
  how_it_works: {
    intro: "NoteSea helps students access notes, projects, and tools in three simple steps.",
    steps: [
      { title: "Create Account", description: "Sign up or log in to access notes, tools, and project services." },
      { title: "Choose What You Need", description: "Select semester notes, explore ready-made projects, or request custom MERN development." },
      { title: "Access & Use", description: "Download notes, buy projects, or get your custom project built by NoteSea." },
    ],
  },
  dashboard_popup: {
    enabled: true,
    imageUrl: "https://res.cloudinary.com/dwq5qifuk/image/upload/q_auto/f_auto/v1776101963/Gemini_Generated_Image_hn8u5khn8u5khn8u_b4nvqb.png",
    link: "",
  },
  career_positions: {
    positions: [
      { title: "UI/UX Designer", desc: "Design intuitive user experiences and beautiful interfaces." },
      { title: "Frontend Developer", desc: "Build modern, fast, and responsive user interfaces." },
      { title: "Full Stack Developer", desc: "Work across frontend, backend, and databases." },
      { title: "Backend Developer", desc: "Build scalable APIs and server-side systems." },
    ],
  },
};

async function getOrCreateContent(key) {
  let doc = await SiteContent.findOne({ key });
  if (!doc) {
    doc = await SiteContent.create({ key, data: DEFAULTS[key] || {} });
  }
  return doc;
}

export const getPublicContent = async (req, res) => {
  try {
    const { key } = req.params;
    const doc = await getOrCreateContent(key);
    res.json(doc.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const upsertContent = async (req, res) => {
  try {
    const { key } = req.params;
    const doc = await SiteContent.findOneAndUpdate(
      { key },
      { data: req.body },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(doc.data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ---------- Careers applications ---------- */
export const getApplications = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search?.trim()) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } },
      ];
    }
    const list = await Application.find(filter).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const doc = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------- Projects admin list ---------- */
export const getAllProjectsAdmin = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = String(req.query.category).toLowerCase();
    if (req.query.search?.trim()) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ];
    }
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
