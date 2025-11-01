# Deployment Guide

## 🌐 How to Deploy Your Real Estate Portfolio

### Option 1: Vercel (Recommended - Free & Easy)

**Steps:**
1. Create account at [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel auto-detects Vite settings
5. Click "Deploy"
6. Done! Your site is live in 2 minutes

**Pros:**
- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ Fast global CDN
- ✅ Auto-deploy on git push

### Option 2: Netlify (Free & Easy)

**Steps:**
1. Create account at [netlify.com](https://netlify.com)
2. Drag & drop your `dist` folder (after running `npm run build`)
3. Or connect your GitHub repo
4. Done!

**Pros:**
- ✅ Free hosting
- ✅ Drag & drop deployment
- ✅ Form handling
- ✅ Custom domains

### Option 3: GitHub Pages (Free)

**Steps:**
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/realestate-portfolio",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/realestate-portfolio/',
     plugins: [react()],
   })
   ```
4. Run: `npm run deploy`

### Option 4: Traditional Hosting (cPanel, etc.)

**Steps:**
1. Run: `npm run build`
2. Upload `dist` folder contents to your hosting
3. Point your domain to the folder
4. Configure .htaccess for React Router:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

## 🔧 Pre-Deployment Checklist

- [ ] Update all placeholder content
- [ ] Add your Messenger Page ID
- [ ] Test all links and navigation
- [ ] Check mobile responsiveness
- [ ] Optimize images (compress large files)
- [ ] Update meta tags for SEO (in `index.html`)
- [ ] Test contact forms/buttons
- [ ] Verify property data is accurate
- [ ] Check for console errors
- [ ] Run build: `npm run build`

## 🎯 SEO Optimization

**Update `index.html`:**

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- SEO Meta Tags -->
  <title>Your Company Name - Real Estate in the Philippines</title>
  <meta name="description" content="Find your dream property with [Your Company]. Condos, houses, lots, and office spaces across Cebu, Manila, Palawan, and more." />
  <meta name="keywords" content="real estate, property, Philippines, condo, house and lot, Cebu, Manila" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Your Company Name - Real Estate" />
  <meta property="og:description" content="Your description here" />
  <meta property="og:image" content="https://yoursite.com/preview-image.jpg" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Your Company Name" />
  <meta name="twitter:description" content="Your description here" />
</head>
```

## 🚀 Performance Tips

1. **Optimize Images:**
   - Use WebP format when possible
   - Compress images: [TinyPNG](https://tinypng.com/)
   - Resize to appropriate dimensions

2. **Lazy Loading:**
   Images are already optimized with proper loading

3. **Caching:**
   Vercel/Netlify handle this automatically

## 🔒 Custom Domain Setup

### For Vercel/Netlify:
1. Go to project settings
2. Add custom domain
3. Update your DNS records (they provide instructions)
4. Wait for SSL certificate (automatic)

**Example DNS Records:**
```
Type: A
Name: @
Value: [provided by host]

Type: CNAME
Name: www
Value: [provided by host]
```

## 📱 Mobile Testing

Before deployment, test on:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet (iPad/Android)
- [ ] Desktop (Chrome, Firefox, Safari)

**Testing Tools:**
- Chrome DevTools (F12 → Device Mode)
- [BrowserStack](https://www.browserstack.com/) (free trial)
- [Responsively App](https://responsively.app/) (free)

## 🆘 Troubleshooting

**Issue: Blank page after deployment**
- Check browser console for errors
- Verify base URL in vite.config.ts
- Check .htaccess for React Router support

**Issue: Images not loading**
- Use absolute URLs (https://)
- Check CORS settings
- Verify image URLs are accessible

**Issue: 404 on page refresh**
- Add server configuration for SPA routing
- See Option 4 above for .htaccess

**Issue: Messenger link not working**
- Replace YOUR_PAGE_ID with actual ID
- Test the m.me link in browser first

## 📊 Analytics Setup (Optional)

**Google Analytics:**
1. Create GA4 property
2. Get tracking ID
3. Add to `index.html`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

## ✅ Post-Deployment

After deploying:
1. Test all pages
2. Check mobile version
3. Verify contact methods work
4. Submit to Google Search Console
5. Share with your client!

---

**Questions?** Check the README.md or CUSTOMIZATION_GUIDE.md
