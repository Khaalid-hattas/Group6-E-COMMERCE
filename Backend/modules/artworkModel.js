import pool from '../config/db.js';

const getAllArtwork = async () => {
    const [rows] = await pool.query(`
        SELECT
            a.id,
            a.name,
            a.description,
            a.medium,
            a.dimensions,
            a.edition,
            a.price,
            a.stock_quantity,
            a.image_url,
                a.status,
                a.style_category,
            c.user_id AS creator_id,
            c.studio_name AS creator_name,
            c.location AS creator_location
        FROM artwork a
        JOIN creators c ON a.creator_id = c.user_id
        ORDER BY a.created_at DESC
    `);

    return rows;
};

const getArtworkById = async (id) => {
    const [rows] = await pool.query(`
        SELECT
            a.id,
            a.name,
            a.description,
            a.medium,
            a.dimensions,
            a.edition,
            a.price,
            a.stock_quantity,
            a.image_url,
                a.status,
                a.style_category,
            c.user_id AS creator_id,
            c.studio_name AS creator_name,
            c.location AS creator_location
        FROM artwork a
        JOIN creators c ON a.creator_id = c.user_id
        WHERE a.id = ?
    `, [id]);

    return rows[0];
};

const createArtwork = async (artwork) => {
    const {
        creator_id,
        category_id,
        name,
        description,
        medium,
        dimensions,
        edition,
        price,
        stock_quantity,
        image_url,
        status
    } = artwork;

    const [result] = await pool.query(`
        INSERT INTO artwork
        (
            creator_id,
            category_id,
            name,
            description,
            medium,
            dimensions,
            edition,
            price,
            stock_quantity,
            image_url,
            status,
            style_category
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        creator_id,
        category_id,
        name,
        description,
        medium,
        dimensions,
        edition,
        price,
        stock_quantity,
        image_url,
        status || 'active',
        artwork.style_category
    ]);

    return result.insertId;
};

const updateArtwork = async (id, artwork) => {
    const {
        category_id,
        name,
        description,
        medium,
        dimensions,
        edition,
        price,
        stock_quantity,
        image_url,
        status
    } = artwork;

    const [result] = await pool.query(`
        UPDATE artwork
        SET
            category_id = ?,
            name = ?,
            description = ?,
            medium = ?,
            dimensions = ?,
            edition = ?,
            price = ?,
            stock_quantity = ?,
            image_url = ?,
                status = ?,
                style_category = ?
        WHERE id = ?
    `, [
        category_id,
        name,
        description,
        medium,
        dimensions,
        edition,
        price,
        stock_quantity,
        image_url,
        status,
        artwork.style_category,
        id
    ]);

    return result.affectedRows;
};

const deleteArtwork = async (id) => {
    const [result] = await pool.query(
        'DELETE FROM artwork WHERE id = ?',
        [id]
    );

    return result.affectedRows;
};

export {
    getAllArtwork,
    getArtworkById,
    createArtwork,
    updateArtwork,
    deleteArtwork
};
