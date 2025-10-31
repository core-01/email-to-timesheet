# Project Structure and Features

This file contains a visual directory tree for the `project/` folder and a mapping of which files implement which features. It is intended to be downloadable and human-readable.

---

## Visual directory tree (project/)

- .env
- .env.example
- .gitignore
- eslint.config.js
- index.html
- package.json
- postcss.config.js
- README.md
- tailwind.config.js
- tsconfig.app.json
- tsconfig.json
- tsconfig.node.json
- vite.config.ts
- .bolt/
  - config.json
  - prompt
- src/
  - App.tsx
  - index.css
  - main.tsx
  - vite-env.d.ts
  - components/
    - ProtectedRoute.tsx
    - common/
      - Badge.tsx
      - Button.tsx
      - Card.tsx
      - Input.tsx
      - Loading.tsx
      - Modal.tsx
      - Select.tsx
      - Table.tsx
    - layout/
      - Header.tsx
      - Layout.tsx
      - Sidebar.tsx
  - hooks/
    - useAppDispatch.ts
    - useAppSelector.ts
  - pages/
    - DashboardPage.tsx
    - EmailsPage.tsx
    - IntegrationsPage.tsx
    - LoginPage.tsx
    - LogsPage.tsx
    - TicketsPage.tsx
    - TimesheetsPage.tsx
    - UsersPage.tsx
  - redux/
    - store.ts
    - slices/
      - authSlice.ts
      - dashboardSlice.ts
      - emailSlice.ts
      - themeSlice.ts
      - ticketSlice.ts
      - timesheetSlice.ts
      - userSlice.ts
  - services/
    - api.ts
    - authService.ts
    - dashboardService.ts
    - emailService.ts
    - integrationService.ts
    - logService.ts
    - ticketService.ts
    - timesheetService.ts
    - userService.ts
  - types/
    - index.ts
  - utils/
    - formatters.ts
    - mockData.ts

---

## Feature mapping (which files run or implement which feature)

### App startup / tooling
- `src/main.tsx` — App entry; mounts React app, applies providers (Redux, Router).
- `index.html` — HTML entry used by Vite.
- `vite.config.ts`, `package.json` — Dev server (`npm run dev`), build (`npm run build`) and scripts.

### Routing & App shell
- `src/App.tsx` — React Router routes. Maps URLs to pages and uses `ProtectedRoute` for role-based access control.
- `src/components/layout/Layout.tsx` — Page layout wrapper. Includes `Header` and `Sidebar`.
- `src/components/layout/Header.tsx`, `Sidebar.tsx` — Top navigation and side navigation.

### Authentication
- `src/pages/LoginPage.tsx` — Login UI (username/password form) and redirects based on role.
- `src/redux/slices/authSlice.ts` — Redux slice for authentication; `login` async thunk and `logout` action.
- `src/services/authService.ts` — Auth API wrapper and local dev-mode mock fallback (accepts demo credentials when in dev or when `VITE_USE_MOCK=true`). Persists token and user in `localStorage`.
- `src/services/api.ts` — Axios client that injects Authorization header and redirects to `/login` on 401.
- `src/components/ProtectedRoute.tsx` — Guards protected routes by role.

### Pages and domain features
- Dashboard
  - Page: `src/pages/DashboardPage.tsx`
  - Service: `src/services/dashboardService.ts`
  - State: `src/redux/slices/dashboardSlice.ts`
  - Purpose: Display metrics and charts for the application.

- Emails
  - Page: `src/pages/EmailsPage.tsx`
  - Service: `src/services/emailService.ts`
  - State: `src/redux/slices/emailSlice.ts`
  - Purpose: View and process incoming emails; create tickets from emails.

- Tickets
  - Page: `src/pages/TicketsPage.tsx`
  - Service: `src/services/ticketService.ts`
  - State: `src/redux/slices/ticketSlice.ts`
  - Purpose: Ticket listing, assignment, status updates.

- Timesheets
  - Page: `src/pages/TimesheetsPage.tsx`
  - Service: `src/services/timesheetService.ts`
  - State: `src/redux/slices/timesheetSlice.ts`
  - Purpose: Create and manage timesheets, approvals.

- Users (Admin)
  - Page: `src/pages/UsersPage.tsx`
  - Service: `src/services/userService.ts`
  - State: `src/redux/slices/userSlice.ts`
  - Purpose: Admin user management (create/update users, set roles, initial passwords).

- Integrations
  - Page: `src/pages/IntegrationsPage.tsx`
  - Service: `src/services/integrationService.ts`
  - Purpose: Configure and test third-party integrations (Jira, Slack, Teams).

- Logs
  - Page: `src/pages/LogsPage.tsx`
  - Service: `src/services/logService.ts`
  - Purpose: View system and integration logs.

### Shared UI components
- `src/components/common/*` — UI primitives used across pages:
  - `Button.tsx`, `Input.tsx`, `Card.tsx`, `Modal.tsx`, `Table.tsx`, `Badge.tsx`, `Loading.tsx`, `Select.tsx`.

### State and utilities
- `src/redux/store.ts` — Redux store configuration (combines slices).
- `src/hooks/useAppDispatch.ts` and `src/hooks/useAppSelector.ts` — Typed Redux hooks.
- `src/types/index.ts` — Shared TypeScript types and enums.
- `src/utils/formatters.ts` — Helper functions for dates/strings.
- `src/utils/mockData.ts` — Mock data used when backend is unavailable; includes `mockUsers` used by `authService` in dev-mode.

---

## Where the demo login comes from
- UI text: `src/pages/LoginPage.tsx` shows "Admin: admin / password".
- Mock users: `src/utils/mockData.ts` contains a user with `username: 'admin'` and `role: UserRole.ADMIN`.
- The dev-mode mock auth was added to `src/services/authService.ts` so that in the dev server the demo credentials (username: `admin`, password: `password`) authenticate locally without a backend.

---

## How to download this file
The file is saved at:

`project/STRUCTURE_AND_FEATURES.md`

To create a zip with this file (optional), from the `project/` folder you can run:

```bash
zip structure_and_features.zip STRUCTURE_AND_FEATURES.md
```

(If you want, I can create the zip for you here.)

---

## Notes and next suggestions
- I can also generate a more detailed per-file responsibility matrix (for example: which functions inside a file are used by which routes), or a small README section per feature showing which commands to run and which files to edit for common tasks.
- If you want this as another format (CSV, JSON, or PDF), tell me which and I will create it and place it in the `project/` folder.

---

Generated on: 2025-10-31
