// controllers/userPdfController.js
import UserPDF from '../models/UserPDF.js';

export const saveUserPDF = async (req, res) => {
  try {
    const { semester, subject, fileUrl } = req.body;

    // Check if all required fields exist
    if (!semester || !subject || !fileUrl) {
      return res.status(400).json({ message: 'Missing semester, subject, or fileUrl' });
    }

    const newPdf = await UserPDF.create({
      user: req.user._id, // from protect middleware
      semester,
      subject,
      fileUrl,
    });

    res.status(201).json(newPdf);
  } catch (error) {
    console.error('Error saving user PDF:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const getUserPDFs = async (req, res) => {
  try {
    const data = await UserPDF.find({ user: req.user._id }).sort({ uploadedAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch your PDFs' });
  }
};
