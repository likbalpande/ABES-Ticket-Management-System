import UserRequest from "../Models/requestModel.js";
import { handleError } from "../utils/errorHandling.js";

export const generateUserRequest = async (req, res) => {
    try {
        const { itemName, quantity, amount, extraInfo } = req.body;
        const { email } = req.user;

        const newRequest = await UserRequest.create({
            itemName,
            quantity,
            amount,
            extraInfo,
            email,
        });

        res.status(201).json({
            status: "success",
            message: "Request generated",
            request: newRequest,
        });
    } catch (err) {
        handleError("generateUserRequest", err, res);
    }
};

export const getUserRequests = async (req, res) => {
    try {
        const { email } = req.user;
        const requests = await UserRequest.find({
            email,
        }).sort("-createdAt");
        res.status(201).json({
            status: "success",
            message: "Requests fetched!",
            data: requests,
        });
    } catch (err) {
        handleError("getUserRequests", err, res);
    }
};
