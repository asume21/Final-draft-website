#!/bin/bash
set -e

echo "🚨 EMERGENCY BUILD - NO CONFIG FILES"

# Install dependencies first
echo "📦 Installing dependencies..."
npm install

# Create dist directory
mkdir -p dist/public

# Build with absolutely no config
echo "🔧 Building frontend with zero config..."
cd client && npx vite build --outDir ../dist/public --mode production && cd ..

# Verify CSS was built
CSS_FILE=$(find dist/public -name "*.css" | head -1)
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

echo "✅ EMERGENCY BUILD COMPLETE!"
ls -la dist/
ls -la dist/public/