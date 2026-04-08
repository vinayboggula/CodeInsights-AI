import pool from "../config/db.js";



export const saveReview = async (user_id, code, result) => {
    const query = `
    INSERT INTO reviews 
    (
        user_id,
        original_code,
        optimized_code,
        original_metrics,
        optimized_metrics,
        improvement_summary,
        accuracy_score
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `;

    const values = [
        user_id, 
        code,
        result.optimized.code,
        JSON.stringify(result.original.metrics),
        JSON.stringify(result.optimized.metrics),
        JSON.stringify(result.improvement_summary),
        result.improvement_summary?.accuracy_score || 0
    ];

    const res = await pool.query(query, values);
    return res.rows[0];
};

export const getDashboardData = async (user_id) => {


    const reviewsRes = await pool.query(`
        SELECT 
            id,
            original_code,
            created_at,
            accuracy_score,
            original_metrics,
            optimized_metrics
        FROM reviews
        WHERE user_id = $1
        ORDER BY created_at DESC
    `, [user_id]);


    const avgRes = await pool.query(`
        SELECT AVG(accuracy_score) AS avg_accuracy 
        FROM reviews
        WHERE user_id = $1
    `, [user_id]);

  
    const bestRes = await pool.query(`
        SELECT MAX(accuracy_score) AS best_score 
        FROM reviews
        WHERE user_id = $1
    `, [user_id]);

    return {
        reviews: reviewsRes.rows,
        average_accuracy: Number(avgRes.rows[0].avg_accuracy) || 0,
        best_score: bestRes.rows[0].best_score || 0
    };
};


export const getReviewById = async (id, user_id) => {
    const res = await pool.query(
        "SELECT * FROM reviews WHERE id = $1 AND user_id = $2",
        [id, user_id]
    );

    return res.rows[0];
};