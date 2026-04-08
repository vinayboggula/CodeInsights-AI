import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAppContext();

    if (loading) return <p>Loading...</p>;

    return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;