# GitHub Actions Setup Guide

This guide will help you deploy your Real Estate Portfolio using GitHub Actions.

## 📋 Prerequisites

1. A GitHub account
2. Your code pushed to a GitHub repository
3. Choose a hosting platform (GitHub Pages, Netlify, or Vercel)

## 🚀 Quick Start

### Step 1: Push Your Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: Real Estate Portfolio"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### Step 2: Choose Your Deployment Platform

The workflow file includes three deployment options. Choose one and uncomment it in `.github/workflows/deploy.yml`:

---

## 🌐 Option 1: GitHub Pages (FREE - Recommended for Beginners)

### Setup Steps:

1. **Update `vite.config.ts`** to include your repository name:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/YOUR_REPO_NAME/',  // Add this line
   })
   ```

2. **Enable GitHub Pages** in your repository:
   - Go to: `Settings` → `Pages`
   - Source: Select "GitHub Actions"

3. **Uncomment the GitHub Pages deployment** in `.github/workflows/deploy.yml`:
   ```yaml
   # Option 1: Deploy to GitHub Pages
   - name: Deploy to GitHub Pages
     uses: peaceiris/actions-gh-pages@v3
     if: github.ref == 'refs/heads/main'
     with:
       github_token: ${{ secrets.GITHUB_TOKEN }}
       publish_dir: ./dist
   ```

4. **Push your changes** and the action will run automatically!

5. **Access your site** at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Important Notes:
- The `GITHUB_TOKEN` is automatically provided by GitHub
- Deployment happens on every push to the `main` branch
- First deployment may take 5-10 minutes

---

## 🎨 Option 2: Netlify (FREE - Best for Custom Domains)

### Setup Steps:

1. **Create a Netlify account** at [netlify.com](https://netlify.com)

2. **Get your Netlify credentials**:
   - Go to: `User Settings` → `Applications` → `Personal Access Tokens`
   - Create a new token and copy it
   - Go to your site settings and copy the `Site ID`

3. **Add secrets to GitHub**:
   - Go to: `Settings` → `Secrets and variables` → `Actions`
   - Add `NETLIFY_AUTH_TOKEN` (your personal access token)
   - Add `NETLIFY_SITE_ID` (your site ID)

4. **Uncomment the Netlify deployment** in `.github/workflows/deploy.yml`:
   ```yaml
   # Option 2: Deploy to Netlify
   - name: Deploy to Netlify
     uses: nwtgck/actions-netlify@v2
     if: github.ref == 'refs/heads/main'
     with:
       publish-dir: './dist'
       production-branch: main
       github-token: ${{ secrets.GITHUB_TOKEN }}
       deploy-message: "Deploy from GitHub Actions"
     env:
       NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
       NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
   ```

5. **Push your changes** and your site will be deployed!

6. **Access your site** at your Netlify URL (e.g., `your-site-name.netlify.app`)

### Benefits:
- ✅ Custom domains with free SSL
- ✅ Automatic HTTPS
- ✅ Form handling built-in
- ✅ Deploy previews for pull requests

---

## ⚡ Option 3: Vercel (FREE - Fastest Performance)

### Setup Steps:

1. **Create a Vercel account** at [vercel.com](https://vercel.com)

2. **Get your Vercel credentials**:
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel login`
   - Run: `vercel link` in your project directory
   - Get your tokens from: `Account Settings` → `Tokens`

3. **Add secrets to GitHub**:
   - Go to: `Settings` → `Secrets and variables` → `Actions`
   - Add `VERCEL_TOKEN` (your Vercel token)
   - Add `VERCEL_ORG_ID` (from `.vercel/project.json`)
   - Add `VERCEL_PROJECT_ID` (from `.vercel/project.json`)

4. **Uncomment the Vercel deployment** in `.github/workflows/deploy.yml`:
   ```yaml
   # Option 3: Deploy to Vercel
   - name: Deploy to Vercel
     uses: amondnet/vercel-action@v25
     if: github.ref == 'refs/heads/main'
     with:
       vercel-token: ${{ secrets.VERCEL_TOKEN }}
       vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
       vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
       vercel-args: '--prod'
       working-directory: ./
   ```

5. **Push your changes** and deployment happens automatically!

6. **Access your site** at your Vercel URL (e.g., `your-site.vercel.app`)

### Benefits:
- ✅ Ultra-fast global CDN
- ✅ Automatic HTTPS
- ✅ Edge functions support
- ✅ Analytics included

---

## 🔧 Workflow Explanation

The GitHub Actions workflow does the following:

1. **On Push/PR to main**: Triggers automatically
2. **Build Job**:
   - Checks out your code
   - Sets up Node.js 20
   - Installs dependencies
   - Builds the project
   - Uploads build artifacts
   - Deploys to your chosen platform (if on main branch)

3. **Test Job** (runs in parallel):
   - Type checking with TypeScript
   - Linting (if configured)
   - Build test to ensure everything compiles

## 📊 Monitoring Your Deployments

1. Go to your GitHub repository
2. Click on the "Actions" tab
3. You'll see all workflow runs with their status
4. Click on any run to see detailed logs

## 🛠️ Customization

### Change Deployment Branch

To deploy from a different branch (e.g., `production`), update:

```yaml
on:
  push:
    branches:
      - production  # Change this
```

### Add Environment Variables

If you need environment variables during build:

```yaml
- name: Build project
  run: npm run build
  env:
    VITE_API_URL: ${{ secrets.API_URL }}
    VITE_MESSENGER_ID: ${{ secrets.MESSENGER_ID }}
```

Then add these secrets in GitHub: `Settings` → `Secrets and variables` → `Actions`

### Deploy on Schedule

To rebuild your site daily (useful for updating property listings):

```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight UTC
  push:
    branches:
      - main
```

## 🚨 Troubleshooting

### Build Fails

1. Check the Actions tab for error logs
2. Ensure all dependencies are in `package.json`
3. Test the build locally: `npm run build`

### Deployment Fails

1. Verify all secrets are correctly added in GitHub
2. Check that your hosting platform credentials are valid
3. Review the deployment logs in the Actions tab

### Site Shows 404

**For GitHub Pages:**
- Ensure `base` is set in `vite.config.ts`
- Check that GitHub Pages is enabled in repository settings

**For Netlify/Vercel:**
- Verify the `dist` folder is being published
- Check your site's build logs on the hosting platform

## 📝 Best Practices

1. **Test Locally First**: Always run `npm run build` locally before pushing
2. **Use Pull Requests**: Create PRs to test builds before merging to main
3. **Monitor Build Times**: Keep an eye on action execution time
4. **Keep Secrets Secure**: Never commit API keys or tokens to your repository
5. **Update Dependencies**: Regularly update your GitHub Actions versions

## 🎯 Next Steps After Deployment

1. ✅ Add your custom domain (if using Netlify/Vercel)
2. ✅ Set up SSL certificate (automatic on all platforms)
3. ✅ Configure contact form backend
4. ✅ Add Google Analytics
5. ✅ Submit sitemap to Google Search Console
6. ✅ Test on multiple devices
7. ✅ Set up monitoring/uptime checks

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Guide](https://docs.github.com/en/pages)
- [Netlify Documentation](https://docs.netlify.com)
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)

## 💡 Tips

- **Free Tier Limits**: All three platforms have generous free tiers perfect for portfolio sites
- **Custom Domains**: Netlify and Vercel make it easy to add custom domains
- **Preview Deployments**: Both Netlify and Vercel create preview URLs for pull requests
- **Build Minutes**: GitHub Actions provides 2,000 free minutes per month for public repos
