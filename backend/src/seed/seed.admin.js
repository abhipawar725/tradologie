import bcrypt from "bcrypt";
import User from "../models/User.js";

const createAdmin = async () => {
  const existingUser = await User.findOne({ email: "admin@tradologie.com" });
  if (existingUser) {
    console.log("admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin2804@", 10);

  await User.create({
    name: "super admin",
    email: "admin@tradologie.com",
    password: hashedPassword,
    role: "admin",
  });

  console.log("Admin created successfully");
  process.exit();
};

export default createAdmin;