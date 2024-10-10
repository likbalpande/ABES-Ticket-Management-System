import express from "express";
import { login, signup } from "../controllers/authControllers.js";
import { verifyOtp } from "../middlewares/otpMiddlewares.js";

const authRouter = express.Router();

authRouter.post("/signup", verifyOtp, signup);
authRouter.post("/login", login);

export default authRouter;
