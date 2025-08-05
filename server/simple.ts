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

// Serve static files with proper headers
app.use(express.static(path.join(__dirname, "public"), {
  setHeaders: (res, filePath) => {
    console.log(`Serving static file: ${filePath}`);
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
      console.log(`Set CSS content type for: ${filePath}`);
    }
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Explicitly serve assets directory
app.use('/assets', express.static(path.join(__dirname, "public", "assets"), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

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