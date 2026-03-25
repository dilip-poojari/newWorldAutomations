# 🚀 Deployment Guide

## GitHub Repository

**Repository URL**: https://github.com/dilip-poojari/newWorldAutomations

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dilip-poojari/newWorldAutomations)

**Steps:**
1. Click the "Deploy with Vercel" button above
2. Sign in to Vercel with GitHub
3. Import the repository
4. Vercel will auto-detect Vite and configure build settings
5. Click "Deploy"
6. Your dashboard will be live in ~2 minutes!

**Custom Domain:**
- Go to Project Settings → Domains
- Add your custom domain
- Update DNS records as instructed

### Option 2: Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/dilip-poojari/newWorldAutomations)

**Steps:**
1. Click "Deploy to Netlify" button
2. Connect your GitHub account
3. Netlify will auto-configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click "Deploy site"
5. Live in ~2 minutes!

### Option 3: GitHub Pages

**Steps:**
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` (create if needed)
4. Add GitHub Actions workflow:

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

5. Push to main branch
6. Site will be live at: `https://dilip-poojari.github.io/newWorldAutomations/`

### Option 4: AWS Amplify

**Steps:**
1. Go to AWS Amplify Console
2. Click "New app" → "Host web app"
3. Connect GitHub repository
4. Amplify auto-detects Vite:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Click "Save and deploy"
6. Live in ~5 minutes!

### Option 5: Cloudflare Pages

**Steps:**
1. Go to Cloudflare Pages
2. Click "Create a project"
3. Connect GitHub repository
4. Configure build:
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Click "Save and Deploy"
6. Live in ~3 minutes!

## Manual Deployment

### Build Locally
```bash
cd ibm-cloud-automations
npm install
npm run build
```

The `dist/` folder contains your production build.

### Deploy to Any Static Host

Upload the `dist/` folder contents to:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- DigitalOcean App Platform
- Render
- Railway
- Fly.io

## Environment Variables

If deploying with Claude API integration:

1. Add environment variable in your hosting platform:
   ```
   VITE_ANTHROPIC_API_KEY=your_api_key_here
   ```

2. For Vercel: Project Settings → Environment Variables
3. For Netlify: Site Settings → Environment Variables
4. For GitHub Pages: Use GitHub Secrets

## Custom Domain Setup

### Vercel
1. Project Settings → Domains
2. Add domain
3. Update DNS:
   - Type: CNAME
   - Name: www (or @)
   - Value: cname.vercel-dns.com

### Netlify
1. Site Settings → Domain Management
2. Add custom domain
3. Update DNS:
   - Type: CNAME
   - Name: www
   - Value: [your-site].netlify.app

### Cloudflare
1. Add site to Cloudflare
2. Update nameservers
3. Automatic SSL/CDN

## Performance Optimization

### Already Included
✅ Vite production optimizations
✅ Code splitting
✅ Tree shaking
✅ Minification
✅ Asset optimization

### Additional Optimizations
- Enable Brotli compression on host
- Configure CDN caching headers
- Add service worker for offline support
- Implement lazy loading for routes

## Monitoring

### Recommended Tools
- **Vercel Analytics** - Built-in performance monitoring
- **Google Analytics** - User behavior tracking
- **Sentry** - Error tracking
- **LogRocket** - Session replay

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Blank Page After Deploy
- Check browser console for errors
- Verify base URL in vite.config.js
- Ensure all assets are loading correctly

### Environment Variables Not Working
- Prefix must be `VITE_` for Vite to expose them
- Rebuild after adding variables
- Check hosting platform's environment variable syntax

## Rollback

### Vercel/Netlify
- Go to Deployments
- Click on previous deployment
- Click "Promote to Production"

### GitHub Pages
- Revert commit in main branch
- GitHub Actions will auto-redeploy

## Support

For deployment issues:
1. Check hosting platform documentation
2. Review build logs
3. Open issue on GitHub: https://github.com/dilip-poojari/newWorldAutomations/issues

---

**Recommended**: Start with Vercel for the easiest deployment experience!