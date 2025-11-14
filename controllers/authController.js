// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

exports.register = async (req, res, next) => {
  try {
    const { fullName, email, password, role } = req.body;
    if (!fullName || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email in use' });
    const user = await User.create({ fullName, email, password, role });
    const token = generateToken(user);
    res.status(201).json({ token, user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role } });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const matched = await user.matchPassword(password);
    if (!matched) return res.status(401).json({ message: 'Invalid credentials' });
    const token = generateToken(user);
    res.json({ token, user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role } });
  } catch (err) { next(err); }
};
