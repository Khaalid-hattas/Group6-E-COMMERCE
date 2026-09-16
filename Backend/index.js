import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./config/db.js";
import registerRoutes from "./routes/registerRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import creatorRoutes from "./routes/creatorRoutes.js";
import artworkRoutes from "./routes/artworkRoutes.js";
import handcraftRoutes from "./routes/handcraftRoutes.js";
import handmadeRoutes from "./routes/handmadeRoutes.js";

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ name: "ArtisanHub API", status: "ok" });
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/test-db", async (_req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS result");
    res.json({ message: "Database connected successfully", result: rows });
  } catch (error) {
    res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }
});

app.use("/api", registerRoutes);
app.use("/api", loginRoutes);
app.use("/api/creators", creatorRoutes);
app.use("/api/artwork", artworkRoutes);
app.use("/api/handcraft", handcraftRoutes);
app.use("/api/handmade", handmadeRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`ArtisanHub backend listening on http://localhost:${port}`);
});
