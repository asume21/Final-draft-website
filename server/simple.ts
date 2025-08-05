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
  try {
    console.log(`[${new Date().toISOString()}] Initializing server...`);
    
    // Register all API routes with full functionality
    const httpServer = await registerRoutes(app);
    console.log(`[${new Date().toISOString()}] API routes registered successfully`);

    // Serve static files ALWAYS (not just in production) with proper headers
    console.log(`[${new Date().toISOString()}] Setting up static file serving...`);
    console.log(`[${new Date().toISOString()}] Public directory: ${path.join(__dirname, "public")}`);
    console.log(`[${new Date().toISOString()}] Assets directory: ${path.join(__dirname, "public", "assets")}`);
    
    // Check if directories exist
    const publicDir = path.join(__dirname, "public");
    const assetsDir = path.join(__dirname, "public", "assets");
    console.log(`[${new Date().toISOString()}] Public dir exists: ${fs.existsSync(publicDir)}`);
    console.log(`[${new Date().toISOString()}] Assets dir exists: ${fs.existsSync(assetsDir)}`);
    
    if (fs.existsSync(assetsDir)) {
      const files = fs.readdirSync(assetsDir);
      console.log(`[${new Date().toISOString()}] Files in assets:`, files);
    }
    
    // Main static files with detailed logging and proper headers
    app.use(express.static(publicDir, {
      setHeaders: (res, filePath) => {
        console.log(`[${new Date().toISOString()}] SERVING FILE: ${filePath}`);
        if (filePath.endsWith('.css')) {
          res.setHeader('Content-Type', 'text/css; charset=utf-8');
          res.setHeader('Cache-Control', 'public, max-age=31536000');
          console.log(`[${new Date().toISOString()}] ✅ CSS SERVED: ${filePath}`);
        }
        if (filePath.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
          res.setHeader('Cache-Control', 'public, max-age=31536000');
        }
      }
    }));
    
    // Explicitly serve assets directory with aggressive CSS handling
    app.use('/assets', express.static(assetsDir, {
      setHeaders: (res, filePath) => {
        console.log(`[${new Date().toISOString()}] ASSETS FILE: ${filePath}`);
        if (filePath.endsWith('.css')) {
          res.setHeader('Content-Type', 'text/css; charset=utf-8');
          res.setHeader('Cache-Control', 'public, max-age=31536000');
          res.setHeader('Access-Control-Allow-Origin', '*');
          console.log(`[${new Date().toISOString()}] ✅ ASSETS CSS: ${filePath}`);
        }
        if (filePath.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
          res.setHeader('Cache-Control', 'public, max-age=31536000');
        }
      }
    }));
    
    // Test CSS serving with explicit route
    app.get('/test-css', (req, res) => {
      const cssFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.css'));
      console.log(`[${new Date().toISOString()}] Available CSS files:`, cssFiles);
      res.json({
        publicExists: fs.existsSync(publicDir),
        assetsExists: fs.existsSync(assetsDir),
        cssFiles: cssFiles,
        allFiles: fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir) : []
      });
    });
    
    // SPA fallback for React Router
    app.get("*", (req, res) => {
      const indexPath = path.join(__dirname, "public", "index.html");
      console.log(`[${new Date().toISOString()}] SPA fallback for ${req.url} -> ${indexPath}`);
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        console.error(`[${new Date().toISOString()}] Build files not found at ${indexPath}`);
        res.status(500).send("Build files not found - deployment may have failed");
      }
    });

    httpServer.listen(Number(port), "0.0.0.0", () => {
      console.log(`[${new Date().toISOString()}] CodedSwitch server successfully running on port ${port}`);
      console.log(`[${new Date().toISOString()}] Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`[${new Date().toISOString()}] All features active: API routes, static serving, and SPA routing`);
    });
    
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Server initialization failed:`, error);
    process.exit(1);
  }
})();

// Global error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error(`[${new Date().toISOString()}] Unhandled Rejection at:`, promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error(`[${new Date().toISOString()}] Uncaught Exception:`, error);
  process.exit(1);
});