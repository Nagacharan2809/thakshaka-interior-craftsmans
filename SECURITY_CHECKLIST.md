# Security Checklist & Deployment Guide

## ⚠️ CRITICAL: Before Going Live

### 1. Credentials & Secrets Management

- [ ] **MongoDB Password Changed**
  - Go to MongoDB Atlas > Database Access
  - Change the password for the database user
  - Update `MONGODB_URI` in Vercel environment variables

- [ ] **Admin Credentials Changed**
  - Change `ADMIN_EMAIL` in environment variables
  - Generate a new strong password
  - Never use default credentials

- [ ] **JWT Secret Generated**
  - Generate using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
  - Set `JWT_SECRET` in environment variables
  - Never commit to Git

- [ ] **Remove from Git History**
  - If credentials were committed, they are compromised
  - Run: `git rm --cached .env.local`
  - Create `.env.local` from `.env.example`
  - Ensure `.env.local` is in `.gitignore`

### 2. Environment Configuration

- [ ] **Production Environment Variables Set**
  ```
  MONGODB_URI=<production-mongodb-url>
  JWT_SECRET=<strong-random-secret>
  ADMIN_EMAIL=<strong-email>
  ADMIN_PASSWORD=<strong-password>
  NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
  RATE_LIMIT_WINDOW_MS=900000
  RATE_LIMIT_MAX_REQUESTS=5
  ```

- [ ] **No Secrets in Code**
  - Search codebase for hardcoded credentials
  - Check all `.ts`, `.tsx`, `.js` files
  - All secrets must come from environment variables

### 3. Database Security

- [ ] **MongoDB Network Access Limited**
  - For production: Whitelist specific IP addresses only
  - For development: Can use 0.0.0.0/0 but NEVER for production

- [ ] **Database User Permissions Minimal**
  - User should have only necessary permissions
  - Avoid "Admin" roles for application user
  - Use role-based access control

- [ ] **Connection String Secure**
  - Uses SSL/TLS (mongodb+srv://)
  - Not committed to Git
  - Updated in Vercel dashboard

### 4. Authentication & Authorization

- [ ] **Admin Login Page Protected**
  - MFA/2FA considered for production
  - Login attempts rate-limited against brute force
  - Sessions timeout after inactivity

- [ ] **JWT Tokens**
  - Expiration set to reasonable time (currently 7 days)
  - Token stored securely (localStorage for now)
  - Implement refresh tokens for enhanced security

- [ ] **API Routes Protected**
  - Admin endpoints require authentication
  - Public endpoints don't expose sensitive data

### 5. Input Validation

- [ ] **Server-side Validation**
  - All inputs validated on backend
  - String length limits enforced
  - Email/phone format validated
  - No HTML/JavaScript injection possible

- [ ] **Client-side Validation**
  - Form validation implemented
  - Provides better UX
  - Never rely on client-side validation alone

### 6. Rate Limiting

- [ ] **Contact Form Rate Limited**
  - 5 requests per IP per 15 minutes (configurable)
  - Prevents spam and abuse
  - Returns 429 Too Many Requests

- [ ] **Rate Limits Appropriate**
  - Monitor and adjust based on usage
  - Consider legitimate user traffic

### 7. HTTPS & Security Headers

- [ ] **HTTPS Enforced**
  - Vercel automatically provides HTTPS
  - All traffic encrypted in transit
  - API calls only over HTTPS

- [ ] **Security Headers Set**
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - X-XSS-Protection: 1; mode=block
  - Referrer-Policy: strict-origin-when-cross-origin

- [ ] **CORS Configured** (if needed)
  - Only allow trusted origins
  - Restrict to necessary methods

### 8. Image Security

- [ ] **Image URLs Validated**
  - Must be valid URLs
  - Consider URL length limits
  - Validate domain if using custom image hosting

- [ ] **Image Hosting**
  - Use reliable image hosting (Cloudinary, AWS S3)
  - Implement image optimization
  - Set proper cache headers

### 9. Error Handling

- [ ] **No Sensitive Information Leaked**
  - Error messages don't expose system details
  - Stack traces not visible to users
  - Consistent error responses

- [ ] **Logging Implemented**
  - Errors logged to central location
  - No sensitive data in logs
  - Logs regularly reviewed

### 10. Monitoring & Logging

- [ ] **Error Tracking Setup**
  - Sentry or similar service integrated
  - Alerted on critical errors
  - Performance metrics tracked

- [ ] **MongoDB Monitoring**
  - Connection issues detected
  - Performance metrics reviewed
  - Backup status verified

- [ ] **Application Analytics**
  - Vercel Analytics enabled
  - Track user behavior
  - Monitor performance

### 11. Backup & Recovery

- [ ] **Data Backup Plan**
  - MongoDB backup strategy defined
  - Regular exports of enquiries
  - Image metadata backed up
  - Recovery procedure tested

- [ ] **Incident Response Plan**
  - Contact information for clients
  - Steps to recover from outage
  - Communication plan

### 12. Deployment

- [ ] **Build Verification** 
  - Run: `npm run build`
  - No TypeScript errors
  - All dependencies installed

- [ ] **Local Testing**
  - All features tested locally
  - Mobile responsiveness verified
  - Admin dashboard functional

- [ ] **Staging Environment**
  - Deploy to staging first
  - Full QA in staging environment
  - Load testing if possible

- [ ] **Production Deployment**
  - Zero-downtime deployment
  - Database migrations completed
  - Rollback plan ready

### 13. Post-Deployment Testing

- [ ] **All Pages functional**
  - Home page loads
  - About page displays
  - Services page accessible
  - Gallery displays images
  - Contact form works

- [ ] **Admin Dashboard Works**
  - Login successful
  - Enquiries visible
  - Gallery management functional
  - Images can be added/deleted

- [ ] **External Features**
  - WhatsApp button functional
  - Email notifications (if implemented)
  - Form submissions saved

- [ ] **Performance**
  - Pages load in < 3 seconds
  - Images optimized
  - API responses fast

## 🔒 Ongoing Security Maintenance

### Weekly
- [ ] Check error logs
- [ ] Monitor rate limit exceptions
- [ ] Review admin activity

### Monthly
- [ ] Update dependencies: `npm update`
- [ ] Review security advisories: `npm audit`
- [ ] Backup database
- [ ] Review access logs

### Quarterly
- [ ] Rotate credentials
- [ ] Security audit
- [ ] Performance review
- [ ] Backup verification

### Annually
- [ ] Full security assessment
- [ ] Penetration testing (recommended)
- [ ] Architecture review
- [ ] Compliance check

## 🚨 Emergency Response

### Website Down
1. Check Vercel dashboard for build status
2. Check MongoDB Atlas connection
3. Review error logs
4. Restart deployment if needed
5. Communicate with users

### Security Breach Suspected
1. Disable affected credentials immediately
2. Rotate all secrets
3. Audit access logs
4. Restore from backup if necessary
5. Notify users if data exposed

### Database Compromised
1. Restore from backup
2. Reset all account passwords
3. Implement 2FA
4. Review access logs
5. Implement additional monitoring

## Dependency Vulnerabilities

### Check Regularly
```bash
npm audit
npm audit fix
```

### Update Dependencies
```bash
npm update
npm install --save-dev @latest versions
```

### Monitor
- GitHub Dependabot alerts
- npm security advisories
- TypeScript updates
- Next.js security patches

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MongoDB Security](https://docs.mongodb.com/manual/security/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [Vercel Security](https://vercel.com/security)

---

**Last Updated**: April 2026
**Version**: 1.0.0
