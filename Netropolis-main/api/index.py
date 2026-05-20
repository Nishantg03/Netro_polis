"""
Vercel Serverless Function for Django Backend
This is the entry point for all API requests on Vercel
"""

import os
import sys
import django
from pathlib import Path

# Add the backend directory to the path
backend_dir = Path(__file__).parent.parent / "netropolis_backend"
sys.path.insert(0, str(backend_dir))

# Configure Django settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "netropolis_backend.settings")

# Setup Django
django.setup()

from django.core.wsgi import get_wsgi_application
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

# Get the WSGI application
wsgi_app = get_wsgi_application()


async def handler(request):
    """
    Main handler for all API requests
    Routes requests to Django application
    """
    # Handle CORS preflight
    if request.method == "OPTIONS":
        return JsonResponse({"status": "ok"}, status=200)

    # Route to Django app
    response = wsgi_app(request)
    return response
