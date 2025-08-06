#!/bin/bash
set -e

echo "Building CodedSwitch for Render..."

# Install dependencies including devDependencies for build
echo "Installing all dependencies..."
npm install --include=dev

# Build frontend using standard vite config
echo "Building frontend..."
npx vite build

# Check if build succeeded
if [ ! -d "dist" ]; then
    echo "❌ Frontend build failed - no dist directory"
    exit 1
fi

# Build server
echo "Building server..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js

echo "✅ Build complete"