import { query } from "../config/db.js";

/**
 * Find user by email
 */
export async function findByEmail(email) {
  const sql = `
    SELECT u.*, 
           c.phone,
           cr.studio_name, cr.bio, cr.location, cr.avatar_url, cr.primary_category_id
    FROM users u
    LEFT JOIN customers c ON c.user_id = u.id
    LEFT JOIN creators cr ON cr.user_id = u.id
    WHERE u.email = ?
    LIMIT 1
  `;
  const rows = await query(sql, [email]);
  return rows[0] || null;
}

/**
 * Find user by ID
 */
export async function findById(id) {
  const sql = `
    SELECT u.id, u.full_name, u.email, u.role, u.created_at,
           c.phone,
           cr.studio_name, cr.bio, cr.location, cr.avatar_url, cr.primary_category_id
    FROM users u
    LEFT JOIN customers c ON c.user_id = u.id
    LEFT JOIN creators cr ON cr.user_id = u.id
    WHERE u.id = ?
    LIMIT 1
  `;
  const rows = await query(sql, [id]);
  return rows[0] || null;
}

/**
 * Create a new customer account
 */
export async function createCustomer({ full_name, email, password_hash, phone = null }) {
  const insertUserSql = `
    INSERT INTO users (full_name, email, password_hash, role)
    VALUES (?, ?, ?, 'customer')
  `;
  const userResult = await query(insertUserSql, [full_name, email, password_hash]);
  const userId = userResult.insertId;

  const insertCustomerSql = `
    INSERT INTO customers (user_id, phone)
    VALUES (?, ?)
  `;
  await query(insertCustomerSql, [userId, phone]);

  return findById(userId);
}

/**
 * Create a new creator account
 */
export async function createCreator({
  full_name,
  email,
  password_hash,
  studio_name,
  bio = null,
  location = null,
  primary_category_id = null,
  avatar_url = null,
}) {
  const insertUserSql = `
    INSERT INTO users (full_name, email, password_hash, role)
    VALUES (?, ?, ?, 'creator')
  `;
  const userResult = await query(insertUserSql, [full_name, email, password_hash]);
  const userId = userResult.insertId;

  const insertCreatorSql = `
    INSERT INTO creators (user_id, studio_name, bio, location, primary_category_id, avatar_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  await query(insertCreatorSql, [
    userId,
    studio_name || full_name,
    bio,
    location,
    primary_category_id,
    avatar_url,
  ]);

  return findById(userId);
}

export default {
  findByEmail,
  findById,
  createCustomer,
  createCreator,
};

