#!/bin/bash
set -e

echo "Building CodedSwitch for production..."

# Install dependencies
npm ci

# Build frontend without custom config to avoid module resolution issues  
NODE_ENV=production npx vite build --outDir dist/public

# Build backend
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "Build complete!"