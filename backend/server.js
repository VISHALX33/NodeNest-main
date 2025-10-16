import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fs from "fs";
import path from "path";

import userRoutes from "./routes/userRoutes.js";
import semesterRoutes from "./routes/semesterRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import userPdfRoutes from "./routes/userPdfRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import chatbot from "./routes/chatbot.js";
import projectRoutes from "./routes/projectRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

console.log("✅ CLIENT_URL:", process.env.CLIENT_URL);
console.log("✅ RESEND_API_KEY loaded:", !!process.env.RESEND_API_KEY);

const app = express();

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://notenests.netlify.app",
      "https://www.notesea.xyz",
    ],
    credentials: true,
  })
);

// ✅ Parse JSON body
app.use(express.json());

// ✅ Serve static files
app.use("/uploads", express.static(path.join(process.cwd(), "/uploads")));

// ✅ API routes
app.use("/api/users", userRoutes);
app.use("/api/semesters", semesterRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/user-pdfs", userPdfRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/chatbot", chatbot);
app.use("/api/projects", projectRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Health check for uptime
app.get("/ping", (req, res) => res.status(200).send("Notesea is alive!"));

// Ensure uploads/projects folder exists
const projectsDir = path.join(process.cwd(), "uploads/projects");
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("✅ Server running on port 5000");
    });
  })
  .catch((err) => console.log(err));
