# 🚀 Vercel Deployment Quick Start

This guide walks you through deploying Netropolis to Vercel in minutes.

## Prerequisites Checklist

- [ ] GitHub repository with this code
- [ ] Vercel account (https://vercel.com - sign up with GitHub)
- [ ] PostgreSQL database (local or cloud)
- [ ] Qdrant vector database (local or cloud)
- [ ] Google OAuth credentials (from Google Cloud Console)

## What's Been Set Up

✅ **Root `vercel.json`** - Configures both frontend and backend routes  
✅ **`/api/index.py`** - Django serverless entry point  
✅ **Environment templates** - `.env.example` files with all variables  
✅ **Deployment guide** - `DEPLOYMENT_GUIDE.md` for detailed info  
✅ **Setup scripts** - Automated setup for Windows/Linux

## Quick Start (5 steps)

### 1️⃣ **Prepare Environment Variables**

**Backend** (`netropolis_backend/.env`):
```env
DB_NAME=netropolis
DB_USER=your_db_user
DB_PASS=your_db_password
DB_HOST=your_db_host.com
DB_PORT=5432
DJANGO_SECRET_KEY=your-random-secret-key
GOOGLE_CLIENT_ID=your_google_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_secret
QDRANT_HOST=your_qdrant_host
QDRANT_API_KEY=your_qdrant_key
DEBUG=False
```

**Frontend** (`netropolis_frontend/.env`):
```env
VITE_API_URL=http://localhost:8000
VITE_GOOGLE_CLIENT_ID=your_google_id.apps.googleusercontent.com
```

### 2️⃣ **Install Vercel CLI**
```bash
npm install -g vercel
```

### 3️⃣ **Login to Vercel**
```bash
vercel login
```

### 4️⃣ **Deploy**
```bash
# From project root
vercel --prod
```

### 5️⃣ **Update Vercel Environment Variables**

After first deployment:
1. Go to https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Add all variables from your `.env` file
5. Redeploy: `vercel --prod`

---

## After Deployment

### Update Frontend API URL
Change `netropolis_frontend/.env`:
```env
VITE_API_URL=https://your-project.vercel.app/api
```

### Run Django Migrations
```bash
# From local machine connected to production database
DJANGO_SETTINGS_MODULE=netropolis_backend.settings python manage.py migrate
```

---

## Project Structure

```
Netropolis-main/
├── api/                     ← Serverless functions
│   └── index.py            ← Django entry point
├── netropolis_backend/     ← Django API
├── netropolis_frontend/    ← React + Vite frontend
├── vercel.json             ← Root Vercel config
├── DEPLOYMENT_GUIDE.md     ← Full deployment guide
└── setup-vercel.sh/.bat    ← Automated setup
```

---

## URLs After Deployment

- **Frontend**: `https://your-project.vercel.app`
- **API**: `https://your-project.vercel.app/api`
- **API Docs**: `https://your-project.vercel.app/api/api/schema/swagger-ui/`

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Build fails** | Check `requirements.txt` is UTF-8, run `pip install -r requirements.txt` locally first |
| **CORS errors** | Configured in Django and Vercel, check `ALLOWED_HOSTS` in settings.py |
| **Database connection fails** | Verify credentials and firewall allows Vercel IPs |
| **Static files 404** | Frontend builds to `dist/`, Vercel routes configured |
| **Functions timeout** | Reduce database queries, add caching, increase timeout |

---

## Environment Variables Reference

### Backend Required
- `DB_NAME`, `DB_USER`, `DB_PASS`, `DB_HOST`, `DB_PORT` - PostgreSQL
- `DJANGO_SECRET_KEY` - Django secret (generate with `python manage.py shell` → `from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())`)
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` - OAuth
- `QDRANT_HOST`, `QDRANT_API_KEY` - Vector database
- `DEBUG=False` - Production setting
- `PYTHON_VERSION=3.10` - Vercel Python version

### Frontend Required
- `VITE_API_URL` - Backend API URL
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth ID

---

## Local Development

### Backend
```bash
cd netropolis_backend
python -m venv venv
source venv/Scripts/activate  # Windows: venv\Scripts\activate.bat
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver  # http://localhost:8000
```

### Frontend
```bash
cd netropolis_frontend
npm install
npm run dev  # http://localhost:5173
```

---

## Next Steps

1. ✅ Complete the 5-step quick start above
2. 📖 Read `DEPLOYMENT_GUIDE.md` for advanced configuration
3. 🔍 Monitor deployment at https://vercel.com/dashboard
4. 🐛 Check logs: `vercel logs`
5. 📊 Set up error tracking (Sentry recommended)

---

## Support

- Vercel docs: https://vercel.com/docs
- Django deployment: https://docs.djangoproject.com/en/5.0/howto/deployment/
- Issues? Check the `DEPLOYMENT_GUIDE.md` for detailed troubleshooting

**Happy deploying! 🎉**
