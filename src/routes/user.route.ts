import { Router } from "express";
import { getUserProfile } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/token.middleware";

const router = Router();

router.get("/profile", verifyToken, getUserProfile);

export default router;
