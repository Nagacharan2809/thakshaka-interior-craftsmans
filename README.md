# Thakshaka Interior Craftsmen Website

A complete production-ready website for Thakshaka Interior Craftsmen - a carpentry and interior design business based in Hyderabad, India.

## Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, MongoDB
- **Fully Responsive**: Mobile and desktop optimized
- **SEO Optimized**: Meta tags and semantic HTML
- **Admin Dashboard**: Protected admin panel for managing enquiries and gallery
- **Contact Forms**: Rate-limited contact forms with MongoDB storage
- **Gallery Management**: Dynamic gallery with image upload/delete
- **Security**: Input validation, rate limiting, JWT authentication

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, CSS Modules
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB (MongoDB Atlas)
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Vercel (Frontend), MongoDB Atlas (Database)

## Project Structure

```
thakshakaS/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard pages
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── gallery/           # Gallery page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
├── lib/                   # Utility functions
├── models/                # MongoDB models
├── middleware.ts          # Next.js middleware
└── public/                # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd thakshakaS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb+srv://thakshaka_admin:<Nagacharan@2809>@cluster0.yflg6ke.mongodb.net/?appName=Cluster0

   # JWT Secret for Admin Authentication
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

   # Admin Credentials (change these in production)
   ADMIN_EMAIL=admin@thakshaka.com
   ADMIN_PASSWORD=change-this-password

   # Next.js
   NEXT_PUBLIC_SITE_URL=http://localhost:3000

   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=5
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## MongoDB Setup

### Using MongoDB Atlas (Recommended for Production)

1. Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and add it to `.env.local` as `MONGODB_URI`

### Database Collections

The application will automatically create the following collections:
- `enquiries` - Contact form submissions
- `gallery` - Gallery images
- `admins` - Admin users (created on first login)

## Admin Dashboard

### Accessing the Admin Dashboard

1. Navigate to `/admin/login`
2. Use the credentials from your `.env.local` file:
   - Email: `ADMIN_EMAIL`
   - Password: `ADMIN_PASSWORD`

### Admin Features

- **View Enquiries**: See all contact form submissions
- **Manage Gallery**: Add and delete gallery images
- **Secure Authentication**: JWT-based login system

## Deployment

### Frontend Deployment (Vercel)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `ADMIN_EMAIL`
     - `ADMIN_PASSWORD`
     - `NEXT_PUBLIC_SITE_URL` (your Vercel URL)
     - `RATE_LIMIT_WINDOW_MS`
     - `RATE_LIMIT_MAX_REQUESTS`
   - Deploy

### Database Deployment (MongoDB Atlas)

1. **Create MongoDB Atlas Cluster**
   - Sign up at MongoDB Atlas
   - Create a free tier cluster
   - Configure network access (allow all IPs or specific IPs)
   - Create database user

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Add to Vercel environment variables

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/thakshaka?retryWrites=true&w=majority
JWT_SECRET=generate-a-strong-random-secret-key
ADMIN_EMAIL=admin@thakshaka.com
ADMIN_PASSWORD=strong-secure-password
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

## Security Features

- **Input Validation**: All form inputs are validated on both client and server
- **Rate Limiting**: Contact forms are rate-limited to prevent spam
- **JWT Authentication**: Secure admin authentication
- **Environment Variables**: Sensitive data stored in environment variables
- **MongoDB Injection Protection**: Using Mongoose with proper schemas

## Customization

### Brand Colors

Update colors in `app/globals.css`:
- Primary: `#4b2e1e` (Dark wood brown)
- Secondary: `#f5e6d3` (Beige)
- Accent: `#caa472` (Gold)

### Business Information

Update business details in:
- `components/Footer.tsx` - Footer information
- `components/Navbar.tsx` - Phone number
- `components/WhatsAppButton.tsx` - WhatsApp number
- `app/layout.tsx` - SEO metadata

### Images

Replace placeholder images with your own:
- Update image URLs in components
- Or use an image hosting service (Cloudinary, AWS S3, etc.)
- Update `next.config.js` to allow your image domains

## API Endpoints

### Public Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/gallery` - Get gallery images

### Protected Endpoints (Require Admin Token)

- `POST /api/admin/login` - Admin login
- `GET /api/admin/enquiries` - Get all enquiries
- `POST /api/gallery` - Add gallery image (admin only)
- `DELETE /api/gallery?id=<id>` - Delete gallery image (admin only)

## Troubleshooting

### MongoDB Connection Issues

- Verify your `MONGODB_URI` is correct
- Check that your IP is whitelisted in MongoDB Atlas
- Ensure database user has proper permissions

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`

### Admin Login Not Working

- Verify `JWT_SECRET` is set in environment variables
- Check that admin credentials match `.env.local`
- Clear browser localStorage and try again

## Support

For issues or questions, please contact the development team.

## License

This project is proprietary and confidential.

---

**Built with ❤️ for Thakshaka Interior Craftsmen**
