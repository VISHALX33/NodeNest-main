import dotenv from "dotenv";
import mongoose from "mongoose";
import TeamMember from "../models/TeamMember.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const vishal = await TeamMember.findOne({ name: /vishal prajapati/i });
const mohit = await TeamMember.findOne({ name: /mohit/i });

if (vishal) {
  await TeamMember.updateOne(
    { _id: vishal._id },
    {
      $set: {
        linkedin: "https://www.linkedin.com/in/vishal-prajapati-445799289/",
        github: "https://github.com/VISHALX33/",
        website: "https://vishal.notesea.xyz/",
        instagram: "https://www.instagram.com/notesea.xyz/",
        bio: "Founder of NoteSea. Engineering student and full-stack developer building notes, projects, and student tools so quality resources stay accessible without barriers.",
        skills: "MERN Stack, Product, Community",
        location: "Jaipur, Rajasthan",
      },
    }
  );
  console.log("Updated", vishal.name);
} else {
  console.log("Vishal not found in DB (fallback links still apply on /team)");
}

if (mohit) {
  await TeamMember.updateOne(
    { _id: mohit._id },
    {
      $set: {
        linkedin: "https://www.linkedin.com/in/0xmohitxyz/",
        github: "https://github.com/0xmohitxyz",
        website: "https://0xmohit.xyz/",
        bio: "Full-stack blockchain developer and Chief Evangelist at NoteSea. Builds practical Web3 products (dApps, smart contracts) and helps grow the student community through partnerships and outreach.",
        skills: "Web3, Solidity, Full Stack, Growth",
        location: "Jaipur, Rajasthan",
      },
    }
  );
  console.log("Updated", mohit.name);
} else {
  console.log("Mohit not found in DB (fallback links still apply on /team)");
}

await mongoose.disconnect();
