#!/bin/bash
set -e

echo "🚀 Starting production build..."

# Clean any existing builds
rm -rf dist/ build/ .output/

# Install dependencies
npm ci --production=false

# Build client
echo "📦 Building client..."
export NODE_ENV=production
npx vite build

# Build server  
echo "🔧 Building server..."
npx esbuild server/index.ts --bundle --platform=node --target=node18 --outfile=dist/server.js --external:@replit/vite-plugin-cartographer --external:@replit/vite-plugin-runtime-error-modal

# Copy package.json for production
cp package.json dist/

echo "✅ Production build complete!"
echo "📁 Files ready in dist/ directory"
ls -la dist/