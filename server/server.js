import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./src/routes/authRoutes.js";
import reviewRouter from "./src/routes/reviewRoutes.js";
dotenv.config();



const app = express();

console.log("API URL:", process.env.FRONTEND_URL);

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173"
].filter(Boolean); // removes undefined

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/api", reviewRouter);

app.get("/", (req, res) => {
    res.send("Welcome to the Book Review API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});