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

// Static Allowed Origins Array
const allowedOrigins = [
    process.env.FRONTEND_URL,          // Your main production Vercel link
    "http://localhost:5173"            // Your local development server address
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman, or server-to-server)
        if (!origin) return callback(null, true);
        
        // Dynamic Check: Allow exact matches OR any branch preview url containing "vercel.app"
        if (allowedOrigins.includes(origin) || origin.includes("vercel.app")) {
            return callback(null, true);
        } else {
            return callback(new Error(`CORS policy restriction. Origin: ${origin} not allowed.`));
        }
    },
    credentials: true, // Crucial for passing secure token cookies between different domains
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

// Apply CORS options to all standard incoming requests
app.use(cors(corsOptions));

// Explicitly handle browser CORS preflight OPTIONS handshakes globally
app.options("*", cors(corsOptions));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Server Instantiation
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running safely on port ${PORT}`);
});