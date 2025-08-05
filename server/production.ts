import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { registerRoutes } from "./routes";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("STARTING CODESWITCH PRODUCTION SERVER");

(async () => {
  // Register all API routes
  const httpServer = await registerRoutes(app);
  console.log("✅ All API routes registered");

  // DEAD SIMPLE STATIC FILE SERVING - NO CONDITIONS, NO COMPLEXITY
  const publicPath = path.join(__dirname, "public");
  console.log("📁 Public directory:", publicPath);
  console.log("📁 Directory exists:", fs.existsSync(publicPath));
  
  if (fs.existsSync(publicPath)) {
    const files = fs.readdirSync(publicPath, { recursive: true });
    console.log("📁 All files in public:", files);
  }

  // Serve everything with express.static - simple and reliable
  app.use(express.static(publicPath, {
    maxAge: '1d',
    setHeaders: (res, path) => {
      console.log("🔧 SERVING:", path);
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
        console.log("🎨 CSS FILE SERVED:", path);
      }
    }
  }));

  // Catch-all for SPA
  app.get('*', (req, res) => {
    const indexPath = path.join(publicPath, 'index.html');
    console.log("🔄 SPA Fallback:", req.url, "->", indexPath);
    res.sendFile(indexPath);
  });

  httpServer.listen(Number(port), '0.0.0.0', () => {
    console.log(`🚀 CodedSwitch server running on port ${port}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
})().catch(console.error);