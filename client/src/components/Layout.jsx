import { useNavigate } from "react-router-dom"

const Layout = () => {
    const navigate = useNavigate()
    return (
        <div className="flex justify-between items-center px-8 py-3 border-b border-gray-800" >
            <div onClick={() => { navigate("/") }} className="flex justify-center items-center gap-1">
                <img src="/codeInsigth.png" width={30} height={40} alt="" />
                <span className="text-2xl font-bold text-black cursor-zoom-in">
                    CodeInsight AI
                </span>
            </div>

            <button onClick={() => navigate("/home/codeIn")} className="bg-gray-100 text-black px-6 py-1 rounded-4xl font-semibold hover:bg-gray-200 border-2 border-black">
                Dashboard
            </button>
        </div >
    )
}

export default Layout

