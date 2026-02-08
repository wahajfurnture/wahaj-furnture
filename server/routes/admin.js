import express from "express";
import {
  associateFabricWithFurn,
  createColor,
  createFabric,
  createFurn,
  deleteColor,
  deleteFabric,
  deleteFurn,
  editColor,
  editFabric,
  editFurn,
  getAllFabrics,
  getFabricsByFurnId,
  removeAssociation,
} from "../controllers/adminController.js";
import strictTo from "../utils/strictTo.js";

const router = express.Router();

app.use(strictTo(["admin"]));

router.get("/fabric", getAllFabrics);
router.get("/fabric/:furnId", getFabricsByFurnId);

router.post("/furniture", createFurn);
router.post("/fabric", createFabric);
router.post("/color", createColor);

router.put("/furniture/:furnId", editFurn);
router.put("/fabric/:fabricId", editFabric);
router.put("/color/:colorId", editColor);

router.delete("/furniture/:furnId", deleteFurn);
router.delete("/fabric/:fabricId", deleteFabric);
router.delete("/color/:colorId", deleteColor);

router.post("/associate", associateFabricWithFurn);
router.delete("/associate", removeAssociation);

export default router;
