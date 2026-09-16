import pool from '../config/db.js';

const getAllCreators = async () => {
    const [rows] = await pool.query(`
        SELECT
            c.user_id,
            c.studio_name,
            c.bio,
            c.location,
            c.avatar_url,
            c.primary_category_id,
            u.full_name,
            u.email
        FROM creators c
        JOIN users u ON c.user_id = u.id
    `);

    return rows;
};

const getCreatorById = async (id) => {
    const [rows] = await pool.query(`
        SELECT
            c.user_id,
            c.studio_name,
            c.bio,
            c.location,
            c.avatar_url,
            c.primary_category_id,
            u.full_name,
            u.email
        FROM creators c
        JOIN users u ON c.user_id = u.id
        WHERE c.user_id = ?
    `, [id]);

    return rows[0];
};

export {
    getAllCreators,
    getCreatorById
};
