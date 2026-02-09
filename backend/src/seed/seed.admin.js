import User from "../models/user.model.js";

const createAdmin = async () => {
  const existingUser = await User.findOne({ email: "superadmin@tradologie.com" });
  if (existingUser) {
    console.log("admin already exists");
    return;
  }

  await User.create({
    name: "super admin",
    email: "superadmin@tradologie.com",
    password: "Super2804@",
    role: "admin",
  });

  console.log("Admin created successfully");
  process.exit();
};

export default createAdmin;