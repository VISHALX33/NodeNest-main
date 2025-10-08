import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};


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
  from: `"NoteSea" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "Verify Your Email for NoteSea",
  html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; background-color: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb;">
      <!-- Header -->
      <h2 style="color: #16a34a; text-align: center;">Hello ${name || "User"}!</h2>
      <p style="text-align: center; font-size: 16px;">
        Welcome to <strong>NoteSea</strong> – your smart study companion.
      </p>

      <!-- OTP Section -->
      <div style="background-color: #ecfdf5; padding: 20px; margin: 20px 0; border-radius: 12px; text-align: center; border: 1px solid #16a34a;">
        <p style="margin: 0; font-size: 16px;">Your <strong>OTP</strong> to verify your email is:</p>
        <h1 style="color: #16a34a; font-size: 32px; margin: 10px 0 0;">${otp}</h1>
      </div>

      <p style="font-size: 14px; text-align: center; color: #555;">
        This OTP is valid for <strong>15 minutes</strong>.<br />
        If you did not request this, please ignore this email.
      </p>

      <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />

      <!-- Footer -->
      <p style="font-size: 12px; text-align: center; color: #888;">
        &copy; ${new Date().getFullYear()} NoteSea. All rights reserved.
      </p>
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

// Forgot Password - Send Reset Email
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Save token + expiry in DB
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    // const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const resetUrl = `${process.env.CLIENT_URL || "http://localhost:5000"}/reset-password/${resetToken}`;

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

  await transporter.sendMail({
  from: `"NoteSea" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: " Password Reset Request - NoteSea",
  html: `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background: #16a34a; padding: 20px; text-align: center; color: #fff;">
        <h1 style="margin: 0; font-size: 22px;">NoteSea</h1>
      </div>
      
      <!-- Body -->
      <div style="padding: 30px; color: #333;">
        <h2 style="color: #16a34a; margin-top: 0;">Reset Your Password</h2>
        <p style="font-size: 15px; line-height: 1.6;">
          We received a request to reset your password. Click the button below to set up a new password:
        </p>
        
        <!-- Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="display:inline-block; padding: 14px 28px; background: #16a34a; color: #ffffff; 
                    font-weight: bold; border-radius: 6px; text-decoration: none; font-size: 16px;">
             Reset Password
          </a>
        </div>
        
        <p style="font-size: 14px; color: #555;">
          If you did not request a password reset, you can safely ignore this email.  
          This link will expire in <strong>1 hour</strong>.
        </p>
      </div>
      
      <!-- Footer -->
      <div style="background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #777;">
        © ${new Date().getFullYear()} NoteSea. All rights reserved.
      </div>
    </div>
  `,
});


    res.json({ message: "Password reset email sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const resetTokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    // Hash new password
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successful! Please login." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
