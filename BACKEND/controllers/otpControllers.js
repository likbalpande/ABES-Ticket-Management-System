import OTP from "../Models/otpModel.js";
import nodemailer from "nodemailer";
import User from "../Models/userModel.js";
import { handleError } from "../utils/errorHandling.js";

const sendMail = async ({ email, otp }) => {
    let mailer = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: "cloudfile2024@gmail.com",
            pass: "qbaxciexeyxlijjk",
        },
    });

    const data = {
        from: "Likhilesh@<Cloud Files>",
        to: email,
        subject: "OTP Verification for Cloud Files",
        html: `<html>
            <head>
                <style>
                    body{
                        background-color: lime;
                    }
                </style>
            </head>
            <body>
                    <h4>OTP Verification @ Cloud Files</h4>
                    <p>Your otp is <b>${otp}</b></p>
            </body>
        </html>`,
    };

    const { response, messageId } = await mailer.sendMail(data);
    return { response, messageId };
};

export const generateOtp = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(400).json({
                status: "fail",
                message: "Email is required",
                data: {},
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                status: "fail",
                message: 'Email is already registered. Please try "login"',
                data: {},
            });
        }

        const oldOTP = await OTP.findOne({
            email,
            expiresAt: {
                $gte: Date.now(),
            },
        });

        if (oldOTP) {
            return res.status(400).json({
                status: "success",
                message: "OTP has already been sent",
                data: {},
            });
        }

        const otp = Math.floor(1000 + Math.random() * 9000) % 10000;
        console.log("sending OTP to", email);
        const mailInfo = await sendMail({ email, otp });
        console.log("OTP sent 📩", email);

        await OTP.create({
            email,
            otp,
            expiresAt: Date.now() + process.env.MINUTES_TO_EXPIRE_OTP * 60 * 1000,
            mailInfo: mailInfo,
        });

        res.status(201).json({
            status: "success",
            message: "New OTP has been sent successfully",
            data: {},
        });
    } catch (err) {
        console.log("OTP NOT sent ❌", email);
        handleError("generateOtp", err, res);
    }
};
