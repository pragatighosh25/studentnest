import express from "express";
import auth from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/adminOnly.middleware.js";
import {
  getAllPGs,
  toggleVerifyPG,
  toggleActivePG, getAdminStats
} from "../controllers/adminPG.controller.js";

const router = express.Router();

router.get("/stats", auth, adminOnly, getAdminStats);
router.get("/pgs", auth, adminOnly, getAllPGs);
router.patch("/pgs/:id/verify", auth, adminOnly, toggleVerifyPG);
router.patch("/pgs/:id/toggle", auth, adminOnly, toggleActivePG);


export default router;
