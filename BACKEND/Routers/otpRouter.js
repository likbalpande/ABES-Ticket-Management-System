import express from "express";
import { generateOtp } from "../controllers/otpControllers.js";

const otpRouter = express.Router();

otpRouter.post("/generate", generateOtp);

export default otpRouter;
