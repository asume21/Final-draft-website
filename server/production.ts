import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { registerRoutes } from "./routes";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 5000;

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Initialize server
(async () => {
  // Register API routes
  const httpServer = await registerRoutes(app);

  // Serve static files for production
  if (process.env.NODE_ENV === "production") {
    // Serve built frontend files with proper headers
    app.use(express.static(path.join(__dirname, "public"), {
      setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
          res.setHeader('Content-Type', 'text/css');
        }
        if (path.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
        }
      }
    }));
    
    // Explicitly serve assets directory
    app.use('/assets', express.static(path.join(__dirname, "public", "assets")));
    
    // SPA fallback for React Router
    app.get("*", (req, res) => {
      const indexPath = path.join(__dirname, "public", "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(500).send("Build files not found - deployment may have failed");
      }
    });
  }

  httpServer.listen(Number(port), "0.0.0.0", () => {
    console.log(`[${new Date().toISOString()}] [express] serving on port ${port}`);
  });
})();