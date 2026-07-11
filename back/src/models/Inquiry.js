import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    pgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PG",
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    studentEmail: {
      type: String,
      required: true,
    },
    studentPhone: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["call", "whatsapp"],
      default: "call",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Inquiry", inquirySchema);
