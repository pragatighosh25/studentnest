import PG from "../models/PG.js";
import User from "../models/User.js";

/* ---------- GET ALL PGs ---------- */
export const getAllPGs = async (req, res) => {
  try {
    const pgs = await PG.find().populate("ownerId", "name email phone")
  .sort({ createdAt: -1 });
    res.json(pgs);
  } catch {
    res.status(500).json({ message: "Failed to fetch PGs" });
  }
};

/* ---------- VERIFY / UNVERIFY PG ---------- */
export const toggleVerifyPG = async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);
    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    pg.verified = !pg.verified;
    await pg.save();

    res.json(pg);
  } catch {
    res.status(500).json({ message: "Failed to verify PG" });
  }
};

/* ---------- SUSPEND / ACTIVATE PG ---------- */
export const toggleActivePG = async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);
    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    pg.active = !pg.active;
    await pg.save();

    res.json(pg);
  } catch {
    res.status(500).json({ message: "Failed to update PG status" });
  }
};
export const getAdminStats = async (req, res) => {
  try {
    const totalPGs = await PG.countDocuments();
    const activePGs = await PG.countDocuments({ active: true });
    const owners = await User.countDocuments({ role: "owner" });

    res.json({
      totalPGs,
      activePGs,
      owners,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
};