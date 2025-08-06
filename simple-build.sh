#!/bin/bash
set -e

echo "🚀 Production build for Render deployment..."

# Show current directory and files for debugging
echo "📁 Current directory: $(pwd)"
echo "📁 Contents: $(ls -la)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install --include=dev

# Clean any existing build
echo "🧹 Cleaning previous build..."
rm -rf dist/

# Build frontend with explicit configuration
echo "📦 Building frontend..."
export NODE_ENV=production

# Check if vite config exists
if [ -f "vite.config.ts" ]; then
    echo "✓ Found vite.config.ts"
else
    echo "❌ vite.config.ts not found!"
    exit 1
fi

# Build frontend to dist directory
npx vite build

# Verify frontend build completed
if [ ! -d "dist" ]; then
    echo "❌ Frontend build failed - no dist directory created"
    exit 1
fi

if [ ! -f "dist/index.html" ]; then
    echo "❌ Frontend build failed - no index.html found"
    ls -la dist/
    exit 1
fi

# Build server bundle
echo "⚙️ Building server..."
npx esbuild server/index.ts \
    --platform=node \
    --packages=external \
    --bundle \
    --format=esm \
    --outfile=dist/index.js

# Verify server build
if [ ! -f "dist/index.js" ]; then
    echo "❌ Server build failed"
    exit 1
fi

# Show final build contents
echo "✅ Build complete!"
echo "📁 Build contents:"
ls -la dist/
echo "Frontend size: $(wc -c < dist/index.html) bytes"
echo "Server size: $(wc -c < dist/index.js) bytes"