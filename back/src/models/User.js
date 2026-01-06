import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String, // hashed
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "owner", "admin"],
      default: "student",
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
