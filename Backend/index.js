import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import db from "./config/db.js";
import registerRoutes from "./routes/registerRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import creatorRoutes from "./routes/creatorRoutes.js";
import artworkRoutes from "./routes/artworkRoutes.js";
import handcraftRoutes from "./routes/handcraftRoutes.js";
import handmadeRoutes from "./routes/handmadeRoutes.js";

const app = express();
const port = Number(process.env.PORT) || 5000;
const backendDir = path.dirname(fileURLToPath(import.meta.url));
const frontendDist = path.resolve(backendDir, "../Frontend/dist");

app.use(cors());
app.use(express.json());
// Serve the production frontend from the same Railway domain as the API.
app.use(express.static(frontendDist));

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
// Keep the newer auth URLs, including the authenticated /me endpoint.
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/creators", creatorRoutes);
app.use("/api/artwork", artworkRoutes);
app.use("/api/handcraft", handcraftRoutes);
app.use("/api/handmade", handmadeRoutes);

// Support Vue Router history mode when the frontend is served by this backend.
app.use((req, res, next) => {
  if (req.method === "GET" && req.accepts("html") && frontendDist) {
    return res.sendFile(path.join(frontendDist, "index.html"), (error) => {
      if (error) next();
    });
  }
  next();
});

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

try {
  await db.query("SELECT 1");
  console.log("Connected to the ArtisanHub MySQL database successfully.");
} catch (error) {
  console.error("Database connection failed:", error.message);
}

app.listen(port, () => {
  console.log(`ArtisanHub backend listening on http://localhost:${port}`);
});
