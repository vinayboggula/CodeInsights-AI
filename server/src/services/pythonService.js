import axios from "axios";
import dotenv from "dotenv";

dotenv.config()

export const analyzeCode = async (code, language) => {
    try {
        const res = await axios.post(`${process.env.PYTHON_SERVER_URL}/analyze`,
            { code, language }
        );

        return res.data;
    } catch (err) {
        console.error("Python Service Error:", err.message);

        throw new Error("Python service failed");
    }
};