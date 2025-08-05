import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer } from "http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 5000;

console.log(`[${new Date().toISOString()}] Starting emergency production server...`);

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Basic health check - no external dependencies
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    message: "Emergency production server running"
  });
});

// AI Providers endpoint - simplified
app.get("/api/ai/providers", (req, res) => {
  console.log("Checking API keys...");
  const providers = [
    {
      id: "grok",
      name: "xAI Grok",
      description: "Creative AI with wit, humor, and innovative thinking",
      features: ["Code Translation", "Lyric Generation", "Beat Creation", "Code-to-Music", "AI Assistant"],
      available: !!process.env.XAI_API_KEY
    },
    {
      id: "gemini", 
      name: "Google Gemini",
      description: "Multimodal AI with strong creative and analytical capabilities",
      features: ["Code Translation", "Lyric Generation", "Beat Creation", "Code-to-Music", "AI Assistant"],
      available: !!process.env.GEMINI_API_KEY
    }
  ];
  
  console.log("API Keys status:", {
    XAI_API_KEY: !!process.env.XAI_API_KEY,
    GEMINI_API_KEY: !!process.env.GEMINI_API_KEY
  });
  
  res.json(providers);
});

// Serve static files for production
console.log(`[${new Date().toISOString()}] Setting up static file serving...`);
app.use(express.static(path.join(__dirname, "public"), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Explicitly serve assets directory
app.use('/assets', express.static(path.join(__dirname, "public", "assets")));

// SPA fallback for React Router
app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "public", "index.html");
  console.log(`[${new Date().toISOString()}] Serving SPA fallback for ${req.url}`);
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error(`[${new Date().toISOString()}] Build files not found at ${indexPath}`);
    res.status(500).send("Build files not found - deployment may have failed");
  }
});

// Create HTTP server
const httpServer = createServer(app);

console.log(`[${new Date().toISOString()}] Starting server on port ${port}...`);
httpServer.listen(Number(port), "0.0.0.0", () => {
  console.log(`[${new Date().toISOString()}] [express] Emergency production server serving successfully on port ${port}`);
});

// Error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});