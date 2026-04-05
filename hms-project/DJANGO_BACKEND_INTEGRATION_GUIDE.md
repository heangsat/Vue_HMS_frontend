# Django Backend Integration Guide (Vue HMS Frontend)

This guide explains how to integrate your current Vue frontend (`hms-project`) with a Django backend.

## 1. Recommended Backend Stack

Use this Django stack for your Hospital Management System:

- `Django`
- `Django REST Framework` (API)
- `django-cors-headers` (CORS for Vue app)
- `djangorestframework-simplejwt` (JWT auth)
- `mysqlclient` or `PyMySQL` (MySQL connection)

## 2. Backend Project Setup

### 2.1 Create backend project

```bash
mkdir hms_backend && cd hms_backend
python -m venv .venv
source .venv/bin/activate
pip install django djangorestframework django-cors-headers djangorestframework-simplejwt mysqlclient

django-admin startproject config .
python manage.py startapp hospital
```

### 2.2 Configure `settings.py`

Add installed apps:

```python
INSTALLED_APPS = [
    ...,
    'corsheaders',
    'rest_framework',
    'hospital',
]
```

Add middleware near top:

```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...,
]
```

Configure CORS for frontend dev server:

```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
]
```

Configure DRF + JWT:

```python
from datetime import timedelta

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
}
```

Configure MySQL DB:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'your_db_name',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}
```

## 3. Model Structure for Your Tables

Create models matching your schema:

- `Doctor`
- `Patient`
- `Department`
- `Medicine`
- `MedicalRecord`
- `Prescription`
- `PrescriptionDetail`
- `Staff`
- `Ward`
- `Inpatient`
- `Bill`
- `Appointment`

After models are created:

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

## 4. API Layer (DRF)

For each model, create:

- Serializer in `hospital/serializers.py`
- ViewSet in `hospital/views.py`
- Router registration in `hospital/urls.py`

Example router style:

```python
router.register('doctors', DoctorViewSet)
router.register('patients', PatientViewSet)
router.register('departments', DepartmentViewSet)
# ...continue for all modules
```

Expected API base pattern:

- `GET /api/doctors/`
- `POST /api/doctors/`
- `PUT /api/doctors/{id}/`
- `DELETE /api/doctors/{id}/`

Repeat same pattern for all table resources.

## 5. Authentication Endpoints

Add JWT auth endpoints in backend urls:

```python
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
```

Recommended extra endpoint:

- `GET /api/auth/me/` to return logged-in user info.

## 6. Frontend Integration Plan (This Vue Project)

Your frontend already has:

- `LoginPage.vue`
- `RegisterPage.vue`
- Entity pages for Doctor/Patient/etc.

Next, replace static `initialRows` with API calls.

### 6.1 Add environment variable

Create `.env` in `hms-project`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

### 6.2 Create API helper

Create `src/lib/api.js`:

```js
const API_BASE = import.meta.env.VITE_API_BASE_URL

const getAuthHeader = () => {
  const token = localStorage.getItem('access_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { ...getAuthHeader() },
  })
  if (!res.ok) throw new Error(`GET ${path} failed`)
  return res.json()
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`POST ${path} failed`)
  return res.json()
}
```

### 6.3 Login flow in `LoginPage.vue`

On submit:

1. Call `POST /auth/login/` with email/username and password.
2. Save `access` and `refresh` tokens in `localStorage`.
3. Redirect user to `/`.

### 6.4 Register flow in `RegisterPage.vue`

On submit:

1. Call backend register endpoint (you create it in Django).
2. On success, redirect to `/login`.

### 6.5 Protect app routes

Add router guard:

- If route is not auth page and no token, redirect to `/login`.
- If token exists and user hits `/login` or `/register`, redirect to `/`.

## 7. Resource Endpoint Mapping for Your Current Pages

Use this mapping so frontend pages call correct APIs:

- `/doctors` page -> `/api/doctors/`
- `/patients` page -> `/api/patients/`
- `/departments` page -> `/api/departments/`
- `/medicines` page -> `/api/medicines/`
- `/medical-records` page -> `/api/medical-records/`
- `/prescriptions` page -> `/api/prescriptions/`
- `/prescription-details` page -> `/api/prescription-details/`
- `/staff` page -> `/api/staff/`
- `/wards` page -> `/api/wards/`
- `/inpatients` page -> `/api/inpatients/`
- `/bills` page -> `/api/bills/`
- `/appointments` page -> `/api/appointments/`

## 8. Suggested Implementation Order

1. Build Django project + connect MySQL.
2. Add 2-3 core models first (`Patient`, `Doctor`, `Appointment`).
3. Build auth endpoints (`login`, `refresh`, `me`, optional `register`).
4. Integrate frontend login/register pages.
5. Integrate one entity page end-to-end (example: Patients).
6. Reuse same pattern for remaining entities.

## 9. Testing Checklist

Backend:

- `GET /api/patients/` returns data.
- Unauthorized request returns `401`.
- JWT login returns `access` and `refresh`.

Frontend:

- Login stores token and redirects.
- Protected pages redirect to login when token missing.
- Create/Update/Delete works against API and updates table UI.

## 10. Common Issues

- CORS error: verify `CORS_ALLOWED_ORIGINS` includes `http://localhost:5173`.
- `401 Unauthorized`: access token missing or expired.
- MySQL connection error: verify DB user/password/host/port.
- CSRF confusion: for token-based API + JWT, use Authorization header, not session auth.

---

If you want, next step I can generate the frontend API service files and router guard code directly in this project so you can plug into Django immediately.
