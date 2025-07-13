import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import userRoutes from './routes/userRoutes.js';
import semesterRoutes from './routes/semesterRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import userPdfRoutes from './routes/userPdfRoutes.js';

dotenv.config();

const app = express();

// ✅ FIX: Configure CORS properly
app.use(cors({
  origin: [
    'http://localhost:5173', // local dev
    'https://notenests.netlify.app' // deployed frontend
  ],
  credentials: true,
}));

// ✅ Parse JSON body
app.use(express.json());

// ✅ Serve static files (e.g., uploaded PDFs)
app.use('/uploads', express.static(path.join(process.cwd(), '/uploads')));

// ✅ API routes
app.use('/api/users', userRoutes);
app.use('/api/semesters', semesterRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/user-pdfs', userPdfRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch(err => console.log(err));
