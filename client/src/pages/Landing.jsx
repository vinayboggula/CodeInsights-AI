import { useEffect, useState } from "react";

const Landing = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    return (

        <div className="absolute  inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(40%_95%_at_50%_10%,#FFFFFF_10%,#000_100%)]">
            <div className={`relative group flex flex-col space-y-10 justify-center items-center transform transition-all duration-500 ease-linear
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <img src="/codeInsigth.png" width={200} height={150} alt="" />
                <div className={`flex flex-col justify-center items-center gap-2 absolute transition-all duration-1000 ${show ? "opacity-100 translate-y-40" : "opacity-0 translate-y-0"} `}>
                    <h1 className=" text-black text-4xl font-semibold ">CodeInsights AI</h1>
                    <p className="text-white opacity-80 italic">AI-powered code review with real-time metrics, complexity analysis, and performance insights.</p>
                </div>

            </div>
        </div>

    )
}

export default Landing
