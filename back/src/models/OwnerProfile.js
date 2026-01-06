import mongoose from "mongoose";

const ownerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  phone: String,
  verified: { type: Boolean, default: false },
});

export default mongoose.model("OwnerProfile", ownerProfileSchema);
