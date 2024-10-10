import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./config/db.js";
import authRouter from "./Routers/authRouter.js";
import morgan from "morgan";
import otpRouter from "./Routers/otpRouter.js";
import userRequestRouter from "./Routers/userRequestRouter.js";
import adminRequestRouter from "./Routers/adminRequestRouter.js";
import { validateJWTToken } from "./middlewares/validateJWTMiddleWare.js";
import { validateIsAdmin } from "./middlewares/validateIsAdmin.js";

const port = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev"));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/otp", otpRouter);
app.use(validateJWTToken);
app.use("/api/v1/user-request", userRequestRouter);
app.use(validateIsAdmin);
app.use("/api/v1/admin", adminRequestRouter);

// app.get("/protected", (req, res) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     try {
//         const decodedToken = jwt.verify(token, "your-secret-key");
//         const userId = decodedToken.userId;
//         const user = users.find((user) => user.id === userId);
//         if (!user) {
//             return res.status(401).json({ message: "Unauthorized" });
//         }

//         res.json({ message: "You are authenticated" });
//     } catch (err) {
//         console.error(err);
//         res.status(401).json({ message: "Unauthorized" });
//     }
// });

app.listen(port, () => {
    console.log(`------------ Server listening on port ${port} ---------`);
});
