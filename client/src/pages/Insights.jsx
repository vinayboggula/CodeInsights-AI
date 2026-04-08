import { BarChart3, Brain, GitCompare } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/dashboard/Features";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import { useAppContext } from "../context/AppContext";

export default function HomePage() {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const { user } = useAppContext();

    useEffect(() => {
        setShow(true);
    }, []);
    return (
        <div className="h-screen absolute  inset-0 -z-10 items-center [background:radial-gradient(100%_100%_at_50%_30%,#FFFFFF_30%,#000_100%)]">
            {user ? <Layout /> : <Navbar />}
            <div className="flex text-black flex-col items-center justify-center text-center space-y-3 px-6 py-8">
                <img src="/codeInsigth.png" width={200} height={150} alt="" />
                <h1 className="text-4xl font-bold leading-tight max-w-3xl">
                    Analyze, Optimize & Understand Your Code Instantly
                </h1>
                <p className="text-black opacity-85 max-w-xl">
                    AI-powered code analysis with performance metrics,
                    complexity insights, and visual comparison dashboard.
                </p>
                <button onClick={() => navigate(user ? '/home/review' : '/login')} className='bg-black text-white opacity-80 italic font-medium text-mb  px-4 py-3 rounded-2xl'>Get insights</button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 px-8 pb-10">
                <FeatureCard
                    icon={<Brain />}
                    title="AI Code Review"
                    desc="Get optimized code with clear explanations"
                />
                <FeatureCard
                    icon={<BarChart3 />}
                    title="Metrics Dashboard"
                    desc="Analyze complexity, LOC, maintainability"
                />
                <FeatureCard
                    icon={<GitCompare />}
                    title="Visual Comparison"
                    desc="Before vs After insights with charts"
                />
            </div>
            <Footer />

        </div>
    );
}
