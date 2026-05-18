import dotenv from "dotenv"
dotenv.config({});  // ← FIRST before everything

import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"

const app = express();

// Core Body & Cookie Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin:"https://jobhunt-mern-3.onrender.com",
    credentials :true
}))



const PORT = process.env.PORT || 3000;

app.get("/test", (req, res) => {
    res.json({ 
        FRONTEND_URL: process.env.FRONTEND_URL,
        PORT: process.env.PORT
    });
});

// API Routing Paths
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at port ${PORT}`);
});