# Deployment Guide

This guide will help you deploy the Thakshaka Interior Craftsmen website to production.

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- MongoDB Atlas account (free tier available)

## Step 1: MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account
   - Create a new project

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "M0 Free" tier
   - Select a cloud provider and region (closest to your users)
   - Click "Create"

3. **Configure Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and strong password
   - Set privileges to "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For production, click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `thakshaka` or your preferred database name
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/thakshaka?retryWrites=true&w=majority`

## Step 2: Prepare Your Code

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Generate JWT Secret**
   - Use a strong random string generator
   - Or run: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - Save this for Step 3

## Step 3: Deploy to Vercel

1. **Import Project**
   - Go to [Vercel](https://vercel.com)
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Import"

2. **Configure Environment Variables**
   - In the project settings, go to "Environment Variables"
   - Add the following variables:

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/thakshaka?retryWrites=true&w=majority
   JWT_SECRET=your-generated-jwt-secret-here
   ADMIN_EMAIL=admin@thakshaka.com
   ADMIN_PASSWORD=your-secure-admin-password
   NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=5
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be live at `https://your-project.vercel.app`

4. **Update Site URL**
   - After first deployment, update `NEXT_PUBLIC_SITE_URL` with your actual Vercel URL
   - Redeploy if needed

## Step 4: Custom Domain (Optional)

1. **Add Domain in Vercel**
   - Go to Project Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Environment Variable**
   - Update `NEXT_PUBLIC_SITE_URL` with your custom domain
   - Redeploy

## Step 5: Verify Deployment

1. **Test Public Pages**
   - Visit your site
   - Test all pages (Home, About, Services, Gallery, Contact)
   - Submit a test contact form

2. **Test Admin Dashboard**
   - Go to `/admin/login`
   - Login with your admin credentials
   - Verify you can see enquiries
   - Test adding/deleting gallery images

3. **Check MongoDB**
   - Go to MongoDB Atlas
   - Browse Collections
   - Verify enquiries are being saved
   - Verify gallery images are being stored

## Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Contact form submits successfully
- [ ] Admin login works
- [ ] Gallery images can be added/deleted
- [ ] Enquiries are visible in admin dashboard
- [ ] WhatsApp button works
- [ ] Mobile responsiveness verified
- [ ] SEO meta tags verified
- [ ] Environment variables are secure

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure `package.json` has correct dependencies

### MongoDB Connection Issues
- Verify connection string is correct
- Check network access settings in MongoDB Atlas
- Ensure database user has proper permissions

### Admin Login Not Working
- Verify `JWT_SECRET` is set
- Check admin credentials match environment variables
- Clear browser localStorage and cookies

### Images Not Loading
- Update `next.config.js` with your image domains
- Use absolute URLs for images
- Consider using an image hosting service (Cloudinary, AWS S3)

## Security Best Practices

1. **Change Default Credentials**
   - Use strong, unique passwords
   - Change admin email and password from defaults

2. **JWT Secret**
   - Use a long, random string
   - Never commit secrets to Git

3. **MongoDB**
   - Use strong database passwords
   - Limit network access when possible
   - Regularly rotate credentials

4. **Rate Limiting**
   - Adjust rate limits based on your needs
   - Monitor for abuse

## Monitoring

- Use Vercel Analytics (available in dashboard)
- Monitor MongoDB Atlas metrics
- Set up error tracking (Sentry, etc.)
- Monitor contact form submissions

## Backup

- MongoDB Atlas provides automatic backups (paid plans)
- Export enquiries regularly
- Keep gallery image URLs backed up

---

For support, refer to the main README.md file.
