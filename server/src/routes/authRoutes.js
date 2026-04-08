import express from "express";
import { getMe, googleLogin, login, logout, signUp } from "../controllers/authController.js";
import { isAuth } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/logout", logout);
authRouter.post("/login", login);
authRouter.get("/me", isAuth, getMe);
authRouter.post("/google", googleLogin);

export default authRouter;