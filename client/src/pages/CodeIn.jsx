import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import api from "../services/api";
import History from "./History";
import Profile from "./Profile";

const CodeIn = () => {
    const { user, setUser } = useAppContext();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await api.post("/auth/logout");
            setUser(null);
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>

            <div className="h-screen w-screen px-4 py-2 bg-gradient-to-br from-neutral-900 via-black to-neutral-800">
                <div className="flex justify-between items-center px-8 py-3" >
                    <div onClick={() => navigate("/home")} className="flex justify-center items-center gap-2 cursor-zoom-in ">
                        <img src="/codeInsigth.png" className="invert" width={40} height={40} alt="codeInsight AI" />
                        <span className="text-2xl text-white font-bold ">
                            CodeInsights <span className="text-neutral-400">AI</span>
                        </span>
                    </div>

                    <button onClick={logout} className="bg-gray-100 text-black px-6 py-1 rounded-4xl font-semibold hover:bg-gray-200 border-2 border-black">
                        Logout
                    </button>
                </div >
                <div className="flex w-[98%] mx-auto h-[90%] px-8 bg-black items-center justify-center gap-10 border border-white rounded-4xl flex-col md:flex-row">
                    <Profile />
                    <History />
                </div>
            </div>
        </>
    )
}

export default CodeIn
