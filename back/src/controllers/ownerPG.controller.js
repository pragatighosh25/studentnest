import PG from "../models/PG.js";
import cloudinary from "../lib/cloudinary.js";

const toTitleCase = (str) => {
  if (!str) return "";
  return str
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/* ---------- CREATE PG ---------- */
export const createPG = async (req, res) => {
  try {
    // 🔥 THIS IS WHERE YOUR CODE GOES
    const uploads = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        uploads.push({
          url: file.path,
          publicId: file.filename,
        });
      }
    }

    if (req.body.city) req.body.city = toTitleCase(req.body.city);
    if (req.body.area) req.body.area = toTitleCase(req.body.area);

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

    // ✅ If request is JSON toggle (active/verified only), don't run image logic
    const isSimpleToggle =
      req.headers["content-type"]?.includes("application/json") &&
      (typeof req.body.active !== "undefined" ||
        typeof req.body.verified !== "undefined");

    if (isSimpleToggle) {
      if (typeof req.body.active !== "undefined") pg.active = req.body.active;
      if (typeof req.body.verified !== "undefined")
        pg.verified = req.body.verified;

      await pg.save();
      return res.json(pg);
    }

    // ✅ Full Edit Flow (multipart/form-data)
    const existingImages = req.body.existingImages
      ? Array.isArray(req.body.existingImages)
        ? req.body.existingImages
        : [req.body.existingImages]
      : [];

    // ✅ normalize pg.images (handles both string[] and [{url, publicId}])
    const oldImagesNormalized = (pg.images || []).map((img) => {
      if (typeof img === "string") return { url: img, publicId: null };
      return img;
    });

    // ✅ new uploads (if any)
    const uploads = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        uploads.push({
          url: file.path,
          publicId: file.filename,
        });
      }
    }

    // ✅ removed images = those not present in existingImages
    const removedImages = oldImagesNormalized.filter(
      (img) => !existingImages.includes(img.url)
    );

    // ✅ delete removed cloudinary images only if publicId exists
    for (const img of removedImages) {
      if (img.publicId) {
        await cloudinary.uploader.destroy(img.publicId);
      }
    }

    // ✅ keep only kept images
    const keptImages = oldImagesNormalized.filter((img) =>
      existingImages.includes(img.url)
    );

    pg.images = [...keptImages, ...uploads];

    if (req.body.city) req.body.city = toTitleCase(req.body.city);
    if (req.body.area) req.body.area = toTitleCase(req.body.area);

    // ✅ update other fields safely (don’t overwrite images)
    const { existingImages: ex, images, ...rest } = req.body;
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

