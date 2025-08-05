import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { registerRoutes } from "./routes";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 5000;

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize server
(async () => {
  // Register API routes
  const httpServer = await registerRoutes(app);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use('/assets', express.static(path.join(__dirname, "public", "assets")));

// SPA fallback
app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "public", "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(500).send("Build files not found");
  }
});

  httpServer.listen(Number(port), "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
})();