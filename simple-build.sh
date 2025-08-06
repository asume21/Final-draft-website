#!/bin/bash
set -e

echo "🚀 Production build for Render deployment..."

# Show current directory and files for debugging
echo "📁 Current directory: $(pwd)"
echo "📁 Contents: $(ls -la)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install --include=dev

# Clean any existing build and safe caches
echo "🧹 Cleaning previous build and safe caches..."
rm -rf dist/ node_modules/.vite client/dist
# Clear npm cache to ensure fresh dependencies  
npm cache clean --force 2>/dev/null || true

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

# Check both possible dist locations and create server-expected structure
if [ -d "client/dist" ]; then
    echo "✓ Found dist in client/dist, creating server-expected structure"
    # Create dist directory and move client/dist contents to dist/public
    mkdir -p ./dist/public
    cp -r client/dist/* ./dist/public/
    # Also copy to root level for server access
    cp client/dist/index.html ./dist/
elif [ -d "dist" ]; then
    echo "✓ Found dist in root directory, creating server-expected structure"
    # Create public subdirectory for server
    mkdir -p ./dist/public
    cp -r ./dist/* ./dist/public/ 2>/dev/null || true
else
    echo "❌ Frontend build failed - no dist directory found"
    echo "Checking for build output:"
    ls -la client/ 2>/dev/null || echo "No client directory"
    ls -la . | grep dist || echo "No dist directory in root"
    exit 1
fi

if [ ! -f "dist/index.html" ]; then
    echo "❌ Frontend build failed - no index.html found"
    ls -la dist/
    exit 1
fi

# Create temporary directory for frontend assets
echo "📁 Preserving frontend assets before server build..."
mkdir -p temp_assets
cp -r dist/* temp_assets/

# Build server bundle
echo "⚙️ Building server..."
npx esbuild server/index.ts \
    --platform=node \
    --packages=external \
    --bundle \
    --format=esm \
    --outfile=dist/index.js

# Restore frontend assets
echo "📁 Restoring frontend assets..."
cp -r temp_assets/* dist/
rm -rf temp_assets/

# Verify server build
if [ ! -f "dist/index.js" ]; then
    echo "❌ Server build failed"
    exit 1
fi

# Show final build contents and verify structure
echo "✅ Build complete!"
echo "📁 Build contents:"
ls -la dist/
echo "📁 Public directory contents:"
ls -la dist/public/
echo "📁 Assets directory contents:"
ls -la dist/public/assets/ | head -5
echo "Frontend size: $(wc -c < dist/index.html) bytes"
echo "Server size: $(wc -c < dist/index.js) bytes"

# Verify critical files exist
if [ ! -f "dist/public/index.html" ]; then
    echo "❌ Missing dist/public/index.html"
    exit 1
fi

if [ ! -d "dist/public/assets" ]; then
    echo "❌ Missing dist/public/assets directory"
    exit 1
fi

css_files=$(ls dist/public/assets/*.css 2>/dev/null | wc -l)
if [ "$css_files" -eq 0 ]; then
    echo "❌ No CSS files found in dist/public/assets/"
    exit 1
fi

echo "✅ All required files present - deployment ready!"