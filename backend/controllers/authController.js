import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { f_userName, f_Pwd } = req.body;

    if (!f_userName || !f_Pwd) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ f_userName });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(f_Pwd, 10);

    const newUser = new User({
      f_userName,
      f_Pwd: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    return res.status(200).json({
      message: "User Logged In Successfully",
      token,
      name:newUser.f_userName
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged Out Successfully" });
};
