import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./src/routes/authRoutes.js";
import reviewRouter from "./src/routes/reviewRoutes.js";
dotenv.config();



const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/api", reviewRouter);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});