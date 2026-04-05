# HMS Frontend

HMS Frontend is a Vue 3 + Vite application for a Hospital Management System. It provides an admin dashboard layout, login and registration screens, and module pages for the core hospital entities used in the project.

## Overview

The app is structured as a single-page application with Vue Router and Pinia. It is designed to work with a Django REST backend and is already organized around the following hospital modules:

- Dashboard
- Doctors
- Patients
- Departments
- Medicines
- Medical Records
- Prescriptions
- Prescription Details
- Staff
- Wards
- Inpatients
- Bills
- Appointments
- Login and Register

The layout uses a persistent sidebar for navigation, a top header area, and reusable UI components for common controls like avatars, buttons, inputs, sheets, separators, skeletons, and tooltips.

## Tech Stack

- Vue 3
- Vite
- Vue Router
- Pinia
- Tailwind CSS 4
- Axios
- Lucide icons
- Reka UI primitives

## Project Structure

- `src/main.js` bootstraps Vue, Pinia, and the router.
- `src/App.vue` renders the authenticated dashboard shell or the auth pages.
- `src/router/index.js` defines the application routes.
- `src/component/Sidebar.vue` contains the dashboard navigation.
- `src/component/EntityPage.vue` and the pages in `src/pages/` implement the module views.
- `src/components/ui/` contains reusable UI building blocks.
- `DJANGO_BACKEND_INTEGRATION_GUIDE.md` explains the backend API setup and the expected data flow.

## Setup

Install dependencies:

```sh
bun install
```

Create a local environment file in the project root if your backend is running elsewhere:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Run the development server:

```sh
bun dev
```

Build for production:

```sh
bun run build
```

Preview the production build:

```sh
bun run preview
```

Run linting:

```sh
bun lint
```

Format source files:

```sh
bun run format
```

## Backend Integration

This frontend is meant to consume a Django REST API. The backend guide in `DJANGO_BACKEND_INTEGRATION_GUIDE.md` covers the recommended Django setup, JWT auth, CORS, and the API routes expected by the UI.

Current page-to-endpoint mapping follows the same pattern across the app:

- `/doctors` -> `/api/doctors/`
- `/patients` -> `/api/patients/`
- `/departments` -> `/api/departments/`
- `/medicines` -> `/api/medicines/`
- `/medical-records` -> `/api/medical-records/`
- `/prescriptions` -> `/api/prescriptions/`
- `/prescription-details` -> `/api/prescription-details/`
- `/staff` -> `/api/staff/`
- `/wards` -> `/api/wards/`
- `/inpatients` -> `/api/inpatients/`
- `/bills` -> `/api/bills/`
- `/appointments` -> `/api/appointments/`

## Notes

- The dashboard shell is shown for normal routes, while `/login` and `/register` render as auth pages.
- The app is intended for local development against the backend API; no manual push step is required to run it locally.
- If you change the backend response shape, update the matching page mapping logic so the tables stay aligned with the API.

## Hosting

This project can be hosted as a static frontend after you run the production build:

```sh
bun run build
```

The generated files will be in `dist/`. Point your hosting provider at that folder and make sure SPA rewrites are enabled so Vue Router can handle deep links such as `/patients` or `/login`.

For GitHub Pages, the project is configured for the repository path `/Vue_HMS_frontend/` and uses hash routing in production so direct page refreshes keep working without a custom server rewrite.

Before deploying, set the production API URL in the host environment variables:

```env
VITE_API_BASE_URL=https://your-backend-domain.example/api
```

Recommended hosting targets:

- Netlify
- Vercel
- Cloudflare Pages
- Nginx on your own server
- GitHub Pages

GitHub Pages deployment is automated through `.github/workflows/deploy.yml`. Push to `main`, or run the workflow manually, and GitHub Actions will build the app from `hms-project/` and publish the `dist/` output.

If you want, I can also add platform-specific deployment files for Netlify or Vercel.
