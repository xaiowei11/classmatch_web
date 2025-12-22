# backend/accounts/views_debug.py
# 臨時診斷用的 API

from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def debug_settings(request):
    """
    臨時診斷 API - 檢查當前設置
    部署後訪問：https://course-system-backend.onrender.com/api/debug-settings/
    """
    return Response({
        'DEBUG': settings.DEBUG,
        'CSRF_COOKIE_HTTPONLY': settings.CSRF_COOKIE_HTTPONLY,
        'CSRF_COOKIE_SAMESITE': settings.CSRF_COOKIE_SAMESITE,
        'CSRF_COOKIE_SECURE': settings.CSRF_COOKIE_SECURE,
        'SESSION_COOKIE_SAMESITE': settings.SESSION_COOKIE_SAMESITE,
        'SESSION_COOKIE_SECURE': settings.SESSION_COOKIE_SECURE,
        'CORS_ALLOWED_ORIGINS': settings.CORS_ALLOWED_ORIGINS,
        'CSRF_TRUSTED_ORIGINS': settings.CSRF_TRUSTED_ORIGINS,
        'ALLOWED_HOSTS': settings.ALLOWED_HOSTS,
    })