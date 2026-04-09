import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, getUserSafeData } from "../services/authServices.js";
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

        const { email, name } = payload;


        let user = await findUserByEmail(email);

        if (!user) {
            user = await createUser(name, email, null);
        }


        const jwtToken = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );


        res.cookie("token", jwtToken, {
            httpOnly: true,
            sameSite: "None",
            secure: process.env.NODE_ENV === "production",
        });

        return res.json({
            success: true,
            message: "Google login successful"
        });

    } catch (err) {
        console.error("Google Auth Error:", err);

        res.status(500).json({
            success: false,
            message: "Google authentication failed"
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await getUserSafeData(req.user.id);

        res.json({
            success: true,
            user
        });
    } catch {
        res.status(500).json({ success: false });
    }
};

export const signUp = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Fill all fields"
        });
    }

    try {
        const existingUser = await findUserByEmail(email)

        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await createUser(name, email, hashedPassword)

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "None",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(201).json({ success: true, message: "Account created!" })
    } catch (err) {
        return res.status(500).json({ success: false, message: "User creation failed", err: err.message })
    }
}


//login
export const login = async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "fill in all fields" })
        }

        const user = await findUserByEmail(email)

        if (!user) {
            return res.status(400).json({ success: false, message: " Invalid email" })
        }
        console.log("User found:", password, user) // Debugging line
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "None",
            secure: process.env.NODE_ENV === "production"
        });


        return res.status(200).json({ success: true, message: "Login successful", user })
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}

export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "None",
        secure: process.env.NODE_ENV === "production"
    });

    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};