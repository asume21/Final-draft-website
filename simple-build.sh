#!/bin/bash
set -e

echo "Building CodedSwitch for production..."

# Install dependencies
npm ci

# Create dist directories
mkdir -p dist/public
mkdir -p dist/static

# Copy static files
cp -r client/index.html dist/public/
cp -r client/src dist/static/

# Build backend using production server (no Vite imports)
echo "Building backend..."
npx esbuild server/production.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --outfile=dist/index.js

# Create a simple static file server fallback
cat > dist/serve-static.js << 'EOF'
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'static')));
app.use('/client', express.static(path.join(__dirname, 'static')));

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

export default app;
EOF

echo "Build complete - using static file serving as fallback!"