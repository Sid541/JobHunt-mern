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

// ⚙️ Robust CORS Configuration Options
const corsOptions = {
    origin: function(origin, callback) {
        // Dynamically allows any domain to hit your server during testing/deployment
        callback(null, true);
    },
    credentials: true, // Required to let cookies pass between frontend and backend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
};

// Apply CORS to standard requests
app.use(cors(corsOptions));

// 🚨 CRITICAL FIX: Handle browser preflight OPTIONS requests globally
app.options("*", cors(corsOptions));

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