# Deployment Guide - Gene Therapy Consultancy Website

## Quick Start - Getting Your Website Online

Your website is complete and ready to deploy! Here are the easiest ways to get it online so you can scan the QR code and view it on mobile.

---

## Option 1: Deploy to GitHub Pages (FREE & EASIEST)

### Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com) and sign in (or create account)
2. Click "+" in top right → "New repository"
3. Name it: `gene-therapy-consultancy`
4. Make it Public
5. Click "Create repository"

### Step 2: Upload Your Files
1. Click "uploading an existing file"
2. Drag all your project files into the upload area:
   - All .html files
   - css/ folder
   - js/ folder
   - assets/ folder (if you have one)
3. Scroll down and click "Commit changes"

### Step 3: Enable GitHub Pages
1. Go to repository Settings
2. Scroll down to "Pages" in left sidebar
3. Under "Source", select "main" branch
4. Click "Save"
5. Wait 1-2 minutes

### Step 4: Get Your URL
Your website will be at:
```
https://YOUR-USERNAME.github.io/gene-therapy-consultancy/
```

### Step 5: Update QR Code
1. Open `mobile-qr-code.html` in browser
2. Enter your GitHub Pages URL in the "Custom URL Generator"
3. Click "Generate"
4. Scan the new QR code!

---

## Option 2: Deploy to Netlify (FREE & FAST)

### Step 1: Go to Netlify
1. Visit [netlify.com](https://netlify.com)
2. Sign up for free account
3. Click "Add new site" → "Deploy manually"

### Step 2: Upload Your Files
1. Drag your entire project folder into the upload area
2. Wait for deployment (usually 30 seconds)
3. Netlify gives you a URL like: `random-name-123.netlify.app`

### Step 3: Custom Domain (Optional)
1. Click "Domain settings"
2. Change site name to: `gene-therapy-consultancy`
3. Your URL becomes: `gene-therapy-consultancy.netlify.app`

### Step 4: Update QR Code
1. Open `mobile-qr-code.html` in browser
2. Enter your Netlify URL in the "Custom URL Generator"
3. Click "Generate"
4. Scan the QR code!

---

## Option 3: Deploy to Vercel (FREE)

### Step 1: Install Vercel CLI (if you have Node.js)
```bash
npm i -g vercel
```

### Step 2: Deploy
```bash
cd your-project-folder
vercel
```

### Step 3: Follow Prompts
- Set up and deploy? Yes
- Which scope? Your account
- Link to existing project? No
- Project name? gene-therapy-consultancy
- Directory? ./
- Override settings? No

### Your URL:
```
https://gene-therapy-consultancy.vercel.app
```

---

## Option 4: Use Your Own Domain

If you already have a domain (like genetherapyconsultancy.com):

### With Netlify:
1. Deploy to Netlify (see Option 2)
2. Go to "Domain settings"
3. Click "Add custom domain"
4. Enter your domain
5. Follow DNS instructions

### With GitHub Pages:
1. Deploy to GitHub Pages (see Option 1)
2. Add file named `CNAME` to repository
3. Put your domain inside (e.g., `genetherapyconsultancy.com`)
4. Update your domain's DNS:
   - Type: A
   - Host: @
   - Value: 185.199.108.153
   - Add 3 more A records with:
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

---

## Testing the QR Code

### After Deployment:

1. **Open mobile-qr-code.html**
   ```
   Open: file:///path/to/mobile-qr-code.html
   ```

2. **Enter Your Deployed URL**
   - In the "Custom URL Generator" field
   - Example: `https://gene-therapy-consultancy.netlify.app`
   - Click "Generate"

3. **Test the QR Code**
   - Open phone camera
   - Point at QR code
   - Tap notification
   - Website should open!

---

## Troubleshooting

### QR Code Shows 404
**Problem:** URL in QR code doesn't exist yet  
**Solution:** Deploy website first, then generate QR code with deployed URL

### Files Not Loading
**Problem:** CSS/JS files returning 404  
**Solution:** Check file paths are relative (e.g., `css/style.css` not `/css/style.css`)

### Images Not Showing
**Problem:** Image URLs are absolute paths  
**Solution:** 
- Use relative paths: `assets/images/logo.png`
- Or use full URLs: `https://yourdomain.com/assets/images/logo.png`

### GitHub Pages Not Working
**Problem:** Site not appearing after enabling  
**Solution:** 
- Wait 2-5 minutes
- Check Settings → Pages for any errors
- Ensure repository is public

### Mobile Menu Not Working
**Problem:** Navigation doesn't open on mobile  
**Solution:** 
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check browser console for JavaScript errors

---

## Recommended: Custom Domain Setup

Once your site is live, consider getting a custom domain:

### Best Domain Registrars:
1. **Namecheap** - $8-12/year
2. **Google Domains** - $12/year
3. **Cloudflare** - $8-10/year

### Suggested Domains:
- genetherapyconsultancy.com
- gtc-consulting.com
- gtconsulting.com
- genetherapyintelligence.com

---

## Quick Deployment Checklist

Before deploying:
- [ ] All HTML files present
- [ ] CSS folder with all stylesheets
- [ ] JS folder with all scripts
- [ ] Images optimized and in assets folder
- [ ] Test all links locally
- [ ] Check mobile responsiveness
- [ ] Update contact email in all forms
- [ ] Test contact forms

After deploying:
- [ ] Visit deployed URL
- [ ] Test all pages
- [ ] Test mobile navigation
- [ ] Test contact forms
- [ ] Generate QR code with deployed URL
- [ ] Test QR code on phone
- [ ] Share with team!

---

## Current File Structure

```
gene-therapy-consultancy/
├── index.html
├── about.html
├── method.html
├── services.html
├── insights.html
├── contact.html
├── mobile-qr-code.html
├── css/
│   ├── style.css
│   ├── mobile-enhancements.css
│   ├── blog-leadmagnet.css
│   └── expert-modal.css
├── js/
│   ├── script.js
│   ├── blog-system.js
│   ├── lead-magnet.js
│   └── expert-modal.js
└── assets/
    └── images/
        └── (your images)
```

---

## Next Steps

1. **Choose deployment method** (GitHub Pages recommended for beginners)
2. **Deploy your website**
3. **Get your live URL**
4. **Generate QR code** with live URL
5. **Test on mobile**
6. **Share with the world!**

---

## Need Help?

### Resources:
- **GitHub Pages:** https://pages.github.com/
- **Netlify Docs:** https://docs.netlify.com/
- **Vercel Docs:** https://vercel.com/docs

### Common Issues:
- If CSS isn't loading: Check file paths
- If forms don't work: Add backend integration
- If QR code fails: Regenerate with correct URL

---

## Summary

**Fastest Method:** Netlify (drag & drop, done in 1 minute)  
**Free & Reliable:** GitHub Pages (free forever)  
**Most Control:** Your own hosting + custom domain

Choose the method that works best for you, deploy, and your website will be live with a scannable QR code for mobile testing!

**Pro Tip:** Start with Netlify for instant deployment, then move to custom domain later when ready.
