import mongoose from "mongoose";

const pgSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    city: String,
    area: String,
    address: String,
    gender: String,
    roomType: String,
    rent: Number,
    deposit: Number,
    amenities: [String],
    images: [String],
    active: Boolean,
    verified: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model("PG", pgSchema);
