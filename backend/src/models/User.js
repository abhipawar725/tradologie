import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email"],
      required: [true, "Email is required"],
    },

    password: {
      type: String,
      trim: true,
      match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|;:'",.<>/?\\-])(?=.{8,}).*$/, "Password must contain uppercase, lowercase, number, symbol & min 8 chars"],
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10)
  next();
})

const User = model("User", userSchema);
export default User;
