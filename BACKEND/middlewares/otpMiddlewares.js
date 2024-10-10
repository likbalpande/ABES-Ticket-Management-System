import Otp from "../Models/otpModel.js";
import { handleError } from "../utils/errorHandling.js";

export const verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({
                status: "fail",
                message: "Email and OTP are required",
                data: {},
            });
        }

        const otpDoc = await Otp.findOne({
            email,
            expiresAt: {
                $gte: Date.now(),
            },
        });

        if (!otpDoc) {
            return res.status(400).json({
                status: "fail",
                message: "OTP has expired! Please generate new OTP",
                data: {},
            });
        }

        const isCorrect = await otpDoc.verifyOtp({
            otp,
            hashedOtp: otpDoc.otp,
        });

        if (!isCorrect) {
            return res.status(401).json({
                status: "fail",
                message: "OTP is incorrect! Please try again",
                data: {},
            });
        }
        console.log("OTP is correct");
        next();
    } catch (err) {
        handleError("otpMiddleware", err, res);
    }
};
