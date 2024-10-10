import UserRequest from "../Models/requestModel.js";
import { handleError } from "../utils/errorHandling.js";

export const getAdminPendingRequests = async (req, res) => {
    try {
        const requests = await UserRequest.find({
            status: "pending",
        }).sort("-createdAt");

        res.status(201).json({
            status: "success",
            message: "Pending Requests fetched!",
            data: requests,
        });
    } catch (err) {
        handleError("getAdminPendingRequests", err, res);
    }
};

export const getAdminReviewedRequests = async (req, res) => {
    try {
        const requests = await UserRequest.find({
            status: { $ne: "pending" },
        }).sort("-createdAt");

        res.status(201).json({
            status: "success",
            message: "Reviewed Requests fetched!",
            data: requests,
        });
    } catch (err) {
        handleError("getAdminReviewedRequests", err, res);
    }
};

export const userRequestStatusChangeByAdmin = async (req, res) => {
    try {
        const { status, _id } = req.body;
        const requests = await UserRequest.findOneAndUpdate(
            {
                _id: _id,
            },
            {
                status,
            }
        );

        res.status(201).json({
            status: "success",
            message: "Requests status updated",
            data: requests,
        });
    } catch (err) {
        handleError("userRequestStatusChangeByAdmin", err, res);
    }
};
