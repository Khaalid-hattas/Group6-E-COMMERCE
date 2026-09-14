const pool = require('../config/db');

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
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        status || 'active'
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
            status = ?
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

module.exports = {
    getAllArtwork,
    getArtworkById,
    createArtwork,
    updateArtwork,
    deleteArtwork
};