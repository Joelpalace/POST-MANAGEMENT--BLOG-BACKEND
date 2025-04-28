const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });
    const user = await User.create({ username, email, password });
    res.status(201).json({ token: generateToken(user), user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ msg: 'Invalid credentials' });
    res.json({ token: generateToken(user), user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
