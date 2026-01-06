import OwnerProfile from "../models/OwnerProfile.js";

/* ---------- CREATE PROFILE ---------- */
export const createProfile = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone is required" });
    }

    const exists = await OwnerProfile.findOne({ userId: req.user.id });
    if (exists) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const profile = await OwnerProfile.create({
      userId: req.user.id,
      phone,
    });

    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------- GET MY PROFILE ---------- */
export const getProfile = async (req, res) => {
  try {
    const profile = await OwnerProfile.findOne({
      userId: req.user.id,
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------- UPDATE PROFILE ---------- */
export const updateProfile = async (req, res) => {
  try {
    const profile = await OwnerProfile.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
