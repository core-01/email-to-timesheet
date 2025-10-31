# Email-to-Timesheet Automation System

A production-grade React.js frontend application for automating the flow of information from email to database to dashboard to timesheet to ticketing system.

## Features

- **Dashboard**: Real-time metrics and charts for emails, tickets, and timesheets
- **Email Management**: View and process incoming emails, create tickets from emails
- **Ticket Management**: Full CRUD operations, comments, status tracking, Jira integration
- **Timesheet Module**: Employee time tracking with manager approval workflow
- **User Management**: Role-based access control (Admin, Manager, Employee)
- **Integrations**: Configure Jira, Slack, and Microsoft Teams integrations
- **System Logs**: Monitor system events and error logs
- **Dark Mode**: Full dark theme support
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Framework**: React 18.3+ with TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: TailwindCSS with dark mode
- **Charts**: Recharts
- **Icons**: Lucide React
- **HTTP Client**: Axios with interceptors for JWT authentication
- **Build Tool**: Vite

## Prerequisites

- Node.js 18+ and npm
- Backend API running (Java Spring Boot + Oracle 19c)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd email-timesheet-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration:
```bash
cp .env.example .env
```

4. Update `.env` with your backend API URL:
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Email Timesheet Automation
VITE_APP_VERSION=1.0.0
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/         # React components
│   ├── common/        # Reusable UI components (Button, Card, Modal, etc.)
│   ├── layout/        # Layout components (Sidebar, Header, Layout)
│   ├── dashboard/     # Dashboard-specific components
│   ├── emails/        # Email module components
│   ├── tickets/       # Ticket module components
│   ├── timesheets/    # Timesheet module components
│   ├── users/         # User management components
│   ├── integrations/  # Integration configuration components
│   └── logs/          # Log viewer components
├── pages/             # Page components
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── EmailsPage.tsx
│   ├── TicketsPage.tsx
│   ├── TimesheetsPage.tsx
│   ├── UsersPage.tsx
│   ├── IntegrationsPage.tsx
│   └── LogsPage.tsx
├── redux/             # Redux state management
│   ├── slices/        # Redux slices
│   │   ├── authSlice.ts
│   │   ├── themeSlice.ts
│   │   ├── emailSlice.ts
│   │   ├── ticketSlice.ts
│   │   ├── timesheetSlice.ts
│   │   ├── userSlice.ts
│   │   └── dashboardSlice.ts
│   └── store.ts       # Redux store configuration
├── services/          # API service layer
│   ├── api.ts         # Axios instance with interceptors
│   ├── authService.ts
│   ├── emailService.ts
│   ├── ticketService.ts
│   ├── timesheetService.ts
│   ├── userService.ts
│   ├── integrationService.ts
│   ├── dashboardService.ts
│   └── logService.ts
├── types/             # TypeScript type definitions
│   └── index.ts
├── utils/             # Utility functions
│   ├── formatters.ts  # Date and status formatting
│   └── mockData.ts    # Mock data for development
├── hooks/             # Custom React hooks
│   ├── useAppDispatch.ts
│   └── useAppSelector.ts
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Authentication

The application uses JWT-based authentication with role-based access control.

### Demo Credentials

- **Admin**: `admin` / `password`
- **Manager**: `manager` / `password`
- **Employee**: `employee` / `password`

### Role-Based Access

- **Admin**: Full access to all modules
- **Manager**: Access to emails, tickets, timesheets, and integrations
- **Employee**: Access to emails and personal timesheets

## API Integration

The application expects the following backend endpoints:

### Authentication
- `POST /api/auth/login` - User login

### Emails
- `GET /api/emails` - Get all emails
- `GET /api/emails/:id` - Get email by ID
- `PATCH /api/emails/:id/status` - Update email status

### Tickets
- `GET /api/tickets` - Get all tickets
- `GET /api/tickets/:id` - Get ticket by ID
- `POST /api/tickets` - Create new ticket
- `PUT /api/tickets/:id` - Update ticket
- `POST /api/tickets/:id/comments` - Add comment
- `GET /api/tickets/:id/comments` - Get comments
- `GET /api/tickets/:id/history` - Get status history

### Timesheets
- `GET /api/timesheets` - Get all timesheets
- `GET /api/timesheets/:id` - Get timesheet by ID
- `POST /api/timesheets` - Create timesheet
- `PUT /api/timesheets/:id` - Update timesheet
- `POST /api/timesheets/:id/submit` - Submit timesheet
- `POST /api/timesheets/:id/approve` - Approve timesheet
- `POST /api/timesheets/:id/reject` - Reject timesheet
- `GET /api/timesheets/export` - Export timesheets

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/roles` - Get all roles

### Integrations
- `GET /api/integrations` - Get all integrations
- `GET /api/integrations/:id` - Get integration by ID
- `PUT /api/integrations/:id` - Update integration
- `POST /api/integrations/:id/test` - Test integration
- `GET /api/integrations/logs` - Get integration logs

### Dashboard
- `GET /api/dashboard/metrics` - Get dashboard metrics
- `GET /api/dashboard/charts/weekly-timelogs` - Get weekly timelog data
- `GET /api/dashboard/charts/ticket-progress` - Get ticket progress data
- `GET /api/dashboard/charts/email-status` - Get email status data

### Logs
- `GET /api/logs/system` - Get system logs
- `GET /api/logs/error` - Get error logs
- `GET /api/logs/:type/export` - Export logs

## Mock Data

The application includes mock data for development and testing purposes. When the backend is unavailable, the app will use mock data to demonstrate functionality.

## Features in Detail

### Dashboard
- Real-time metrics cards
- Weekly time log bar chart
- Ticket progress pie chart
- Email processing status chart
- Responsive grid layout

### Email Management
- Sortable and filterable email list
- Detailed email view with attachments
- Create tickets directly from emails
- Email status tracking

### Ticket Management
- Complete ticket lifecycle management
- Priority and status badges
- Threaded comments system
- Status history timeline
- Manual ticket creation

### Timesheet Module
- Daily time entry logging
- Link entries to tickets
- Approval workflow for managers
- Export to PDF/Excel
- Visual charts for time tracking

### User Management (Admin Only)
- CRUD operations for users
- Role assignment
- Department management
- Active/inactive status

### Integrations
- Configure Jira, Slack, Teams
- Secure API token management
- Test integration connections
- Integration event logs

### System Logs
- System event monitoring
- Error log tracking
- Filtering by service and level
- Export functionality

## Dark Mode

Toggle between light and dark themes using the moon/sun icon in the header. The preference is saved to localStorage.

## Responsive Design

The application is fully responsive with breakpoints for:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Security

- JWT token-based authentication
- Automatic token refresh
- Secure password fields with masking
- Role-based route protection
- XSS protection via React
- HTTPS in production

## Performance

- Code splitting with React Router
- Lazy loading of components
- Optimized re-renders with Redux
- Memoized selectors
- Production build optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### API Connection Issues
If you see connection errors, verify:
1. Backend API is running
2. `.env` file has correct API URL
3. CORS is configured on backend
4. Network connectivity

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

Proprietary - All rights reserved

## Support

For issues and questions, contact the development team.
