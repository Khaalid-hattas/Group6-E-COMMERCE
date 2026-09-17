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
            TIMESTAMPDIFF(YEAR, u.created_at, CURRENT_DATE) AS years,
            (
                (SELECT COUNT(*) FROM artwork a
                 WHERE a.creator_id = c.user_id AND a.status = 'active')
                +
                (SELECT COUNT(*) FROM handcraft h
                 WHERE h.creator_id = c.user_id AND h.status = 'active')
                +
                (SELECT COUNT(*) FROM handmade hm
                 WHERE hm.creator_id = c.user_id AND hm.status = 'active')
            ) AS pieces,
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
            TIMESTAMPDIFF(YEAR, u.created_at, CURRENT_DATE) AS years,
            (
                (SELECT COUNT(*) FROM artwork a
                 WHERE a.creator_id = c.user_id AND a.status = 'active')
                +
                (SELECT COUNT(*) FROM handcraft h
                 WHERE h.creator_id = c.user_id AND h.status = 'active')
                +
                (SELECT COUNT(*) FROM handmade hm
                 WHERE hm.creator_id = c.user_id AND hm.status = 'active')
            ) AS pieces,
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
