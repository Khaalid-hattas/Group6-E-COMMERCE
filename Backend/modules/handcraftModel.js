import pool from '../config/db.js';

const getAllHandcraft = async () => {
    const [rows] = await pool.query(`
        SELECT
            h.id,
            h.name,
            h.description,
            h.material,
            h.product_type,
            h.price,
            h.stock_quantity,
            h.image_url,
            h.status,
            cat.name AS category_name,
            c.user_id AS creator_id,
            c.studio_name AS creator_name,
            c.location AS creator_location
        FROM handcraft h
        JOIN creators c ON h.creator_id = c.user_id
        JOIN categories cat ON h.category_id = cat.id
        ORDER BY h.created_at DESC
    `);

    return rows;
};

const getHandcraftById = async (id) => {
    const [rows] = await pool.query(`
        SELECT
            h.id,
            h.name,
            h.description,
            h.material,
            h.product_type,
            h.price,
            h.stock_quantity,
            h.image_url,
            h.status,
            cat.name AS category_name,
            c.user_id AS creator_id,
            c.studio_name AS creator_name,
            c.location AS creator_location
        FROM handcraft h
        JOIN creators c ON h.creator_id = c.user_id
        JOIN categories cat ON h.category_id = cat.id
        WHERE h.id = ?
    `, [id]);

    return rows[0];
};

const createHandcraft = async (handcraft) => {
    const {
        creator_id,
        category_id,
        name,
        description,
        material,
        product_type,
        price,
        stock_quantity,
        image_url,
        status
    } = handcraft;

    const [result] = await pool.query(`
        INSERT INTO handcraft
        (creator_id, category_id, name, description, material, product_type, price, stock_quantity, image_url, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [creator_id, category_id, name, description, material, product_type, price, stock_quantity, image_url, status || 'active']);

    return result.insertId;
};

const updateHandcraft = async (id, handcraft) => {
    const { category_id, name, description, material, product_type, price, stock_quantity, image_url, status } = handcraft;
    const [result] = await pool.query(`
        UPDATE handcraft
        SET category_id = ?, name = ?, description = ?, material = ?, product_type = ?, price = ?, stock_quantity = ?, image_url = ?, status = ?
        WHERE id = ?
    `, [category_id, name, description, material, product_type, price, stock_quantity, image_url, status, id]);
    return result.affectedRows;
};

const deleteHandcraft = async (id) => {
    const [result] = await pool.query('DELETE FROM handcraft WHERE id = ?', [id]);
    return result.affectedRows;
};

export {
    getAllHandcraft,
    getHandcraftById,
    createHandcraft,
    updateHandcraft,
    deleteHandcraft
};
