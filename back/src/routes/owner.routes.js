import express from "express";
import auth from "../middleware/auth.middleware.js";
import ownerOnly from "../middleware/ownerOnly.middleware.js";
import {
  createProfile,
  getProfile,
  updateProfile,
} from "../controllers/ownerProfile.controller.js";

const router = express.Router();

router.post("/profile", auth, ownerOnly, createProfile);
router.get("/profile", auth, ownerOnly, getProfile);
router.patch("/profile", auth, ownerOnly, updateProfile);

export default router;
