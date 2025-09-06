import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, phone, password, collegeStudent, gender } = req.body;

//     if (!name || !email || !phone || !password || !gender) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//       collegeStudent,
//       gender,
//     });

//     const token = generateToken(newUser);
//     res.status(201).json({ token, user: { ...newUser._doc, password: undefined } });
//   } catch (error) {
//     console.error('Register Error:', error.message);
//     res.status(500).json({ message: 'Server Error. Please try again later.' });
//   }
// };

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, collegeStudent, gender } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save user first
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      collegeStudent,
      gender,
      emailOtp: otp,
      emailOtpExpires: Date.now() + 15 * 60 * 1000 // 15 minutes
    });

    // Try sending OTP via email
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });


      await transporter.sendMail({
  from: `"NoteNest" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "Verify Your Email for NoteNest",
  html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #16a34a;">Hello ${name || "User"},</h2>
      <p>Thank you for registering on <strong>NoteNest</strong>.</p>
      <p>Your <strong>OTP</strong> to verify your email is:</p>
      <h1 style="color: #16a34a; font-size: 28px;">${otp}</h1>
      <p>This OTP will expire in <strong>15 minutes</strong>.</p>
      <p>If you did not request this, please ignore this email.</p>
      <hr />
      <p style="font-size: 12px; color: #888;">NoteNest &copy; ${new Date().getFullYear()}</p>
    </div>
  `,
});


      res.status(201).json({ message: 'OTP sent to email. Please verify before login.' });

    } catch (emailError) {
      console.error('Email sending failed:', emailError);

      // Fallback: log OTP to console for local testing
      console.log(`OTP for ${email}: ${otp}`);

      res.status(201).json({
        message: 'User registered, but email failed. Check server logs for OTP.',
      });
    }

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server Error. Please try again later.' });
  }
};

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//   const token = generateToken(user);
//   res.json({ token, user: { ...user._doc, password: undefined } });
// };

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  if (!user.isVerified) return res.status(400).json({ message: 'Please verify your email before logging in' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { ...user._doc, password: undefined } });
};

export const verifyEmailOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  if (user.isVerified) return res.status(400).json({ message: 'Already verified' });

  if (user.emailOtp !== otp || Date.now() > user.emailOtpExpires) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  user.isVerified = true;
  user.emailOtp = undefined;
  user.emailOtpExpires = undefined;
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ message: 'Email verified successfully', token });
};

export const getProfile = async (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.gender = req.body.gender || user.gender;
    user.collegeStudent = req.body.collegeStudent ?? user.collegeStudent;
    user.location = req.body.location || user.location;
    user.bio = req.body.bio || user.bio;
    user.image = req.body.image || user.image;

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await user.save();
    const userObj = updatedUser.toObject();
    delete userObj.password;
    res.status(200).json(userObj);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const deleteAccount = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    await user.deleteOne();
    res.status(200).json({ message: 'Account deleted successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
