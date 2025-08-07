#!/bin/bash

echo "🎵 Building CodedSwitch Enhanced for Production..."
echo "================================================"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the client application  
echo "🏗️ Building client application..."
npm run build

echo "✅ Build completed successfully!"
echo "🚀 CodedSwitch Enhanced ready for deployment!"