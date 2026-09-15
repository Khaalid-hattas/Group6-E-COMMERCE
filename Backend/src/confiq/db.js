import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database connection pool
export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "artisanhub",
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});

/**
 * Execute a SQL query with parameters
 */
export async function query(sql, params = []) {
  try {
    const [results] = await pool.query(sql, params);
    return results;
  } catch (error) {
    console.error("Database query error:", error.message);
    throw error;
  }
}

/**
 * Run the ArtisanHub.sql script if database needs to be initialized
 */
export async function initializeDatabase() {
  const sqlFilePath = path.resolve(__dirname, "../sql/ArtisanHub.sql");

  if (!fs.existsSync(sqlFilePath)) {
    console.warn("ArtisanHub.sql not found at:", sqlFilePath);
    return false;
  }

  try {
    // Check connection without selecting DB first
    const rootConnection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      port: Number(process.env.DB_PORT) || 3306,
      multipleStatements: true,
    });

    console.log("Connected to MySQL server. Executing ArtisanHub.sql schema...");
    const sqlContent = fs.readFileSync(sqlFilePath, "utf8");
    await rootConnection.query(sqlContent);
    await rootConnection.end();

    console.log("ArtisanHub database initialized and seeded successfully!");
    return true;
  } catch (err) {
    console.warn("Could not automatically initialize MySQL database:", err.message);
    return false;
  }
}

/**
 * Test MySQL connection
 */
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log(`Connected to MySQL database [${process.env.DB_NAME || "artisanhub"}] on port ${process.env.DB_PORT || 3306}`);
    connection.release();
    return true;
  } catch (err) {
    console.warn(`MySQL connection notice: ${err.message}. Ensure MySQL server is running if using live database.`);
    return false;
  }
}

export default {
  pool,
  query,
  testConnection,
  initializeDatabase,
};

