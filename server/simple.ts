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

    // Serve static files for production with proper headers
    if (process.env.NODE_ENV === "production") {
      console.log(`[${new Date().toISOString()}] Setting up production static file serving...`);
      
      // Main static files with detailed logging and proper headers
      app.use(express.static(path.join(__dirname, "public"), {
        setHeaders: (res, filePath) => {
          console.log(`[${new Date().toISOString()}] Serving: ${filePath}`);
          if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
            res.setHeader('Cache-Control', 'public, max-age=31536000');
            console.log(`[${new Date().toISOString()}] CSS served with proper headers: ${filePath}`);
          }
          if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
            res.setHeader('Cache-Control', 'public, max-age=31536000');
          }
        }
      }));
      
      // Explicitly serve assets directory
      app.use('/assets', express.static(path.join(__dirname, "public", "assets"), {
        setHeaders: (res, filePath) => {
          if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
            res.setHeader('Cache-Control', 'public, max-age=31536000');
            console.log(`[${new Date().toISOString()}] Assets CSS served: ${filePath}`);
          }
          if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
            res.setHeader('Cache-Control', 'public, max-age=31536000');
          }
        }
      }));
      
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
    }

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