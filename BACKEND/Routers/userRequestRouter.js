import express from "express";
import { generateUserRequest, getUserRequests } from "../controllers/userRequestControllers.js";

const authRouter = express.Router();

authRouter.route("/").get(getUserRequests).post(generateUserRequest);

export default authRouter;
