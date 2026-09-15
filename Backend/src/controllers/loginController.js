import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

export async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  try {
    const [users] = await db.execute(
      "SELECT id, full_name, email, password_hash, role FROM users WHERE email = ?",
      [email],
    );
    if (
      !users.length ||
      !(await bcrypt.compare(password, users[0].password_hash))
    ) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = users[0];
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "2h",
      },
    );
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Login failed" });
  }
}
