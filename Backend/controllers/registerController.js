const bcrypt = require('bcryptjs');
const db = require('../config/db');

async function registerUser(req, res) {
    const { full_name, email, password, phone } = req.body;

    // Basic validation
    if (!full_name || !email || !password) {
        return res.status(400).json({
            message: 'Full name, email and password are required'
        });
    }

    const connection = await db.getConnection();

    try {
        // Check whether email already exists
        const [existingUsers] = await connection.execute(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({
                message: 'Email is already registered'
            });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        await connection.beginTransaction();

        // Create user
        const [userResult] = await connection.execute(
            `INSERT INTO users (full_name, email, password_hash, role)
             VALUES (?, ?, ?, ?)`,
            [full_name, email, passwordHash, 'customer']
        );

        // Create customer record
        await connection.execute(
            `INSERT INTO customers (user_id, phone)
             VALUES (?, ?)`,
            [userResult.insertId, phone || null]
        );

        await connection.commit();

        return res.status(201).json({
            message: 'Registration successful'
        });

    } catch (error) {
        await connection.rollback();

        console.error('Registration error:', error);

        return res.status(500).json({
            message: 'Registration failed'
        });

    } finally {
        connection.release();
    }
}

module.exports = {
    registerUser
};