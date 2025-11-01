#!/bin/bash

echo "🚀 Real Estate Portfolio - GitHub Setup"
echo "======================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📝 Initializing Git repository..."
    git init
    echo "✅ Git initialized!"
else
    echo "✅ Git already initialized"
fi

echo ""
echo "📋 Please enter your GitHub repository details:"
read -p "GitHub Username: " username
read -p "Repository Name: " reponame

echo ""
echo "📦 Adding files to Git..."
git add .

echo ""
read -p "Commit message (press Enter for default): " commitMessage
commitMessage=${commitMessage:-"Initial commit: Real Estate Portfolio"}

echo ""
echo "💾 Committing changes..."
git commit -m "$commitMessage"

echo ""
echo "🔗 Setting up remote..."
git remote add origin "https://github.com/$username/$reponame.git"

echo ""
echo "🌐 Checking current branch..."
currentBranch=$(git branch --show-current)
if [ -z "$currentBranch" ]; then
    echo "📝 Creating main branch..."
    git branch -M main
    currentBranch="main"
fi

echo ""
echo "🚀 Pushing to GitHub..."
git push -u origin $currentBranch

echo ""
echo "✅ SUCCESS! Your code is now on GitHub!"
echo ""
echo "🌐 Repository URL: https://github.com/$username/$reponame"
echo "⚙️  Actions URL: https://github.com/$username/$reponame/actions"
echo ""
echo "📚 Next Steps:"
echo "1. Go to your repository on GitHub"
echo "2. Check the 'Actions' tab to see the build status"
echo "3. Follow GITHUB_ACTIONS_SETUP.md to configure deployment"
echo "4. Choose your hosting platform (GitHub Pages, Netlify, or Vercel)"
echo ""
echo "💡 Tip: If deploying to GitHub Pages, update vite.config.ts with:"
echo "   base: '/$reponame/'"
echo ""
