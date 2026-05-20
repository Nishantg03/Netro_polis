# Netropolis Vercel Deployment Guide

## Overview
This project is configured for Vercel deployment with:
- **Frontend**: React + Vite (hosted as static site)
- **Backend**: Django REST API (serverless functions)

## Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository access
- PostgreSQL database (required for production)
- Qdrant vector database (required for search functionality)

## Deployment Steps

### 1. Prepare Environment Variables

Copy the example files and update with your actual values:

**Backend (.env)**
```bash
DB_NAME=netropolis
DB_USER=netropolis_user
DB_PASS=your_secure_password
DB_HOST=your_postgres_host.com
DB_PORT=5432
DJANGO_SECRET_KEY=your_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
QDRANT_HOST=your_qdrant_host
QDRANT_API_KEY=your_qdrant_api_key
```

**Frontend (.env)**
```bash
VITE_API_URL=https://your-vercel-deployment.vercel.app/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 2. Connect to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel
```

### 3. Configure Vercel Project Settings

In Vercel Dashboard:

1. **Settings → Environment Variables**
   - Add all variables from `.env` file
   - Add PYTHON_VERSION=3.10

2. **Settings → Build & Deployment**
   - Build Command: `npm run build --prefix netropolis_frontend`
   - Output Directory: `netropolis_frontend/dist`
   - Framework Preset: Vite

3. **Settings → Functions**
   - Runtime: Python 3.10

### 4. Database Configuration

For production PostgreSQL database:
- Update `DB_HOST`, `DB_USER`, `DB_PASS` in Vercel environment variables
- Ensure database is accessible from Vercel (allow Vercel IPs in firewall)
- Run migrations (see below)

### 5. Run Django Migrations

After first deployment, run migrations:

```bash
# Locally with production database
DJANGO_SETTINGS_MODULE=netropolis_backend.settings python manage.py migrate
```

Or setup a migration function in `/api/migrate.py` to run on deploy.

### 6. Update API Endpoint

Update frontend to use the deployed API:

```bash
VITE_API_URL=https://your-project.vercel.app/api
```

## Project Structure

```
Netropolis-main/
├── api/                          # Serverless functions
│   └── index.py                 # Django WSGI entry point
├── netropolis_backend/          # Django backend
│   ├── manage.py
│   ├── requirements.txt
│   ├── netropolis_backend/      # Django project settings
│   │   ├── settings.py
│   │   ├── wsgi.py
│   │   ├── asgi.py
│   │   └── urls.py
│   └── backend/                 # Django app
├── netropolis_frontend/         # React + Vite frontend
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
├── vercel.json                  # Root Vercel configuration
├── DEPLOYMENT_GUIDE.md          # This file
└── .env.example                 # Environment variables template
```

## Troubleshooting

### Build Fails with Python Import Errors
- Check `requirements.txt` is in UTF-8 encoding
- Verify all packages are listed correctly
- Run locally: `pip install -r requirements.txt`

### CORS Errors
- CORS is enabled in Django settings
- Vercel routes include CORS headers

### Database Connection Errors
- Verify database credentials in environment variables
- Check database firewall allows Vercel IPs
- Test connection locally first

### Static Files Not Loading
- Frontend builds to `dist/` directory
- Vercel routes static requests correctly
- Clear Vercel cache if needed: `vercel env pull && vercel build --prod`

## Local Development

### Backend
```bash
cd netropolis_backend
python -m venv venv
source venv/Scripts/activate  # Windows: venv\Scripts\activate.bat
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd netropolis_frontend
npm install
npm run dev
```

Visit http://localhost:5173 (frontend) and http://localhost:8000 (backend)

## Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `DB_NAME` | Database name | netropolis |
| `DB_USER` | Database user | netropolis_user |
| `DB_PASS` | Database password | SecurePass123! |
| `DB_HOST` | Database host | db.example.com |
| `DB_PORT` | Database port | 5432 |
| `DJANGO_SECRET_KEY` | Django secret | random_string_here |
| `QDRANT_HOST` | Vector DB host | https://qdrant.example.com |
| `QDRANT_API_KEY` | Vector DB API key | api_key_here |
| `GOOGLE_CLIENT_ID` | Google OAuth ID | xxx.apps.googleusercontent.com |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | GOCSPX-xxx |
| `VITE_API_URL` | Frontend API endpoint | https://app.vercel.app/api |

## Performance Optimization

### Frontend
- Uses Vite for fast builds
- Images optimized via Vercel CDN
- Code splitting configured

### Backend
- Serverless functions automatically scale
- Cold start time ~5-10 seconds
- Database connection pooling recommended
- Cache API responses where possible

## Security Best Practices

1. **Never commit `.env` files** - use Vercel environment variables only
2. **Enable HTTPS** - automatic on Vercel
3. **Set `DEBUG=False`** in production
4. **Use strong `DJANGO_SECRET_KEY`** - generate with: `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'`
5. **Rotate API keys regularly**
6. **Use environment-specific values** for credentials

## Monitoring

- Use Vercel Analytics dashboard
- Monitor function execution time
- Set up error tracking (Sentry recommended)
- Enable Vercel logs: `vercel logs`

## Additional Resources

- [Vercel Docs](https://vercel.com/docs)
- [Django Deployment](https://docs.djangoproject.com/en/5.0/howto/deployment/)
- [React Deployment](https://react.dev/learn/start-a-new-react-project#production-tooling)

## Support

For deployment issues:
1. Check Vercel build logs: `vercel logs`
2. Review Django error logs
3. Test locally first before pushing
4. Check database connectivity

