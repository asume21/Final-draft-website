#!/bin/bash
set -e

echo "🚀 Simple production build for Render..."

# Install dependencies including devDependencies
echo "📦 Installing dependencies..."
npm install --include=dev

# Clean builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/

# Build frontend
echo "📦 Building frontend..."
export NODE_ENV=production
npx vite build --outDir dist

# Build server
echo "⚙️ Building server..."
npx esbuild server/index.ts \
    --platform=node \
    --packages=external \
    --bundle \
    --format=esm \
    --outfile=dist/index.js \
    --minify

# Verify build
echo "🧪 Verifying build..."
if [ ! -d "dist" ] || [ ! -f "dist/index.html" ]; then
    echo "❌ Frontend build failed"
    exit 1
fi

if [ ! -f "dist/index.js" ]; then
    echo "❌ Server build failed"
    exit 1
fi

echo "✅ Build complete!"
echo "📁 Frontend: $(ls -la dist/index.html | awk '{print $5}') bytes"
echo "📁 Server: $(ls -la dist/index.js | awk '{print $5}') bytes"