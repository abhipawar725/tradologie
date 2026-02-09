import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 50,
      required: [true, "Name is required"],
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email"],
      index: true,
      required: [true, "Email is required"],
    },

    password: {
      type: String,
      match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|;:'",.<>/?\\-])(?=.{8,}).*$/, "Password must contain uppercase, lowercase, number, symbol & min 8 chars"],
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ['admin', 'author', 'user'],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  { timestamps: true },
);

userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10)
  next();
})

userSchema.methods.comparePassword = function(plainPassword){
  return bcrypt.compare(plainPassword, this.password)
}

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  }
})

const User = model("User", userSchema);
export default User;
