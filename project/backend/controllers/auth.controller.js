import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import loginLimitter from "../config/rateLimit.config.js";
import verificationToken from "../middleware/verifyToken.middle.js";
import User from "../models/user.model.js";

const authController = express();

authController.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    if (!username || !email || !password) return;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({ username, email, password: hashedPassword });
    const savedUser = await user.save();

    res.status(201).json({ message: "User created successfully" });
    console.log(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

authController.post("/login", loginLimitter, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "user does not have account" });

    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass)
      return res.status(400).json({ message: "invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

authController.get(
  "/users",
  verificationToken,

  async (req, res) => {
    res.end("hi");
  },
);
authController.put("/update", (req, res) => {
  res.json({
    message: "Logout endpoint",
  });
});

authController.delete("/delete", (req, res) => {
  res.json({
    message: "Logout endpoint",
  });
});

export default authController;
