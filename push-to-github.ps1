# Quick Start: Push to GitHub

Write-Host "🚀 Real Estate Portfolio - GitHub Setup" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "📝 Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialized!" -ForegroundColor Green
} else {
    Write-Host "✅ Git already initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 Please enter your GitHub repository details:" -ForegroundColor Cyan
$username = Read-Host "GitHub Username"
$reponame = Read-Host "Repository Name"

Write-Host ""
Write-Host "📦 Adding files to Git..." -ForegroundColor Yellow
git add .

Write-Host ""
$commitMessage = Read-Host "Commit message (press Enter for default: 'Initial commit: Real Estate Portfolio')"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Initial commit: Real Estate Portfolio"
}

Write-Host ""
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m "$commitMessage"

Write-Host ""
Write-Host "🔗 Setting up remote..." -ForegroundColor Yellow
git remote add origin "https://github.com/$username/$reponame.git"

Write-Host ""
Write-Host "🌐 Checking current branch..." -ForegroundColor Yellow
$currentBranch = git branch --show-current
if ([string]::IsNullOrWhiteSpace($currentBranch)) {
    Write-Host "📝 Creating main branch..." -ForegroundColor Yellow
    git branch -M main
    $currentBranch = "main"
}

Write-Host ""
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin $currentBranch

Write-Host ""
Write-Host "✅ SUCCESS! Your code is now on GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Repository URL: https://github.com/$username/$reponame" -ForegroundColor Cyan
Write-Host "⚙️  Actions URL: https://github.com/$username/$reponame/actions" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Go to your repository on GitHub"
Write-Host "2. Check the 'Actions' tab to see the build status"
Write-Host "3. Follow GITHUB_ACTIONS_SETUP.md to configure deployment"
Write-Host "4. Choose your hosting platform (GitHub Pages, Netlify, or Vercel)"
Write-Host ""
Write-Host "💡 Tip: If deploying to GitHub Pages, update vite.config.ts with:" -ForegroundColor Cyan
Write-Host "   base: '/$reponame/'" -ForegroundColor White
Write-Host ""
