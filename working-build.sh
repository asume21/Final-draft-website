#!/bin/bash
set -e

echo "🔧 FIXING BUILD PROPERLY"

# Install dependencies
npm install

# Build from client directory where index.html exists
echo "📦 Building frontend..."
cd client && npx vite build --outDir ../dist/public && cd ..

# Check if CSS was built
CSS_FILE=$(find dist -name "*.css" | head -1)
if [ -f "$CSS_FILE" ]; then
    CSS_SIZE=$(wc -c < "$CSS_FILE")
    echo "✅ CSS Built: $(basename "$CSS_FILE") - $CSS_SIZE bytes"
else
    echo "❌ No CSS file found!"
    exit 1
fi

# Build server
echo "🔧 Building server..."
npx esbuild server/production.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js

echo "✅ BUILD COMPLETE!"
ls -la dist/