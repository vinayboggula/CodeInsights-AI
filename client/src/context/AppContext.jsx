import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);


    const getMe = async () => {

        try {

            const { data } = await api.get("/auth/me");

            setUser(data.user);

        } catch (err) {

            setUser(null);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        getMe();

    }, []);


    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                loading,
                getMe,
                navigate
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);