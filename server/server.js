import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./src/routes/authRoutes.js";
import reviewRouter from "./src/routes/reviewRoutes.js";
dotenv.config(); // MUST be first



const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/api", reviewRouter);

app.listen(5000, () => {
    console.log("Server running on port 5000");
    console.log("DB URL:", process.env.DATABASE_URL);
    console.log("JWT Secret:", process.env.JWT_SECRET);
});