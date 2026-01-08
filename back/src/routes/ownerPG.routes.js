import express from "express";
import auth from "../middleware/auth.middleware.js";
import ownerOnly from "../middleware/ownerOnly.middleware.js";
import upload from "../middleware/upload.middleware.js";
import {
  createPG,
  getOwnerPGs,
  updatePG,
  deletePG,
} from "../controllers/ownerPG.controller.js";

const router = express.Router();

/* CREATE PG (with images) */
router.post(
  "/pgs",
  auth,
  ownerOnly,
  upload.array("images", 6),
  createPG
);

/* GET OWNER PGs */
router.get("/pgs", auth, ownerOnly, getOwnerPGs);

/* UPDATE PG (optional new images) */
router.patch(
  "/pgs/:id",
  auth,
  ownerOnly,
  upload.array("images", 6),
  updatePG
);

/* DELETE PG */
router.delete("/pgs/:id", auth, ownerOnly, deletePG);

export default router;
