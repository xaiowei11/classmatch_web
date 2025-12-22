from pathlib import Path
import os
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# ===== 修改 1: 使用環境變量 =====
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-yh=a&t#9kri&a_#!!_$fu9q2$f)za^g8o$6b=bai-b3aot%+*j')

# ===== 修改 2: DEBUG 使用環境變量 =====
DEBUG = os.environ.get('DEBUG', 'False') == 'True'

# ===== 修改 3: ALLOWED_HOSTS 使用環境變量 =====
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

# Render 會自動添加這個環境變量
RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'accounts',
]

# ===== 修改 4: 添加 WhiteNoise 中間件 =====
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

# ===== 修改 5: CORS 支持環境變量 =====
default_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

env_origins = os.environ.get('CORS_ALLOWED_ORIGINS', '')
if env_origins:
    CORS_ALLOWED_ORIGINS = env_origins.split(',')
else:
    CORS_ALLOWED_ORIGINS = default_origins

CORS_ALLOW_CREDENTIALS = True

# ===== 修改 6: Session 設定支持生產環境 =====
SESSION_COOKIE_SAMESITE = "None" if not DEBUG else "Lax"
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SECURE = not DEBUG
SESSION_COOKIE_DOMAIN = '.onrender.com' if not DEBUG else None  # ← 新增：不限制域名
SESSION_COOKIE_AGE = 86400

# ===== 修改 7: CSRF 設定支持環境變量 =====
default_csrf_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

env_csrf_origins = os.environ.get('CSRF_TRUSTED_ORIGINS', '')
if env_csrf_origins:
    CSRF_TRUSTED_ORIGINS = env_csrf_origins.split(',')
else:
    CSRF_TRUSTED_ORIGINS = default_csrf_origins

CSRF_COOKIE_SAMESITE = "None" if not DEBUG else "Lax"
CSRF_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_HTTPONLY = False  # ← 關鍵！必須是 False，允許 JavaScript 讀取
CSRF_COOKIE_DOMAIN = '.onrender.com' if not DEBUG else None # ← 新增：不限制域名
CSRF_USE_SESSIONS = False  # ← 新增：使用 Cookie 而不是 Session
CSRF_COOKIE_NAME = 'csrftoken'  # ← 新增：明確指定名稱

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny', 
    ]
}

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# ===== 修改 8: 數據庫配置支持 PostgreSQL =====
DATABASE_URL = os.environ.get('DATABASE_URL')

if DATABASE_URL:
    DATABASES = {
        'default': dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=600,
            conn_health_checks=True,
        )
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'zh-hant'
TIME_ZONE = 'Asia/Taipei'
USE_I_18N = True
USE_TZ = True

# ===== 修改 9: 靜態文件配置 =====
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'