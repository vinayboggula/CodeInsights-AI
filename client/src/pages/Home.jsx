import { useEffect, useState } from "react";
import HomePage from "./Insights";
import Landing from "./Landing";

const Home = () => {
    const [showLanding, setShowLanding] = useState(true);
    console.log(import.meta.env.VITE_API_URL)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLanding(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {showLanding ? <Landing /> : <HomePage />}
        </>
    );
};

export default Home;