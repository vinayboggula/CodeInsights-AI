const FeatureCard = ({ icon, title, desc }) => {
    return (
        <div className="p-4 border-2 flex flex-col items-center text-black  border-black rounded-xl bg-gray-50 hover:font-semibold transition">

            {/* 🔥 ICON */}
            <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                {icon}
            </div>


            <p className="text-black opacity-90">{desc}</p>
        </div>
    );
}

export default FeatureCard