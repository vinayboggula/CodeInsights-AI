import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";
import AIExplanation from "../components/dashboard/AIExplanation";
import ComparisonCharts from "../components/dashboard/ComparisonCharts";
import MetricsDashboard from "../components/dashboard/MetricsDashboard";
import OptimizedCodeView from "../components/dashboard/OptimizedCodeView";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import api from "../services/api";


export default function ReviewPage() {
    const [code, setCode] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { user } = useAppContext();


    const { reviewId } = useParams();


    const reviewData = async () => {
        try {
            const res = await api.get(`/api/review/${reviewId}`);

            if (!res.data?.data) {
                return setError("Review not found");
            }

            setResult(res.data.data);
            console.log("Fetched review data:", res.data.data);

        } catch (err) {
            console.error(err);
            setError("Failed to fetch review");
        }
    };

    const handleAnalyze = async () => {
        if (!code.trim()) {
            setError("Please enter code first");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            console.log("Calling API...");

            const res = await api.post("/api/review", {
                language: "python",
                code,
            });

            console.log("Response:", res);

            setResult(res.data.data);
        } catch (err) {
            console.error("Frontend Error:", err.response?.data || err.message);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("Review ID:", reviewId);
        console.log("User:", user);

        if (reviewId && user?.id) {
            reviewData();
        }
    }, [reviewId, user]);


    return (
        <>
            <div className="bg-black opacity-90 h-screen min-w-screen overflow-scroll">
                <div className="p-6 space-y-6  bg-gray-50 w-[96%] mx-auto px-4 my-4 rounded-xl ">
                    <p className="text-center font-semibold">Review your Code and get Insights</p>
                    <CodeEditor className="h-[90%]" code={result?.original_code || code} setCode={setCode} />

                    <button
                        onClick={handleAnalyze}
                        className="bg-blue-700 px-4 font-semibold hover:opacity-80 py-2 rounded-lg"
                    >
                        {loading ? "Analyzing..." : "Analyze Code"}
                    </button>

                    {error && <p className="text-red-600 font-semibold">{error}</p>}

                    {result?.original_metrics && result?.optimized_metrics && (
                        <>
                            <ComparisonCharts data={result} />
                            <MetricsDashboard data={result} />

                            <AIExplanation
                                explanation={result?.ai_explanation}
                                summary={result?.improvement_summary}
                            />
                            <OptimizedCodeView code={result?.optimized_code} />
                        </>
                    )}
                </div>
                <Footer />
            </div>

        </>
    );
}