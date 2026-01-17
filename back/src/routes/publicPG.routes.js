import express from "express";
import PG from "../models/PG.js";

const router = express.Router();

// ✅ Public listing route for students
router.get("/pgs", async (req, res) => {
  try {
    const pgs = await PG.find({ active: true }).sort({ createdAt: -1 });
    res.json(pgs);
  } catch (err) {
    console.error("PUBLIC PG ERROR:", err);
    res.status(500).json({ message: "Failed to fetch PGs" });
  }
});
router.get("/pgs/:id", async (req, res) => {
  try {
    const pg = await PG.findOne({ _id: req.params.id, active: true });

    if (!pg) return res.status(404).json({ message: "PG not found" });

    res.json(pg);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch PG details" });
  }
});


// ✅ Student inquiry log (Call / WhatsApp clicked)
router.post("/pgs/:id/inquiry", async (req, res) => {
  try {
    const pg = await PG.findByIdAndUpdate(
      req.params.id,
      { $inc: { inquiryCount: 1 } },
      { new: true }
    );

    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    res.json({ message: "Inquiry logged", inquiryCount: pg.inquiryCount });
  } catch (err) {
    console.error("INQUIRY LOG ERROR:", err);
    res.status(500).json({ message: "Failed to log inquiry" });
  }
});



export default router;
