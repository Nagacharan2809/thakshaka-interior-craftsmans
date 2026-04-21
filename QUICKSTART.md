# Quick Start Guide

Get your Thakshaka Interior Craftsmen website up and running in minutes!

## Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/thakshaka?retryWrites=true&w=majority
JWT_SECRET=your-random-secret-key-here
ADMIN_EMAIL=admin@thakshaka.com
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

**Quick MongoDB Setup:**
- Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get your connection string
- Replace `<password>` and `<dbname>` in the connection string

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Access Admin Dashboard

1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Login with:
   - Email: `admin@thakshaka.com` (or your ADMIN_EMAIL)
   - Password: `admin123` (or your ADMIN_PASSWORD)

## First Steps After Setup

1. **Test Contact Form**
   - Go to Contact page
   - Submit a test enquiry
   - Check admin dashboard to see the enquiry

2. **Add Gallery Images**
   - Login to admin dashboard
   - Go to Gallery tab
   - Add images using image URLs
   - Images will appear on the Gallery page

3. **Customize Content**
   - Update business information in components
   - Replace placeholder images
   - Customize colors in `app/globals.css`

## Common Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Project Structure Overview

```
thakshakaS/
├── app/                    # Pages and API routes
│   ├── api/               # Backend API endpoints
│   ├── admin/             # Admin dashboard
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── gallery/           # Gallery page
│   ├── contact/           # Contact page
│   └── page.tsx           # Home page
├── components/            # Reusable React components
├── lib/                   # Utility functions
├── models/                # MongoDB schemas
└── public/                # Static files
```

## Next Steps

- Read [README.md](README.md) for detailed documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Customize the website with your content
- Deploy to Vercel when ready

## Need Help?

- Check the main README.md for troubleshooting
- Review DEPLOYMENT.md for production setup
- Verify environment variables are set correctly
- Check MongoDB connection string format

---

Happy coding! 🚀
