import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import userRoutes from './routes/userRoutes.js';
import semesterRoutes from './routes/semesterRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
// import downloadRoutes from './routes/downloadRoutes.js';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(process.cwd(), '/uploads')));


dotenv.config();

app.use('/api/users', userRoutes);
app.use('/api/semesters', semesterRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/chat', chatRoutes);
// app.use('/api/downloads', downloadRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server is running on port 5000');
    });
  }).catch(err => console.log(err));
