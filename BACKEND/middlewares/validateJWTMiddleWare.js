import jwt from "jsonwebtoken";
import { handleError } from "../utils/errorHandling.js";

export const validateJWTToken = (req, res, next) => {
    try {
        const { authorization = "" } = req.cookies;
        const [, jwtToken] = authorization.split(" ");

        if (!jwtToken) {
            res.status(401);
            return res.json({
                status: "fail",
                message: "User not authorized",
            });
        }

        jwt.verify(jwtToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log("----------------XXXX------------");
                console.log(err);
                console.log("----------------XXXX------------");
                res.status(401);
                return res.json({
                    status: "fail",
                    message: "Invalid token",
                });
            }

            req.user = decoded;
            next();
        });
    } catch (err) {
        handleError("validateJWTToken", err, res);
    }
};
