import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config({ path: new URL("./.env", import.meta.url) });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: true }));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

try {
  await db.query("SELECT 1");
  console.log("Connected to the ArtisanHub MySQL database successfully.");
} catch (error) {
  console.error("Database connection failed:", error.message);
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
