import express from "express";
import { changePassword, login } from "../controllers/authController.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";

const router = express.Router();

router.post("/login", login);

router.patch("/change-password", protectedRoutes, changePassword);

export default router;
