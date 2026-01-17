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

    if (!pg) return res.status(404).json({ message: "PG not found" });

    // ✅ normalize existingImages from formdata
    const existingImages = req.body.existingImages
      ? Array.isArray(req.body.existingImages)
        ? req.body.existingImages
        : [req.body.existingImages]
      : [];

    // ✅ normalize pg.images (supports both old string[] and new [{url, publicId}])
    const oldImagesNormalized = (pg.images || []).map((img) => {
      if (typeof img === "string") return { url: img, publicId: null };
      return img;
    });

    // ✅ find removed images by comparing URL
    const removedImages = oldImagesNormalized.filter(
      (img) => !existingImages.includes(img.url)
    );

    // ✅ delete only those which have publicId
    for (const img of removedImages) {
      if (img.publicId) {
        await cloudinary.uploader.destroy(img.publicId);
      }
    }

    // ✅ new uploads
    const uploads = (req.files || []).map((file) => ({
      url: file.path,
      publicId: file.filename,
    }));

    // ✅ keep only the images user kept + append new uploads
    const keptImages = oldImagesNormalized.filter((img) =>
      existingImages.includes(img.url)
    );

    pg.images = [...keptImages, ...uploads];

    // ✅ update other fields (avoid overwriting images accidentally)
    const { images, existingImages: ex, ...rest } = req.body;
    Object.assign(pg, rest);

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
    const pg = await PG.findOne({
      _id: req.params.id,
      ownerId: req.user.id,
    });

    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    // ✅ normalize images (supports old string[] + new [{url, publicId}])
    const imagesNormalized = (pg.images || []).map((img) => {
      if (typeof img === "string") return { url: img, publicId: null };
      return img;
    });

    // ✅ delete from cloudinary only if publicId exists
    for (const img of imagesNormalized) {
      if (img.publicId) {
        await cloudinary.uploader.destroy(img.publicId);
      }
    }

    // ✅ delete from DB after cleanup
    await pg.deleteOne();

    res.json({ message: "PG deleted (Cloudinary cleaned)" });
  } catch (err) {
    console.error("DELETE PG ERROR:", err);
    res.status(500).json({ message: "Failed to delete PG" });
  }
};

