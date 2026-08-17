import TeamMember from "../models/TeamMember.js";

const PARTNER_SEED = [
  {
    name: "Khushi Photocopy & Printout",
    role: "Partner",
    image: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1763982004/k_qk95m1.webp",
    type: "partner",
    order: 0,
  },
  {
    name: "Manglam residency",
    role: "Partner",
    image: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1768415621/6287321978473484191_avdbd4.jpg",
    type: "partner",
    order: 1,
  },
  {
    name: "Gupta Store",
    role: "Partner",
    image: "https://res.cloudinary.com/dwq5qifuk/image/upload/q_auto/f_auto/v1776185917/6bfeef9d-ec20-45eb-8956-c43e7b4889b6_sxg50y.jpg",
    type: "partner",
    order: 2,
  },
];

async function seedPartnersIfEmpty() {
  const partnerCount = await TeamMember.countDocuments({ type: "partner" });
  if (partnerCount === 0) {
    await TeamMember.insertMany(PARTNER_SEED);
  }
}

export const getPublicTeam = async (req, res) => {
  try {
    await seedPartnersIfEmpty();
    const { type } = req.query;
    const filter = { isActive: true };
    if (type) filter.type = type;

    const members = await TeamMember.find(filter).sort({ order: 1, createdAt: 1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllTeam = async (req, res) => {
  try {
    await seedPartnersIfEmpty();
    const { type, search } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (search?.trim()) {
      filter.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { role: { $regex: search.trim(), $options: "i" } },
      ];
    }

    const members = await TeamMember.find(filter).sort({ type: 1, order: 1, createdAt: 1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTeamMember = async (req, res) => {
  try {
    const {
      name, role, image, type, github, linkedin, instagram,
      website, bio, location, skills, order, isActive,
    } = req.body;
    if (!name?.trim() || !image?.trim()) {
      return res.status(400).json({ message: "Name and image URL are required." });
    }

    const member = await TeamMember.create({
      name: name.trim(),
      role: role?.trim() || "",
      image: image.trim(),
      type: type || "contributor",
      github: github || "",
      linkedin: linkedin || "",
      instagram: instagram || "",
      website: website || "",
      bio: bio || "",
      location: location || "",
      skills: skills || "",
      order: order ?? 0,
      isActive: isActive !== false,
    });

    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const reorderTeamMembers = async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "items array required" });
    }
    await Promise.all(
      items.map(({ id, order }) =>
        TeamMember.findByIdAndUpdate(id, { order })
      )
    );
    const members = await TeamMember.find().sort({ type: 1, order: 1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
