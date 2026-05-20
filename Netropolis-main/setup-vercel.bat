@echo off
REM Quick setup for Vercel deployment on Windows

echo.
echo Netropolis Vercel Deployment Setup
echo ====================================
echo.

echo Step 1: Setting up environment files
if not exist "netropolis_backend\.env" (
    copy "netropolis_backend\.env.example" "netropolis_backend\.env"
    echo Created netropolis_backend\.env - UPDATE WITH YOUR VALUES
) else (
    echo netropolis_backend\.env already exists
)

if not exist "netropolis_frontend\.env" (
    copy "netropolis_frontend\.env.example" "netropolis_frontend\.env"
    echo Created netropolis_frontend\.env - UPDATE WITH YOUR VALUES
) else (
    echo netropolis_frontend\.env already exists
)

echo.
echo Step 2: Install dependencies
echo Installing Node dependencies...
cd netropolis_frontend
call npm install
cd ..

echo.
echo Step 3: Deploy to Vercel
echo Run: npm install -g vercel
echo Then: vercel --prod
echo.
echo For detailed instructions, see DEPLOYMENT_GUIDE.md
pause
