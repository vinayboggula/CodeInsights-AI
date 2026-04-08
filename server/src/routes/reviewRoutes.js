import express from "express";
import {
    createReview,
    fetchDashboard,
    fetchReview
} from "../controllers/reviewController.js";

import { isAuth } from "../middleware/authMiddleware.js";

const reviewRouter = express.Router();


reviewRouter.post("/review", isAuth, createReview);


reviewRouter.get("/dashboard", isAuth, fetchDashboard);


reviewRouter.get("/review/:id", isAuth, fetchReview);


export default reviewRouter;