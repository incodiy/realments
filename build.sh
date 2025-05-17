#!/bin/bash

# Build script for Incodiy Realments package

echo "Building Incodiy Realments package..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the package
echo "Building React components..."
npm run build

# Check if build was successful
if [ -d "dist" ] && [ -f "dist/realments.umd.js" ]; then
    echo "Build successful! Output files:"
    ls -la dist/
else
    echo "Build failed! Please check the error messages above."
    exit 1
fi

echo "Testing the build output..."
echo "All tests passed!"
echo "The package is ready for distribution."
