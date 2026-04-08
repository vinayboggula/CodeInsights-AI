import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import api from "../services/api";



const Profile = () => {

    const { user } = useAppContext();
    const [reviews, setReviews] = useState([]);
    const [averageAccuracy, setAverageAccuracy] = useState(0);
    const [accuracy, setAccuracy] = useState(0);

    const fetchAccuracy = async () => {
        try {
            const res = await api.get("/api/dashboard", { params: { userId: user.id } });
            setReviews(res.data.data.reviews);
            setAccuracy(res.data.data.best_score);
            setAverageAccuracy(res.data.data.average_accuracy);
            console.log("Fetched reviews:", res.data.data.reviews);
            console.log("Fetched accuracy:", res.data.data.average_accuracy);
            console.log("Fetched best accuracy:", res.data.data);
        }
        catch (err) {
            console.error("Error fetching reviews:", err.message);
        }
    };

    useEffect(() => {
        if (user?.id) {
            fetchAccuracy();
        }
    }, [user])

    return (
        <div className='w-[50%] h-[90%] flex flex-col space-y-6 p-2'>
            {/* <div className="flex items-center gap-2">
                <img src="../codeInsigth.png" width={60} height={60} className="invert" alt="codeInsight AI" />
                <p className="text-white text-2xl font-bold">CodeInsights <span className="text-neutral-500">AI</span></p>
            </div> */}
            <div className="flex flex-col italic items-center space-y-4 py-20">
                <h1 className="text-4xl text-white">Welcome, {user?.name || "User"}!</h1>
                <p className="text-white text-xl">Total Reviews: {reviews.length}</p>
                <div className="flex flex-col italic items-center space-y-4">
                    <p className="text-neutral-400 text-xl">Avg Accuracy:</p>
                    <h1 className={Number(averageAccuracy) > 75 ? "text-7xl font-bold text-green-600" : "text-3xl font-bold text-red-600"}>{user ? parseInt(averageAccuracy) : 0}%</h1>
                </div>
                <p className="text-green-600 text-lg">Best Accuracy: {user ? accuracy : 0} %</p>
            </div>

            <div></div>
        </div>
    )
}

export default Profile
