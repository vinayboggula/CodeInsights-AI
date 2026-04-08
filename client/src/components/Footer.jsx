import { useNavigate } from "react-router-dom"

const Footer = () => {
    const navigate = useNavigate()

    return (
        <footer className="text-center px-6 md:px-16 bg-black lg:px-24 xl:px-32">

            <p onClick={() => navigate("/")} className="py-4 text-center text-sm text-gray-300">
                © 2025 CodeInsight AI. All rights reserved.
            </p>

        </footer>
    )
}

export default Footer
