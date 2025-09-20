#!/bin/bash

echo "🚀 Personal Finance Dashboard Deployment Script"
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "✅ Project structure verified"

# Check for required files
required_files=("vercel.json" "render.yaml" "backend/config_prod.py" "src/api-config.js")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Error: $file not found. Please run the deployment setup first."
        exit 1
    fi
done

echo "✅ All deployment files found"

# Check if git repository is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes"
    read -p "Do you want to continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled"
        exit 1
    fi
fi

echo "📝 Please update the following URLs in your configuration files:"
echo "1. In vercel.json: Replace 'your-backend-app.onrender.com' with your actual Render service URL"
echo "2. In src/api-config.js: Replace 'your-backend-app.onrender.com' with your actual Render service URL"
echo "3. In backend/config_prod.py: Replace 'your-frontend-app.vercel.app' with your actual Vercel URL"
echo ""

read -p "Have you updated all the URLs? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Please update the URLs first before deploying"
    exit 1
fi

echo ""
echo "🌐 Deployment Instructions:"
echo "=========================="
echo ""
echo "1. BACKEND DEPLOYMENT (Render):"
echo "   a. Go to https://render.com"
echo "   b. Click 'New' → 'Blueprint'"
echo "   c. Connect your GitHub repository"
echo "   d. Select the render.yaml file"
echo "   e. Set environment variables as needed"
echo "   f. Deploy!"
echo ""
echo "2. FRONTEND DEPLOYMENT (Vercel):"
echo "   a. Go to https://vercel.com"
echo "   b. Click 'New Project'"
echo "   c. Import your GitHub repository"
echo "   d. Configure build settings (should auto-detect)"
echo "   e. Add environment variables if needed"
echo "   f. Deploy!"
echo ""
echo "3. UPDATE CONFIGURATIONS:"
echo "   a. Update your Render service URL in Vercel configuration"
echo "   b. Update your Vercel URL in Render configuration"
echo "   c. Redeploy both services"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "🎉 Good luck with your deployment!"
