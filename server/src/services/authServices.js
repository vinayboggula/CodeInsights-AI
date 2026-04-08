import pool from "../config/db.js";

export const createUser = async (name, email, hashedPassword) => {

    const res = await pool.query("INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING*",
        [name, email, hashedPassword]
    );

    return res.rows[0]
};

export const findUserByEmail = async (email) => {
    const res = await pool.query("SELECT * FROM users WHERE email = $1", [email])

    return res.rows[0]
};

export const getUserSafeData = async (id) => {
    try {
        const res = await pool.query(
            "SELECT id, name, email FROM users WHERE id = $1",
            [id]
        );

        return res.rows[0];

    } catch (err) {
        console.error("❌ GetUser DB Error:", err.message);
        throw err;
    }
};