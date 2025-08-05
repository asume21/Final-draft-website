import express from "express";
import path from "path";
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

// Register API routes
const httpServer = await registerRoutes(app);

// Serve static files for production
if (process.env.NODE_ENV === "production") {
  // Serve client files
  app.use(express.static(path.join(__dirname, "static")));
  app.use("/client", express.static(path.join(__dirname, "static")));
  
  // SPA fallback
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
}

httpServer.listen(port, "0.0.0.0", () => {
  console.log(`[${new Date().toISOString()}] [express] serving on port ${port}`);
});