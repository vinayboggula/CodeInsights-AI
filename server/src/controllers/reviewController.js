import { analyzeCode } from "../services/pythonService.js";
import {
    getDashboardData,
    getReviewById,
    saveReview
} from "../services/reviewService.js";


//create review
export const createReview = async (req, res) => {
    try {
        const { code, language } = req.body;

        if (!code || code.trim() === "") {
            return res.status(400).json({
                success: false,
                error: "Code is required"
            });
        }

        const analysisResult = await analyzeCode(code, language);

        if (!analysisResult) {
            return res.status(500).json({
                success: false,
                error: "AI analysis failed"
            });
        }

        // 🟢 Save to DB (includes accuracy_score)
        const user_id = req.user.id; // Assuming auth middleware sets req.user

        const saved = await saveReview(user_id, code, analysisResult);

        return res.status(200).json({
            success: true,
            message: "Code analyzed successfully",
            data: saved
        });

    } catch (err) {
        console.error("❌ Create Review Error:", err.message);

        return res.status(500).json({
            success: false,
            error: "Failed to analyze code"
        });
    }
};


export const fetchDashboard = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: "Unauthorized"
            });
        }

        const user_id = req.user.id;

        const data = await getDashboardData(user_id); // ✅ FIXED

        return res.status(200).json({
            success: true,
            message: "Dashboard data fetched",
            data
        });

    } catch (err) {
        console.error("❌ Dashboard Error:", err.message);

        return res.status(500).json({
            success: false,
            error: "Failed to fetch dashboard"
        });
    }
};


export const fetchReview = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: "Unauthorized"
            });
        }

        if (!id) {
            return res.status(400).json({
                success: false,
                error: "Review ID is required"
            });
        }

        const user_id = req.user.id;

        const data = await getReviewById(id, user_id); // ✅ FIXED

        if (!data) {
            return res.status(404).json({
                success: false,
                error: "Review not found"
            });
        }

        return res.status(200).json({
            success: true,
            data
        });

    } catch (err) {
        console.error("❌ Fetch Review Error:", err.message);

        return res.status(500).json({
            success: false,
            error: "Failed to fetch review"
        });
    }
};