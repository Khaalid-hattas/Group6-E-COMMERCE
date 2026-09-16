import db from "../config/db.js";

export async function getMe(req, res) {
  try {
    const [rows] = await db.query(
      "SELECT id, full_name, email, role FROM users WHERE id = ?",
      [req.user.id],
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = rows[0];

    if (user.role === "creator") {
      const [creatorRows] = await db.query(
        "SELECT studio_name, bio, location FROM creators WHERE user_id = ?",
        [user.id],
      );
      user.creator = creatorRows[0] || null;
    }

    if (user.role === "customer") {
      const [customerRows] = await db.query(
        "SELECT phone FROM customers WHERE user_id = ?",
        [user.id],
      );
      user.customer = customerRows[0] || null;
    }

    return res.json({ user });
  } catch (error) {
    console.error("Load authenticated user error:", error);
    return res.status(500).json({ message: "Could not load user." });
  }
}
