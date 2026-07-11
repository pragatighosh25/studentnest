import PG from "../models/PG.js";
import Inquiry from "../models/Inquiry.js";
import cloudinary from "../lib/cloudinary.js";

/* ---------- GET ALL PGs (ADMIN) ---------- */
export const getAllPGsAdmin = async (req, res) => {
  try {
    const pgs = await PG.find()
      .populate("ownerId", "name email phone")
      .sort({ createdAt: -1 });

    res.json(pgs);
  } catch (err) {
    console.error("ADMIN GET PGs ERROR:", err);
    res.status(500).json({ message: "Failed to fetch PGs" });
  }
};

/* ---------- PATCH PG (ADMIN) ---------- */
export const updatePGAdmin = async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);
    if (!pg) return res.status(404).json({ message: "PG not found" });

    // ✅ only allow safe fields
    if (typeof req.body.active !== "undefined") {
      pg.active = req.body.active;
    }

    if (typeof req.body.verified !== "undefined") {
      pg.verified = req.body.verified;
    }

    await pg.save();

const updatedPG = await PG.findById(pg._id).populate(
  "ownerId",
  "name email phone"
);

res.json(updatedPG);

  } catch (err) {
    console.error("ADMIN UPDATE PG ERROR:", err);
    res.status(500).json({ message: "Failed to update PG" });
  }
};

/* ---------- DELETE PG (ADMIN) ---------- */
export const deletePGAdmin = async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);

    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    // ✅ Cloudinary cleanup
    const imgs = (pg.images || []).map((img) =>
      typeof img === "string" ? { url: img, publicId: null } : img
    );

    for (const img of imgs) {
      if (img.publicId) {
        await cloudinary.uploader.destroy(img.publicId);
      }
    }

    await pg.deleteOne();
    res.json({ message: "PG deleted" });
  } catch (err) {
    console.error("ADMIN DELETE PG ERROR:", err);
    res.status(500).json({ message: "Failed to delete PG" });
  }
};

/* ---------- GET ALL INQUIRIES (ADMIN) ---------- */
export const getAllInquiriesAdmin = async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .populate({
        path: "pgId",
        select: "name area city ownerId",
        populate: {
          path: "ownerId",
          select: "name email phone",
        },
      })
      .sort({ createdAt: -1 });

    res.json(inquiries);
  } catch (err) {
    console.error("ADMIN GET INQUIRIES ERROR:", err);
    res.status(500).json({ message: "Failed to fetch inquiries" });
  }
};
