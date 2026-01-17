import mongoose from "mongoose";

const pgSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },

    rent: { type: Number, required: true },
    deposit: { type: Number, required: true },

    phone: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Boys", "Girls", "Co-ed"],
      required: true,
    },

    roomType: {
      type: String,
      enum: ["Single", "Double", "Triple"],
      required: true,
    },

    amenities: {
      type: [String],
      default: [],
    },

    images: {
      type: [
        {
          url: {
            type: String,
            required: true,
          },
          publicId: {
            type: String,
            required: true,
          },
        },
      ],
      validate: (v) => v.length > 0,
    },

    active: {
      type: Boolean,
      default: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },
    inquiryCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PG", pgSchema);
