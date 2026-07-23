# Deploying to Netlify

This guide will help you deploy your MInT Navigation Portal to Netlify.

## Prerequisites

1. A GitHub/GitLab/Bitbucket account with your code pushed
2. A Netlify account (free - sign up at https://app.netlify.com/signup)

## Option 1: Deploy via Netlify UI (Recommended for beginners)

### Step 1: Push your code to GitHub

```bash
# Add all changes
git add .

# Commit the changes
git commit -m "Add Netlify configuration"

# Push to GitHub
git push origin main
```

### Step 2: Deploy on Netlify

1. Go to https://app.netlify.com/
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose your Git provider (GitHub, GitLab, or Bitbucket)
4. Authorize Netlify to access your repositories
5. Select your repository: `mint-nav`
6. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Node version:** Click "Show advanced" → Add environment variable:
     - Key: `NODE_VERSION`
     - Value: `20`
7. Click **"Deploy site"**

### Step 3: Wait for deployment

- Netlify will automatically build and deploy your site
- This usually takes 2-5 minutes
- You'll get a random URL like `https://random-name-123456.netlify.app`

### Step 4: (Optional) Customize your domain

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"** or use the free Netlify subdomain
3. Click **"Options"** → **"Edit site name"** to change the subdomain
   - Example: `mint-navigation.netlify.app`

---

## Option 2: Deploy via Netlify CLI

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify

```bash
netlify login
```

This will open a browser window to authorize the CLI.

### Step 3: Initialize and deploy

```bash
# Initialize Netlify in your project
netlify init

# Follow the prompts:
# - Create & configure a new site
# - Choose your team
# - Site name: mint-navigation (or your preferred name)
# - Build command: npm run build
# - Publish directory: .next

# Deploy to production
netlify deploy --prod
```

---

## Option 3: Deploy with Git Auto-Deploy (After initial setup)

Once you've connected your repository to Netlify:

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
3. Netlify will automatically rebuild and redeploy!

---

## Environment Variables (if needed in future)

If you add any API keys or secrets later:

1. Go to **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Add your variables (they'll be available during build)

---

## Troubleshooting

### Build fails with "command not found"

Make sure `netlify.toml` is in your repository root with:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Images not loading

Next.js images work automatically with Netlify's Next.js plugin. If you see issues:
1. Check that images are in the `public` folder
2. Use paths like `/images/photo.png` (without `public/`)

### Site shows 404 for routes

The Next.js plugin handles this automatically. If issues persist:
1. Make sure `@netlify/plugin-nextjs` is in `netlify.toml`
2. Redeploy the site

---

## Custom Domain Setup

### Using your own domain:

1. Go to **Site settings** → **Domain management** → **Add custom domain**
2. Enter your domain (e.g., `mint-portal.gov.et`)
3. Follow Netlify's DNS instructions:
   - Add an A record pointing to Netlify's load balancer
   - Or update nameservers to Netlify's DNS
4. Netlify will automatically provision an SSL certificate

---

## Monitoring and Analytics

- View deployment logs in the Netlify dashboard
- Enable analytics: **Site settings** → **Analytics**
- Monitor site performance and visitor stats

---

## Useful Netlify CLI Commands

```bash
# Check deployment status
netlify status

# Open site in browser
netlify open:site

# Open admin dashboard
netlify open:admin

# View deploy logs
netlify logs

# Rollback to previous deploy
netlify deploy --prod --trigger-deploy

# Run build locally to test
netlify build
```

---

## Cost

Netlify's free tier includes:
- ✅ 100 GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Automatic HTTPS
- ✅ Deploy previews
- ✅ Free subdomain
- ✅ Continuous deployment

This is more than enough for most government portals!

---

## Next Steps After Deployment

1. **Test your deployed site** - Click through all pages and features
2. **Update README** - Add your live site URL
3. **Set up monitoring** - Enable Netlify Analytics
4. **Share the link** - Give stakeholders access to the live site

Your site will be live at: `https://your-site-name.netlify.app` 🎉
