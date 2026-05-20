#!/bin/bash
# Quick setup for Vercel deployment
# Run this script to prepare your project for Vercel deployment

set -e

echo "🚀 Netropolis Vercel Deployment Setup"
echo "======================================"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo ""
echo "📋 Step 1: Setting up environment files"
echo "----------------------------------------"

# Copy .env.example to .env if it doesn't exist
if [ ! -f netropolis_backend/.env ]; then
    cp netropolis_backend/.env.example netropolis_backend/.env
    echo "✅ Created netropolis_backend/.env"
    echo "⚠️  IMPORTANT: Update netropolis_backend/.env with your actual values"
else
    echo "✅ netropolis_backend/.env already exists"
fi

if [ ! -f netropolis_frontend/.env ]; then
    cp netropolis_frontend/.env.example netropolis_frontend/.env
    echo "✅ Created netropolis_frontend/.env"
    echo "⚠️  IMPORTANT: Update netropolis_frontend/.env with your actual values"
else
    echo "✅ netropolis_frontend/.env already exists"
fi

echo ""
echo "📚 Step 2: Install dependencies"
echo "--------------------------------"
cd netropolis_frontend
npm install
cd ..

cd netropolis_backend
if [ -d "venv" ]; then
    echo "✅ Virtual environment already exists"
else
    python -m venv venv
    echo "✅ Created virtual environment"
fi

# Activate venv and install requirements
source venv/Scripts/activate 2>/dev/null || source venv/bin/activate
pip install -r requirements.txt
echo "✅ Installed Python dependencies"

echo ""
echo "🔑 Step 3: Configure environment variables"
echo "-------------------------------------------"
echo "Before deploying, update these files with your actual values:"
echo "  - netropolis_backend/.env"
echo "  - netropolis_frontend/.env"
echo ""
echo "For Vercel deployment, you'll need:"
echo "  ✓ PostgreSQL database"
echo "  ✓ Qdrant vector database"
echo "  ✓ Google OAuth credentials"

echo ""
echo "🚀 Step 4: Deploy to Vercel"
echo "----------------------------"
read -p "Ready to deploy? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    vercel --prod
else
    echo "Skipped deployment. Run 'vercel --prod' when ready."
fi

echo ""
echo "✨ Setup complete!"
echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md"
