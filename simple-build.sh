#!/bin/bash
set -e

echo "🚀 Building CodedSwitch with simple approach..."

# Create dist directory
mkdir -p dist/public

# Build frontend without complex config
echo "📦 Building frontend..."
npx vite build --outDir dist/public

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

echo "✅ Simple build complete!"
echo "📁 Files built:"
ls -la dist/
echo "📁 Public assets:"
ls -la dist/public/