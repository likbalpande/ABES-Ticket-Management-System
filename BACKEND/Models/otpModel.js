import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            default: Date.now() + 60 * 1000,
        },
    },
    { timestamps: true }
);

otpSchema.methods.verifyOtp = async ({ otp, hashedOtp }) => {
    return bcrypt.compare(otp, hashedOtp);
};

otpSchema.pre("save", async function (next) {
    if (!this.isModified("otp")) next();
    this.otp = await bcrypt.hash(this.otp, 12);
    next();
});

const Otp = mongoose.model("otps", otpSchema);

export default Otp;
