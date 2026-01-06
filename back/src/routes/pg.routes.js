import express from "express";
import auth from "../middleware/auth.middleware.js";
import ownerOnly from "../middleware/ownerOnly.middleware.js";
import {
  createPG,
  getMyPGs,
  updatePG,
  togglePG,
} from "../controllers/pg.controller.js";

const router = express.Router();

router.post("/", auth, ownerOnly, createPG);
router.get("/my", auth, ownerOnly, getMyPGs);
router.patch("/:id", auth, ownerOnly, updatePG);
router.patch("/:id/toggle", auth, ownerOnly, togglePG);

export default router;
