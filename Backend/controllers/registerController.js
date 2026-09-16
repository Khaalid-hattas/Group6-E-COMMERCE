import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../src/config/db.js";

const VALID_ROLES = ["customer", "creator"];

export async function registerUser(req, res) {
  const {
    full_name,
    email,
    password,
    role,
    phone,
    studio_name,
    location,
    bio,
  } = req.body;
  if (!full_name || !email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Full name, email, password and role are required" });
  }
  if (!VALID_ROLES.includes(role))
    return res
      .status(400)
      .json({ message: "role must be 'customer' or 'creator'" });
  if (role === "creator" && !studio_name)
    return res
      .status(400)
      .json({
        message: "studio_name is required when registering as a creator",
      });

  const connection = await db.getConnection();
  try {
    const [existingUsers] = await connection.execute(
      "SELECT id FROM users WHERE email = ?",
      [email],
    );
    if (existingUsers.length)
      return res.status(409).json({ message: "Email is already registered" });

    await connection.beginTransaction();
    const passwordHash = await bcrypt.hash(password, 10);
    const [result] = await connection.execute(
      "INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)",
      [full_name, email, passwordHash, role],
    );
    if (role === "customer") {
      await connection.execute(
        "INSERT INTO customers (user_id, phone) VALUES (?, ?)",
        [result.insertId, phone || null],
      );
    } else {
      await connection.execute(
        "INSERT INTO creators (user_id, studio_name, bio, location) VALUES (?, ?, ?, ?)",
        [result.insertId, studio_name, bio || null, location || null],
      );
    }
    await connection.commit();

    const token = jwt.sign(
      { id: result.insertId, role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "2h",
      },
    );
    return res
      .status(201)
      .json({
        message: "Registration successful",
        token,
        user: { id: result.insertId, full_name, email, role },
      });
  } catch (error) {
    await connection.rollback();
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Registration failed" });
  } finally {
    connection.release();
  }
}
