import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const Fetch = async (req, res) => {
  try {
    const users = await User.find().select("-password").lean();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const Create = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (name.trim().length < 3) {
      return res.status(400).json({ message: "User name is invalid" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password, role: "user" });
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "Duplicate user" });
    return res.status(500).json({ error: error.message });
  }
};

export const Update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const update = {};

    if (name.trim() === "" || email.trim() === "" || password.trim() === "" || role.trim() === "") {
      return res.status(400).json({ message: "All field are required" });
    }

    if (name) {
      if (name.trim().length < 3) return res.status(400).json({ message: "Invalid user name" });
      update.name = name;
    }

    if (email) update.email = email;
    if (password) {
      update.password = await bcrypt.hash(password, 10);
    }

    if (role) update.role = role;

    const updatedUser = await User.findByIdAndUpdate(id, update, { new: true });
    return res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "Duplicate user" });
    return res.status(500).json({ error: error.message });
  }
};

export const Delete = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const deleted = await User.findByIdAndDelete(id);
    return res.status(200).json({ message: "User deleted successfully", deleted });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
