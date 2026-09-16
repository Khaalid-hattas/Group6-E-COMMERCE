import { query } from "../config/db.js";

/**
 * Get all categories
 */
export async function getAllCategories() {
  const sql = `SELECT * FROM categories ORDER BY name ASC`;
  return query(sql);
}

/**
 * Get category by ID
 */
export async function getCategoryById(id) {
  const sql = `SELECT * FROM categories WHERE id = ? LIMIT 1`;
  const rows = await query(sql, [id]);
  return rows[0] || null;
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(slug) {
  const sql = `SELECT * FROM categories WHERE slug = ? LIMIT 1`;
  const rows = await query(sql, [slug]);
  return rows[0] || null;
}

export default {
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
};

