import express from "express";
import auth from "../middleware/auth.middleware.js";
import ownerOnly from "../middleware/ownerOnly.middleware.js";
import {
  createPG,
  getOwnerPGs,
  updatePG,
  deletePG,
} from "../controllers/ownerPG.controller.js";

const router = express.Router();

router.post("/pgs", auth, ownerOnly, createPG);
router.get("/pgs", auth, ownerOnly, getOwnerPGs);
router.patch("/pgs/:id", auth, ownerOnly, updatePG);
router.delete("/pgs/:id", auth, ownerOnly, deletePG);

export default router;
