import PG from "../models/PG.js";

/* ---------- CREATE PG ---------- */
export const createPG = async (req, res) => {
  try {
    const pg = await PG.create({
      ...req.body,
      ownerId: req.user.id,
    });

    res.status(201).json(pg);
  } catch (err) {
    res.status(400).json({ message: "Failed to create PG" });
  }
};

/* ---------- GET OWNER PGs ---------- */
export const getOwnerPGs = async (req, res) => {
  try {
    const pgs = await PG.find({ ownerId: req.user.id });
    res.json(pgs);
  } catch {
    res.status(500).json({ message: "Failed to fetch PGs" });
  }
};

/* ---------- UPDATE PG ---------- */
export const updatePG = async (req, res) => {
  try {
    const pg = await PG.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user.id },
      req.body,
      { new: true }
    );

    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    res.json(pg);
  } catch {
    res.status(400).json({ message: "Failed to update PG" });
  }
};

/* ---------- DELETE PG ---------- */
export const deletePG = async (req, res) => {
  try {
    const pg = await PG.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user.id,
    });

    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    res.json({ message: "PG deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete PG" });
  }
};
