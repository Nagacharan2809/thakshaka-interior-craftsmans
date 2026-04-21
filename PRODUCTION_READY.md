# Production Deployment Guide - Ready to Deploy

✅ **Project Status**: PRODUCTION READY - Build successful, all critical issues fixed

## Quick Summary of Changes Made

This project has been hardened for production with:
- ✅ Security issues fixed (removed exposed credentials)
- ✅ Input validation enhanced  
- ✅ Error handling improved
- ✅ Security headers added
- ✅ Admin dashboard improved with error feedback
- ✅ Build verified and passing (npm run build successful)

## Immediate Action Items (DO THIS NOW)

### 1. Fix Critical Security Issue (URGENT ⚠️)

Your MongoDB password and admin credentials were exposed in the repository. **They must be changed immediately:**

**Step 1: Change MongoDB Password**
```
1. Go to MongoDB Atlas: https://www.mongodb.com/cloud/atlas
2. Click on "Database Access" (left sidebar)
3. Find your database user
4. Click "Edit" and change the password
5. Copy the new connection string
6. Update MONGODB_URI in your environment variables
```

**Step 2: Change Admin Credentials**
```
Generate strong new credentials:
- Email: Use a different email than any existing admin one
- Password: Use a strong password (20+ characters with mixed case, numbers, symbols)
```

**Step 3: Generate JWT Secret**
```bash
# Run this command to generate a secure key:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Copy the output and use it as JWT_SECRET
```

### 2. Deploy to Vercel

#### Option A: Deploy Directly (Fastest)

1. **Push code to GitHub** (if using Git)
   ```bash
   git add .
   git commit -m "Production deployment - security hardened"
   git push origin main
   ```

2. **Create Vercel Account** (if you don't have one)
   - Go to https://vercel.com
   - Sign up with GitHub

3. **Deploy**
   - Click "Add New Project"
   - Import your GitHub repository  
   - Click "Import"

4. **Set Environment Variables in Vercel**
   - Go to Settings > Environment Variables
   - Add these variables with your actual values:
   ```
   MONGODB_URI=mongodb+srv://<username>:<NEW_PASSWORD>@<cluster>.mongodb.net/?appName=Cluster0
   JWT_SECRET=<your-generated-secret-from-step-2>
   ADMIN_EMAIL=<new-email>
   ADMIN_PASSWORD=<new-strong-password>
   NEXT_PUBLIC_SITE_URL=https://your-vercel-url.vercel.app
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=5
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~5 minutes)
   - Your site will be live!

#### Option B: Deploy from Local Machine

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Follow the prompts and enter your environment variables
```

### 3. Update .env.local Locally

Replace the placeholder values with your actual new credentials:

```
⚠️ NEVER commit this file!
✅ It's in .gitignore - keep it that way
```

Update your local `.env.local`:
```env
MONGODB_URI=mongodb+srv://username:NEW_PASSWORD@cluster.mongodb.net/?appName=Cluster0
JWT_SECRET=<your-generated-secret>
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=YourNewPassword123!@#
NEXT_PUBLIC_SITE_URL=https://your-production-url.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

## Verification Checklist

After deployment, test these items:

### Website Pages
- [ ] Home page loads (check at `/`)
- [ ] About page displays correctly (check at `/about`)
- [ ] Services page shows services (check at `/services`)
- [ ] Gallery loads images (check at `/gallery`)
- [ ] Contact page displays (check at `/contact`)

### Admin Dashboard
- [ ] Navigate to `https://your-domain.com/admin/login`
- [ ] Login with your NEW credentials
- [ ] View "Enquiries" tab
- [ ] Click "Gallery" tab
- [ ] Try adding an image URL (test with: `https://images.unsplash.com/photo-1565182999961-e77da32d6f28?w=400`)
- [ ] Delete the test image
- [ ] Logout works

### Contact Form
- [ ] Fill out contact form with test data
- [ ] Submit should say "Thank you for your enquiry!"
- [ ] Check admin dashboard - enquiry should appear
- [ ] Try submitting again within seconds - should say "Too many requests"

### Mobile
- [ ] Test on mobile device (use Chrome DevTools phone preview)
- [ ] All pages responsive
- [ ] Forms work on mobile
- [ ] WhatsApp button clickable

## Performance Optimizations (After Launch)

- [ ] Update Facebook/Open Graph images in `app/layout.tsx`
- [ ] Update WhatsApp number in `components/WhatsAppButton.tsx`
- [ ] Update business phone/email in `components/Footer.tsx` and `components/Navbar.tsx`
- [ ] Update business address in `app/contact/page.tsx`
- [ ] Replace placeholder images with real business images

## Ongoing Maintenance

### Weekly
- [ ] Check Vercel dashboard for errors
- [ ] Review contact form submissions
- [ ] Monitor admin dashboard

### Monthly  
- [ ] Update dependencies: `npm update`
- [ ] Check security updates: `npm audit`
- [ ] Backup enquiries (export from MongoDB Atlas)

### Quarterly
- [ ] Rotate admin password
- [ ] Update JWT_SECRET  
- [ ] Full security review

## Important Security Notes

1. **Never share these credentials:**
   - MongoDB URI
   - JWT_SECRET
   - Admin email/password
   - Vercel deployment tokens

2. **Keep .env.local out of Git:**
   - Already in .gitignore
   - Never commit environment files

3. **Change Defaults:**
   - Default admin email and password are no longer valid
   - Use your new credentials from Step 1

4. **Monitor Access:**
   - Check MongoDB Atlas "Event Log"
   - Review Vercel deployment logs for errors
   - Monitor contact form for spam

## Troubleshooting

### "MongoDB Connection Failed"
- Verify MONGODB_URI is correct
- Check MongoDB Atlas network access (should allow 0.0.0.0/0 or your Vercel IP)
- Confirm database user exists and has correct permissions

### "Admin Login Not Working"
- Verify JWT_SECRET is set in Vercel environment variables
- Try clearing browser localStorage (Admin > Application > Local Storage > Clear)
- Check that ADMIN_EMAIL and ADMIN_PASSWORD match your new credentials

### "Build Failed on Vercel"
- Check Vercel build logs for errors
- Ensure all environment variables are set
- Run `npm run build` locally to verify

### "Images Not Loading"
- Images come from URLs, not uploaded servers
- Make sure image URLs are public and HTTPS
- Update gallery with valid image URLs (e.g., from Unsplash or your image hosting)

## API Endpoints Reference

### Public (No Auth Required)
- `POST /api/contact` - Submit contact form
- `GET /api/gallery` - Get all gallery images

### Protected (Requires JWT Token)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/enquiries` - Get all enquiries
- `POST /api/gallery` - Add gallery image
- `DELETE /api/gallery?id=<id>` - Delete gallery image

## Support & Documentation

- **Deployment**: See DEPLOYMENT.md
- **Security**: See SECURITY_CHECKLIST.md  
- **README**: See README.md for full documentation
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Docs**: https://docs.mongodb.com

## Current Build Status

```
Build: ✅ SUCCESSFUL
- All pages compiled
- API routes ready
- Security headers enabled
- Input validation active
- Error handling implemented
- Rate limiting active
- 0 critical errors
```

---

**🚀 Next Step**: Follow the "Immediate Action Items" section above to deploy!

**Need help?** Re-read this file or check the SECURITY_CHECKLIST.md and DEPLOYMENT.md files.

**Last Updated**: April 2026
