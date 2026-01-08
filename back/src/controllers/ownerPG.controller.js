import PG from "../models/PG.js";
import cloudinary from "../lib/cloudinary.js";

/* ---------- CREATE PG ---------- */
export const createPG = async (req, res) => {
  try {
    // 🔥 THIS IS WHERE YOUR CODE GOES
    const uploads = [];

    for (const file of req.files) {
      uploads.push({
        url: file.path,        // Cloudinary secure_url
        publicId: file.filename,
      });
    }

    const pg = await PG.create({
      ...req.body,
      images: uploads,        // 👈 IMPORTANT
      ownerId: req.user.id,
    });

    res.status(201).json(pg);
  } catch (err) {
    console.error("CREATE PG ERROR:", err);
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
    const pg = await PG.findOne({
      _id: req.params.id,
      ownerId: req.user.id,
    });

    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    // 1️⃣ images user KEPT
    const existingImages = req.body.existingImages
      ? Array.isArray(req.body.existingImages)
        ? req.body.existingImages
        : [req.body.existingImages]
      : [];

    // 2️⃣ new uploads
    const uploads = [];
    for (const file of req.files) {
      uploads.push({
        url: file.path,
        publicId: file.filename,
      });
    }

    // 3️⃣ find removed images
    const removedImages = pg.images.filter(
      (img) => !existingImages.includes(img.url)
    );

    // 4️⃣ delete removed images from Cloudinary
    for (const img of removedImages) {
      await cloudinary.uploader.destroy(img.publicId);
    }

    // 5️⃣ update pg
    pg.images = [
      ...pg.images.filter((img) => existingImages.includes(img.url)),
      ...uploads,
    ];

    Object.assign(pg, req.body);
    await pg.save();

    res.json(pg);
  } catch (err) {
    console.error("UPDATE PG ERROR:", err);
    res.status(500).json({ message: "Failed to update PG" });
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
