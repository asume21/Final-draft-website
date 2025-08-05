#!/bin/bash
set -e

echo "🚨 EMERGENCY STYLING FIX DEPLOYMENT"

# Build with production-specific configuration
echo "Building frontend with production Vite config..."
npx vite build --config vite.config.production.ts --mode production

# Check CSS file was built properly  
CSS_FILE=$(ls dist/public/assets/*.css | head -1)
CSS_SIZE=$(stat -c%s "$CSS_FILE" 2>/dev/null || echo "0")

if [ "$CSS_SIZE" -lt 1000 ]; then
    echo "❌ CSS BUILD FAILED - File size: $CSS_SIZE bytes"
    exit 1
fi

echo "✅ CSS Built Successfully - Size: $CSS_SIZE bytes"

# Build server using production entry point
echo "Building server..."
npx esbuild server/production.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js

# Start server
echo "Starting production server..."
cd dist && node index.js
