import jwt from "jsonwebtoken";

const createJWT = ({ email, username, rollNumber, phoneNumber }) => {
    return jwt.sign(
        {
            email,
            username,
            rollNumber,
            phoneNumber,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

export const addJwtTokenToResponseCookie = (res, { email, username, rollNumber, phoneNumber }) => {
    const jwtToken = createJWT({ email, username, rollNumber, phoneNumber });
    // res.cookie("authorization", `Bearer ${jwtToken}`, {
    //     expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000),
    //     // sameSite: "lax",
    //     sameSite: "None",
    //     secure: true,
    //     httpOnly: true,
    // });
    return jwtToken;
};
