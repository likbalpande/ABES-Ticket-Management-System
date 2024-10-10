import mongoose from "mongoose";

const mongoURL = process.env.MONGODB_URL.replace("<USERNAME>", process.env.MONGODB_USERNAME)
    .replace("<PASSWORD>", process.env.MONGODB_PASSWORD)
    .replace("<DATABASE_NAME>", process.env.MONGODB_DATABASE_NAME);

mongoose
    .connect(mongoURL, {
        connectTimeoutMS: 60000,
        socketTimeoutMS: 60000,
    })
    .then(() => {
        console.log("---------------- Database Connected! ---------------");
    })
    .catch((err) => {
        console.log("------------------------");
        console.log("--- Mongo DB connection Error !!!! ---");
        console.log("------------------------");
    });
