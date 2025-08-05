#!/bin/bash
set -e

echo "Building CodedSwitch..."

# Build frontend
echo "Building frontend..."
npx vite build --config vite.config.production.ts

# Check CSS build
CSS_FILE=$(find dist/public/assets -name "*.css" | head -1)
if [ -f "$CSS_FILE" ]; then
    CSS_SIZE=$(wc -c < "$CSS_FILE")
    echo "✅ CSS Built Successfully - Size: $CSS_SIZE bytes"
else
    echo "❌ CSS build failed"
    exit 1
fi

# Build PRODUCTION server
echo "Building production server..."
npx esbuild server/production.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js

echo "✅ Build complete"