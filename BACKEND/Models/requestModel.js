import mongoose from "mongoose";

const userRequestSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        itemName: {
            type: String,
            required: true,
        },
        quantity: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        extraInfo: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
        },
        adminRemark: {
            type: String,
        },
    },
    { timestamps: true }
);

const UserRequest = mongoose.model("user-requests", userRequestSchema);

export default UserRequest;
