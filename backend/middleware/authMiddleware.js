// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

export const isAdmin = (req, res, next) => {
  const adminEmails = ['vishalprajapati2303@gmail.com', 'harshul@notesea.xyz'];
  if (req.user && adminEmails.includes(req.user.email)) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Admin only' });
  }
};
