import express from "express";
import auth from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/adminOnly.middleware.js";
import {
  getAllPGsAdmin,
  updatePGAdmin,
  deletePGAdmin,
  getAllInquiriesAdmin,
} from "../controllers/adminPG.controller.js";

const router = express.Router();

// ✅ GET all PGs
router.get("/pgs", auth, adminOnly, getAllPGsAdmin);

// ✅ GET all Inquiries
router.get("/inquiries", auth, adminOnly, getAllInquiriesAdmin);

// ✅ PATCH active/verified
router.patch("/pgs/:id", auth, adminOnly, updatePGAdmin);

// ✅ DELETE PG
router.delete("/pgs/:id", auth, adminOnly, deletePGAdmin);

export default router;

