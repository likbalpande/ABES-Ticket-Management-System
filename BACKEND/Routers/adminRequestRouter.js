import express from "express";
import {
    getAdminPendingRequests,
    getAdminReviewedRequests,
    userRequestStatusChangeByAdmin,
} from "../controllers/adminRequestControllers.js";

const authRouter = express.Router();

authRouter.get("/pending-requests", getAdminPendingRequests);
authRouter.get("/reviewed-requests", getAdminReviewedRequests);
authRouter.post("/request-status", userRequestStatusChangeByAdmin);

export default authRouter;
