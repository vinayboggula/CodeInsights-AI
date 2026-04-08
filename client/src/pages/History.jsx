import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import api from "../services/api";

export default function History() {

    const { user, navigate } = useAppContext();
    const [reviews, setReviews] = useState([]);

    function timeAgo(dateString) {
        const now = new Date();
        const past = new Date(dateString);

        const diff = Math.floor((now - past) / 1000);

        if (diff < 60) return "just now";

        const min = Math.floor(diff / 60);
        if (min < 60) return `${min} min${min > 1 ? "s" : ""} ago`;

        const hr = Math.floor(min / 60);
        if (hr < 24) return `${hr} hour${hr > 1 ? "s" : ""} ago`;

        const days = Math.floor(hr / 24);
        return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    const fetchReviews = async () => {
        try {
            const res = await api.get("/api/dashboard", { params: { userId: user.id } });
            setReviews(res.data.data.reviews);
            console.log("Fetched reviews:", res.data.data.reviews);
        }
        catch (err) {
            console.error("Error fetching reviews:", err.message);
        }
    };

    useEffect(() => {
        if (user?.id) {
            fetchReviews();
        }
    }, [user]);

    return (
        <div className="w-[50%] h-[90%] rounded-xl bg-neutral-900 p-4 overflow-y-scroll">
            <h1 className="text-xl mb-4 font-semibold text-white">History</h1>
            <div className="w-full h-[90%] rounded-xl bg-neutral-900 p-2 overflow-y-scroll">
                {reviews.length === 0 ? (
                    <p className="text-gray-400">No history yet</p>
                ) : (reviews.map((r) => (
                    <div key={r.id} onClick={() => navigate(`/home/review/${r.id}`)} className="text-white bg-black opacity-90 text-mb border p-3 rounded-2xl mb-2">
                        <div className="flex justify-between items-center text-mb  mb-2">
                            <p className="h-6 w-100 overflow-scroll">{r.original_code}</p>
                            <p>
                                Maintainability: {r.original_metrics.maintainability_score} →{" "}
                                {r.optimized_metrics?.maintainability_score}
                            </p>
                        </div>

                        <div className="flex justify-between items-center text-neutral-600 text-sm">
                            <p>{timeAgo(r.created_at)}</p>
                            <p>Accuracy: {r.accuracy_score}</p>
                        </div>


                    </div>
                )))}
            </div>
        </div>
    );
}