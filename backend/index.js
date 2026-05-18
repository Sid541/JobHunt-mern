import cookieParser from "cookie-parser";
import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv"
dotenv.config({});
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const allowedOrigins = [
    process.env.FRONTEND_URL,              // production frontend URL from env
    "http://localhost:5173",               // local development
    "https://jobhunt-mern-3.onrender.com"  // your live frontend URL
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

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