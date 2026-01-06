export default function ownerOnly(req, res, next) {
  if (req.user.role !== "owner") {
    return res.status(403).json({ message: "Owners only" });
  }
  next();
}
