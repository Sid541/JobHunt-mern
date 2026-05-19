import dotenv from "dotenv"
dotenv.config({});

import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"

const app = express();

// ✅ CORS must be FIRST — before any other middleware
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "https://jobhunt-mern-3.onrender.com"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],       // ✅ added
    allowedHeaders: ["Content-Type", "Authorization"],          // ✅ added
}));

// ✅ Handle preflight requests explicitly for all routes
app.options("*", cors());

// Other middleware after CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.get("/test", (req, res) => {
    res.json({ 
        FRONTEND_URL: process.env.FRONTEND_URL,
        PORT: process.env.PORT
    });
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at port ${PORT}`);
});