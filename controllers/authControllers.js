import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/Users";
import generateToken from "../utils/generateToken"; // Modular token generation

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    // Send success response with token
    return res.status(201).json({
      token: generateToken(user),
      user: { id: user._id, username: user.username, email: user.email },
    });

  } catch (err) {
    console.error("Error:", err.message); // Log error
    return res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// Login existing user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Send success response with token
    return res.json({
      token: generateToken(user),
      user: { id: user._id, username: user.username, role: user.role },
    });

  } catch (err) {
    console.error("Error:", err.message); // Log error
    return res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};