import PG from "../models/PG.js";

export const getPublicPGs = async (req, res) => {
  try {
    const {
      city,
      area,
      gender,
      roomType,
      minRent,
      maxRent,
    } = req.query;

    const filter = { active: true };

    // ✅ optional: show only verified later if needed
    // filter.verified = true;

    if (city) filter.city = new RegExp(city, "i");
    if (area) filter.area = new RegExp(area, "i");
    if (gender) filter.gender = gender;
    if (roomType) filter.roomType = roomType;

    if (minRent || maxRent) {
      filter.rent = {};
      if (minRent) filter.rent.$gte = Number(minRent);
      if (maxRent) filter.rent.$lte = Number(maxRent);
    }

    const pgs = await PG.find(filter).sort({ createdAt: -1 });
    res.json(pgs);
  } catch (err) {
    console.error("PUBLIC PG FETCH ERROR:", err);
    res.status(500).json({ message: "Failed to fetch PGs" });
  }
};
