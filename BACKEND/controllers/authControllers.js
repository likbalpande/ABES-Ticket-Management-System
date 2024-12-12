import User from "../Models/userModel.js";
import { addJwtTokenToResponseCookie } from "../utils/cookieHandling.js";
import { handleError } from "../utils/errorHandling.js";

export const signup = async (req, res) => {
    const { email, username, rollNumber, phoneNumber, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newUser = await User.create({
            email,
            username,
            rollNumber,
            phoneNumber,
            password,
        });

        res.status(201).json({
            status: "success",
            message: "Signup successful",
            user: {
                email: newUser.email,
                username: newUser.username,
                isAdmin: newUser.isAdmin,
            },
        });
    } catch (err) {
        handleError("signup", err, res);
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    // if(email.includes('likhilesh'))

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist!" });
        }

        const isValidPassword = await existingUser.validatePassword({
            password,
            hashedPassword: existingUser.password,
        });

        if (!isValidPassword) {
            res.status(400).json({
                status: "fail",
                message: "Invalid Password",
            });
            return;
        }

        const jwtToken = addJwtTokenToResponseCookie(res, {
            email,
            username: existingUser.username,
            rollNumber: existingUser.rollNumber,
            phoneNumber: existingUser.phoneNumber,
        });

        res.status(201).json({
            status: "success",
            message: "Login successful",
            user: {
                email: existingUser.email,
                username: existingUser.username,
                isAdmin: existingUser.isAdmin,
                token: jwtToken,
            },
        });
    } catch (err) {
        handleError("signup", err, res);
    }
};
