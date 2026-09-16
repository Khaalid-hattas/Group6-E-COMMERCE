import db from "../config/db.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORBIDDEN_FIELDS = new Set([
  "id",
  "user_id",
  "role",
  "password",
  "password_hash",
]);
const COMMON_FIELDS = new Set(["full_name", "email"]);
const PROFILE_FIELDS = new Set(["phone", "studio_name", "bio", "location"]);

async function loadUserProfile(connection, userId) {
  const [rows] = await connection.query(
    "SELECT id, full_name, email, role FROM users WHERE id = ?",
    [userId],
  );
  if (rows.length === 0) return null;

  const user = rows[0];
  if (user.role === "creator") {
    const [creatorRows] = await connection.query(
      "SELECT studio_name, bio, location FROM creators WHERE user_id = ?",
      [user.id],
    );
    user.creator = creatorRows[0] || null;
  } else if (user.role === "customer") {
    const [customerRows] = await connection.query(
      "SELECT phone FROM customers WHERE user_id = ?",
      [user.id],
    );
    user.customer = customerRows[0] || null;
  }
  return user;
}

function validText(value, maxLength) {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.trim().length <= maxLength
  );
}

export async function getUserProfile(req, res) {
  try {
    const user = await loadUserProfile(db, req.user.id);
    if (!user) return res.status(404).json({ message: "User not found." });
    return res.json({ user });
  } catch (error) {
    console.error("Load profile error:", error);
    return res.status(500).json({ message: "Could not load user profile." });
  }
}

export async function updateUserProfile(req, res) {
  const body = req.body || {};
  const fields = Object.keys(body);
  const forbidden = fields.find((field) => FORBIDDEN_FIELDS.has(field));
  if (forbidden) {
    return res
      .status(400)
      .json({
        message: `${forbidden} cannot be changed through profile updates.`,
      });
  }
  const unknown = fields.find(
    (field) => !COMMON_FIELDS.has(field) && !PROFILE_FIELDS.has(field),
  );
  if (unknown)
    return res
      .status(400)
      .json({ message: `Unsupported profile field: ${unknown}.` });
  if (fields.length === 0)
    return res
      .status(400)
      .json({ message: "Provide at least one profile field to update." });

  if (body.full_name !== undefined && !validText(body.full_name, 255)) {
    return res
      .status(400)
      .json({
        message:
          "full_name must be a non-empty string of 255 characters or fewer.",
      });
  }
  if (
    body.email !== undefined &&
    (typeof body.email !== "string" ||
      body.email.length > 255 ||
      !EMAIL_PATTERN.test(body.email.trim()))
  ) {
    return res
      .status(400)
      .json({ message: "email must be a valid email address." });
  }
  for (const [field, limit] of [
    ["phone", 30],
    ["studio_name", 255],
    ["bio", 2000],
    ["location", 255],
  ]) {
    if (body[field] !== undefined && !validText(body[field], limit)) {
      return res
        .status(400)
        .json({
          message: `${field} must be a non-empty string of ${limit} characters or fewer.`,
        });
    }
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.query(
      "SELECT id, role FROM users WHERE id = ? FOR UPDATE",
      [req.user.id],
    );
    if (rows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: "User not found." });
    }
    const role = rows[0].role;
    const roleFields =
      role === "creator"
        ? new Set(["studio_name", "bio", "location"])
        : new Set(["phone"]);
    const invalidRoleField = fields.find(
      (field) => PROFILE_FIELDS.has(field) && !roleFields.has(field),
    );
    if (invalidRoleField) {
      await connection.rollback();
      return res
        .status(400)
        .json({
          message: `${invalidRoleField} is not valid for the ${role} profile.`,
        });
    }

    const userUpdates = [];
    const userValues = [];
    for (const field of ["full_name", "email"]) {
      if (body[field] !== undefined) {
        userUpdates.push(`${field} = ?`);
        userValues.push(body[field].trim());
      }
    }
    if (userUpdates.length) {
      userValues.push(req.user.id);
      await connection.query(
        `UPDATE users SET ${userUpdates.join(", ")} WHERE id = ?`,
        userValues,
      );
    }

    const table = role === "creator" ? "creators" : "customers";
    const tableFields =
      role === "creator" ? ["studio_name", "bio", "location"] : ["phone"];
    const profileUpdates = [];
    const profileValues = [];
    for (const field of tableFields) {
      if (body[field] !== undefined) {
        profileUpdates.push(`${field} = ?`);
        profileValues.push(body[field].trim());
      }
    }
    if (profileUpdates.length) {
      profileValues.push(req.user.id);
      await connection.query(
        `UPDATE ${table} SET ${profileUpdates.join(", ")} WHERE user_id = ?`,
        profileValues,
      );
    }

    await connection.commit();
    return res.json({
      message: "Profile updated successfully.",
      user: await loadUserProfile(db, req.user.id),
    });
  } catch (error) {
    await connection.rollback();
    console.error("Update profile error:", error);
    if (error.code === "ER_DUP_ENTRY")
      return res.status(409).json({ message: "Email is already registered." });
    return res.status(500).json({ message: "Could not update user profile." });
  } finally {
    connection.release();
  }
}
