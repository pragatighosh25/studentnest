import PG from "../models/PG.js";

/* ---------- GET ALL PGs ---------- */
export const getAllPGs = async (req, res) => {
  try {
    const pgs = await PG.find().populate(
      "ownerId",
      "name email"
    );
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
