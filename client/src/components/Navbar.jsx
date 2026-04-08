import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div className="flex justify-between items-center px-8 py-3" >
            <div onClick={() => { navigate("/") }} className="flex justify-center items-center gap-1">
                <img src="/codeInsigth.png" width={30} height={40} alt="" />
                <span className="text-2xl font-bold text-black cursor-pointer">
                    CodeInsights AI
                </span>
            </div>

            <button onClick={() => navigate("/signup")} className="bg-gray-100 text-black px-6 py-1 rounded-4xl font-semibold hover:bg-gray-200 border-2 border-black">
                Try Now
            </button>
        </div >
    )
}

export default Navbar
