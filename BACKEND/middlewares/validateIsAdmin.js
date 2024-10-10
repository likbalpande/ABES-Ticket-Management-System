import User from "../Models/userModel.js";
import { handleError } from "../utils/errorHandling.js";

export const validateIsAdmin = async (req, res, next) => {
    try {
        const { email = "" } = req.user;

        if (!email) {
            res.status(401);
            return res.json({
                status: "fail",
                message: "User not authorized",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(401);
            return res.json({
                status: "fail",
                message: "Invalid User",
            });
        }
        if (!user.isAdmin) {
            res.status(401);
            return res.json({
                status: "fail",
                message: "User is not admin",
            });
        }
        // next();
        setTimeout(next, 4000);
    } catch (err) {
        handleError("validateJWTToken", err, res);
    }
};
