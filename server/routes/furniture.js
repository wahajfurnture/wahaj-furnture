import express from "express";
import {
  getCurtains,
  getFabricColors,
  getFurn,
  getSofas,
} from "../controllers/furnitureController.js";

const router = express.Router();

router.get("/sofa", getSofas);

router.get("/curtain", getCurtains);

router.get("/details/:id", getFurn);

router.get("/fabric/:fabricId/:furnId", getFabricColors);

export default router;
