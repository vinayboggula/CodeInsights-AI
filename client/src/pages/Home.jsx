import { useEffect, useState } from "react";
import HomePage from "./Insights";
import Landing from "./Landing";

const Home = () => {
    const [showLanding, setShowLanding] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLanding(false);
        }, 1500); // 3 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {showLanding ? <Landing /> : <HomePage />}
        </>
    );
};

export default Home;