import pool from "./config/db.js";

async function testDB() {
    try {
        const res = await pool.query("SELECT NOW()");
        console.log("DB Connected ✅");
        console.log(res.rows[0]);
    } catch (err) {
        console.error(err);
    }
}

testDB();