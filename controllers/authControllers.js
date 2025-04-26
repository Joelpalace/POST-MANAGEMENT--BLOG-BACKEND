import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import errorHandler from "../utils/errorHandler.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({
      token: generateToken(user),
      user: { id: user._id, username: user.username, role: user.role },
    });

  } catch (err) {
    errorHandler(err, res);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    res.json({
      token: generateToken(user),
      user: { id: user._id, username: user.username, role: user.role },
    });

  } catch (err) {
    errorHandler(err, res);
  }
};