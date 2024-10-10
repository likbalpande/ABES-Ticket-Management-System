import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        isAdmin: {
            type: Boolean,
            required: false,
            default: false,
        },
        username: {
            type: String,
            required: true,
        },
        rollNumber: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

userSchema.methods.validatePassword = async ({ password, hashedPassword }) => {
    return bcrypt.compare(password, hashedPassword);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model("users", userSchema);

export default User;
