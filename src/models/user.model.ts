import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 100,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 100,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

export const userModel = mongoose.model("users", userSchema);
