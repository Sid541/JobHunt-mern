import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Exact Production URLs & Local workspace addresses
const allowedOrigins = [
    process.env.FRONTEND_URL,                                                      // Main Production Link
    "https://job-hunt-mern-z346-eivp9vfrj-sid541s-projects.vercel.app",           // This specific Vercel URL
    "http://localhost:5173"                                                        // Local Development Work space
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow server-to-server or development requests without origin headers
        if (!origin) return callback(null, true);
        
        // Match the origin against our allowed array lists
        if (allowedOrigins.includes(origin) || allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        } else {
            return callback(new Error("Request origin blocked by server security CORS policy"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Server Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running cleanly via process.env on port ${PORT}`);
});