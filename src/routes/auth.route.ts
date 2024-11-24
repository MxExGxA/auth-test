import { Router } from "express";
import { loginUser, logoutUser, registerUser, updateUser, verifyUser } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/token.middleware";

const router = Router();

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .post("/verify", verifyUser)
  .put("/update", updateUser)
  .get("/logout", logoutUser);
export default router;
