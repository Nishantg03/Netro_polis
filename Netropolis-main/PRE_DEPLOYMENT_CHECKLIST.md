# ✅ Pre-Deployment Checklist

Complete this checklist before deploying to Vercel.

## Repository & Code

- [ ] All code committed to GitHub
- [ ] No sensitive data in code (no hard-coded API keys, passwords)
- [ ] `.env` files are in `.gitignore`
- [ ] `requirements.txt` is UTF-8 encoded (not UTF-16)
- [ ] Frontend dependencies installed: `npm install` in `netropolis_frontend/`
- [ ] Backend dependencies installed: `pip install -r requirements.txt` in `netropolis_backend/`

## Environment Variables

### Backend (`netropolis_backend/.env`)
- [ ] `DB_NAME` set to database name
- [ ] `DB_USER` set to database user
- [ ] `DB_PASS` set to secure password
- [ ] `DB_HOST` set to database server address
- [ ] `DB_PORT` set to 5432 (or your PostgreSQL port)
- [ ] `DJANGO_SECRET_KEY` set to random secret (not production yet)
- [ ] `DEBUG=False` for production
- [ ] `GOOGLE_CLIENT_ID` set correctly
- [ ] `GOOGLE_CLIENT_SECRET` set correctly
- [ ] `QDRANT_HOST` set to vector database host
- [ ] `QDRANT_API_KEY` set correctly
- [ ] `PYTHON_VERSION=3.10` specified

### Frontend (`netropolis_frontend/.env`)
- [ ] `VITE_API_URL=http://localhost:8000` (for local testing)
- [ ] `VITE_GOOGLE_CLIENT_ID` set correctly

## External Services

### PostgreSQL Database
- [ ] PostgreSQL instance created/available
- [ ] Database name `netropolis` created (or your chosen name)
- [ ] Database user created with proper permissions
- [ ] Connection string tested locally
- [ ] Firewall allows connection from Vercel IPs (if cloud-hosted)

### Qdrant Vector Database
- [ ] Qdrant instance running (local or cloud)
- [ ] API key generated
- [ ] Connection tested locally
- [ ] Collections created/initialized

### Google OAuth
- [ ] Google Cloud project created
- [ ] OAuth 2.0 credentials generated
- [ ] Authorized redirect URIs configured:
  - `http://localhost:5173/callback` (local)
  - `https://your-vercel-domain.vercel.app/callback` (production)
- [ ] Client ID and secret stored securely

## Local Testing

### Backend
- [ ] Backend runs locally: `python manage.py runserver`
- [ ] Admin panel accessible: `http://localhost:8000/admin`
- [ ] API endpoints working: `http://localhost:8000/api/`
- [ ] Database migrations complete: `python manage.py migrate`
- [ ] No errors in console

### Frontend
- [ ] Frontend runs locally: `npm run dev`
- [ ] Frontend builds successfully: `npm run build`
- [ ] Can login with Google OAuth
- [ ] API calls complete successfully
- [ ] No CORS errors in console

## Vercel Setup

- [ ] Vercel account created (https://vercel.com)
- [ ] Vercel CLI installed: `npm install -g vercel`
- [ ] Logged in to Vercel: `vercel login`
- [ ] GitHub repository connected to Vercel

## Pre-Deployment Files

- [ ] `vercel.json` exists at project root
- [ ] `api/index.py` exists with Django WSGI wrapper
- [ ] `netropolis_backend/.env.example` up to date
- [ ] `netropolis_frontend/.env.example` up to date
- [ ] `DEPLOYMENT_GUIDE.md` reviewed
- [ ] `VERCEL_QUICKSTART.md` reviewed
- [ ] `requirements.txt` in UTF-8 format
- [ ] `.gitignore` includes `.env`, `.vercel/`, etc.

## Django Configuration

- [ ] `ALLOWED_HOSTS` in `settings.py` includes Vercel domain
- [ ] `CORS_ORIGIN_ALLOW_ALL = True` or specific origins set
- [ ] `DEBUG=False` for production
- [ ] Secret key is strong and unique
- [ ] Database backend set to PostgreSQL
- [ ] Email backend configured (if needed)
- [ ] Static files configuration correct

## Final Verification

- [ ] `python -m pip check` shows no conflicts
- [ ] `pip install -r requirements.txt --dry-run` succeeds
- [ ] `npm run build` succeeds in frontend directory
- [ ] No TypeScript/ESLint errors
- [ ] Git status clean: `git status`
- [ ] All changes committed and pushed to GitHub

## Deployment Steps

1. [ ] Verify all items above are checked
2. [ ] Run `vercel --prod` from project root
3. [ ] Wait for build to complete
4. [ ] Add environment variables in Vercel dashboard
5. [ ] Redeploy to apply environment variables
6. [ ] Test deployed application
7. [ ] Update `VITE_API_URL` to deployed backend
8. [ ] Run migrations on production database
9. [ ] Test all features on production

## Post-Deployment

- [ ] Frontend accessible at deployed URL
- [ ] API accessible at `/api/` endpoint
- [ ] Login with Google OAuth works
- [ ] Database queries working
- [ ] Search functionality working
- [ ] All API endpoints responsive
- [ ] No 500 errors in logs
- [ ] Set up monitoring/error tracking (Sentry, etc.)
- [ ] Set up automated backups for database

## Rollback Plan

- [ ] Know how to revert deployment on Vercel
- [ ] Database backup taken
- [ ] Previous working version tagged in Git
- [ ] Rollback procedures documented

---

**Note**: Keep this file updated as you add new environment variables or requirements.

**Next Steps**: Start with the 5-step quick start in `VERCEL_QUICKSTART.md` once all items are checked.
