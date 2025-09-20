# 🔒 Security Checklist for Deployment

## Environment Variables & Secrets

### ✅ Already Protected
- `.env` files are already in `.gitignore`
- `backend/.env` is already in `.gitignore`
- Database credentials should be set via environment variables
- JWT secrets should be set via environment variables

### ⚠️ Manual Review Required

**Before deploying, ensure these don't contain real credentials:**

1. **`backend/config.py`** - Check for any hardcoded credentials
2. **`backend/config_prod.py`** - Verify only environment variables are referenced
3. **`src/api-config.js`** - Contains placeholder URLs (safe)
4. **`vercel.json`** - Contains placeholder URLs (safe)
5. **`render.yaml`** - Contains service configuration (safe)

### 🔐 Production Security Setup

**For Render (Backend):**
- [ ] Set `SECRET_KEY` environment variable (generate random string)
- [ ] Set `JWT_SECRET_KEY` environment variable (generate random string)
- [ ] Set `DATABASE_URL` (provided by Render automatically)
- [ ] Set `FRONTEND_URL` to your actual Vercel domain
- [ ] Set `MAIL_USERNAME` and `MAIL_PASSWORD` if using email features
- [ ] Set `FLASK_ENV=production`

**For Vercel (Frontend):**
- [ ] Set `VITE_API_URL` to your Render backend URL (optional)
- [ ] No other secrets typically needed for frontend

## Files That Should Never Be Committed

### 🚫 Never Commit These
- `.env` files with real credentials
- `backend/.env` with real credentials
- Files containing API keys, passwords, or tokens
- Database backups with sensitive data
- Personal configuration files with secrets

### ✅ Safe to Commit
- `vercel.json` (contains only configuration, no secrets)
- `render.yaml` (contains only service config, no secrets)
- `backend/config_prod.py` (references env vars only)
- `src/api-config.js` (contains placeholder URLs)
- `DEPLOYMENT.md` (documentation only)

## Deployment Security Best Practices

### 🔒 HTTPS & SSL
- [ ] Ensure both Vercel and Render use HTTPS
- [ ] Verify SSL certificates are valid
- [ ] Test HTTPS redirects work properly

### 🛡️ CORS Configuration
- [ ] Update CORS settings in `backend/app.py` for production
- [ ] Restrict allowed origins to only your domains
- [ ] Enable credentials support only when necessary

### 🔐 Authentication
- [ ] Test JWT authentication works in production
- [ ] Verify password reset emails work
- [ ] Check session management

### 📊 Monitoring
- [ ] Set up error tracking (Sentry, LogRocket, etc.)
- [ ] Monitor for failed login attempts
- [ ] Set up database performance monitoring

### 🔄 Environment Separation
- [ ] Use different databases for dev/staging/production
- [ ] Use different email services for different environments
- [ ] Never use production credentials in development

## Pre-Deployment Security Audit

**Run these checks before deploying:**

1. **Environment Variables Check:**
   ```bash
   # Ensure no secrets are in your code
   grep -r "password\|secret\|key\|token" backend/ src/ --exclude-dir=.git
   ```

2. **Git History Check:**
   ```bash
   # Check if any secrets were accidentally committed
   git log --oneline -p | grep -i "password\|secret\|key\|token"
   ```

3. **File Permissions:**
   ```bash
   # Ensure sensitive files aren't world-readable
   find . -name "*.env*" -exec ls -la {} \;
   ```

4. **Dependency Audit:**
   ```bash
   # Frontend
   npm audit

   # Backend
   pip list --outdated
   ```

## Post-Deployment Verification

1. [ ] Test all API endpoints work
2. [ ] Verify database connections
3. [ ] Test user registration/login
4. [ ] Check CORS headers in browser dev tools
5. [ ] Verify SSL certificate is valid
6. [ ] Test password reset functionality
7. [ ] Check error handling and logging

## Emergency Procedures

**If credentials are exposed:**
1. Immediately revoke exposed credentials
2. Generate new secrets
3. Update environment variables
4. Redeploy services
5. Monitor for suspicious activity
6. Check logs for unauthorized access

---

**Remember:** Security is an ongoing process. Regularly review and update your security measures as your application evolves.

For more information:
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)
- [Flask Security Best Practices](https://flask.palletsprojects.com/en/2.0.x/security/)
- [React Security Best Practices](https://snyk.io/blog/10-react-security-best-practices/)
