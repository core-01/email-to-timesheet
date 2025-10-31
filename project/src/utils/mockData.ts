import {
  DashboardMetrics,
  Email,
  Ticket,
  Timesheet,
  User,
  EmailStatus,
  TicketType,
  Priority,
  TicketStatus,
  TimesheetStatus,
  UserRole,
  ChartData
} from '../types';

export const mockMetrics: DashboardMetrics = {
  totalEmails: 1247,
  emailsProcessed: 1138,
  emailsPending: 109,
  totalTickets: 342,
  ticketsOpen: 87,
  ticketsClosed: 255,
  totalTimesheets: 468,
  timesheetsPending: 23,
  timesheetsApproved: 445,
  hoursLoggedThisWeek: 187.5
};

export const mockEmails: Email[] = [
  {
    id: 1,
    subject: 'System downtime issue - Production server',
    sender: 'john.doe@company.com',
    recipient: 'support@company.com',
    receivedDate: '2025-10-30T14:30:00',
    body: 'We are experiencing system downtime on the production server. Please investigate immediately.',
    status: EmailStatus.TICKET_CREATED,
    hasAttachments: true,
  },
  {
    id: 2,
    subject: 'Password reset request',
    sender: 'jane.smith@company.com',
    recipient: 'support@company.com',
    receivedDate: '2025-10-30T13:15:00',
    body: 'I need help resetting my password for the employee portal.',
    status: EmailStatus.PROCESSED,
    hasAttachments: false,
  },
  {
    id: 3,
    subject: 'New feature request for dashboard',
    sender: 'mike.johnson@company.com',
    recipient: 'development@company.com',
    receivedDate: '2025-10-30T11:45:00',
    body: 'Can we add export functionality to the timesheet dashboard?',
    status: EmailStatus.UNPROCESSED,
    hasAttachments: false,
  }
];

export const mockTickets: Ticket[] = [
  {
    id: 1,
    ticketNumber: 'INC-2025-001',
    title: 'Production server downtime',
    description: 'Production server experiencing critical downtime affecting all users.',
    type: TicketType.INCIDENT,
    priority: Priority.CRITICAL,
    status: TicketStatus.IN_PROGRESS,
    assigneeId: 2,
    assigneeName: 'Sarah Williams',
    reporterId: 1,
    reporterName: 'John Doe',
    emailId: 1,
    createdAt: '2025-10-30T14:35:00',
    updatedAt: '2025-10-30T15:20:00',
    dueDate: '2025-10-30T18:00:00'
  },
  {
    id: 2,
    ticketNumber: 'SR-2025-045',
    title: 'Password reset request',
    description: 'User requires password reset for employee portal access.',
    type: TicketType.SERVICE_REQUEST,
    priority: Priority.MEDIUM,
    status: TicketStatus.RESOLVED,
    assigneeId: 3,
    assigneeName: 'Michael Chen',
    reporterId: 4,
    reporterName: 'Jane Smith',
    emailId: 2,
    createdAt: '2025-10-30T13:20:00',
    updatedAt: '2025-10-30T14:10:00',
  },
  {
    id: 3,
    ticketNumber: 'CR-2025-012',
    title: 'Dashboard export functionality',
    description: 'Add CSV and PDF export options to timesheet dashboard.',
    type: TicketType.CHANGE_REQUEST,
    priority: Priority.LOW,
    status: TicketStatus.OPEN,
    reporterId: 5,
    reporterName: 'Mike Johnson',
    emailId: 3,
    createdAt: '2025-10-30T11:50:00',
    updatedAt: '2025-10-30T11:50:00',
    dueDate: '2025-11-15T17:00:00'
  }
];

export const mockTimesheets: Timesheet[] = [
  {
    id: 1,
    userId: 2,
    userName: 'Sarah Williams',
    ticketId: 1,
    ticketNumber: 'INC-2025-001',
    date: '2025-10-30',
    hoursLogged: 6.5,
    description: 'Investigating and resolving production server downtime',
    status: TimesheetStatus.SUBMITTED,
    createdAt: '2025-10-30T16:00:00'
  },
  {
    id: 2,
    userId: 3,
    userName: 'Michael Chen',
    ticketId: 2,
    ticketNumber: 'SR-2025-045',
    date: '2025-10-30',
    hoursLogged: 0.5,
    description: 'Password reset for user',
    status: TimesheetStatus.APPROVED,
    approvedBy: 6,
    approverName: 'David Manager',
    approvedAt: '2025-10-30T17:00:00',
    createdAt: '2025-10-30T14:15:00'
  },
  {
    id: 3,
    userId: 2,
    userName: 'Sarah Williams',
    ticketId: 1,
    ticketNumber: 'INC-2025-001',
    date: '2025-10-29',
    hoursLogged: 8.0,
    description: 'Initial investigation and emergency response',
    status: TimesheetStatus.APPROVED,
    approvedBy: 6,
    approverName: 'David Manager',
    approvedAt: '2025-10-30T09:00:00',
    createdAt: '2025-10-29T18:00:00'
  }
];

export const mockUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@company.com',
    firstName: 'Admin',
    lastName: 'User',
    role: UserRole.ADMIN,
    department: 'IT',
    isActive: true,
    createdAt: '2024-01-01T00:00:00'
  },
  {
    id: 2,
    username: 'sarah.williams',
    email: 'sarah.williams@company.com',
    firstName: 'Sarah',
    lastName: 'Williams',
    role: UserRole.EMPLOYEE,
    department: 'Engineering',
    isActive: true,
    createdAt: '2024-03-15T00:00:00'
  },
  {
    id: 3,
    username: 'michael.chen',
    email: 'michael.chen@company.com',
    firstName: 'Michael',
    lastName: 'Chen',
    role: UserRole.EMPLOYEE,
    department: 'Support',
    isActive: true,
    createdAt: '2024-02-20T00:00:00'
  },
  {
    id: 6,
    username: 'david.manager',
    email: 'david.manager@company.com',
    firstName: 'David',
    lastName: 'Manager',
    role: UserRole.MANAGER,
    department: 'Engineering',
    isActive: true,
    createdAt: '2024-01-10T00:00:00'
  }
];

export const mockWeeklyTimelogData: ChartData[] = [
  { name: 'Mon', value: 32 },
  { name: 'Tue', value: 38 },
  { name: 'Wed', value: 35 },
  { name: 'Thu', value: 42 },
  { name: 'Fri', value: 40 },
];

export const mockTicketProgressData: ChartData[] = [
  { name: 'Open', value: 87, fill: '#3b82f6' },
  { name: 'In Progress', value: 45, fill: '#f59e0b' },
  { name: 'Resolved', value: 123, fill: '#10b981' },
  { name: 'Closed', value: 87, fill: '#6b7280' },
];

export const mockEmailStatusData: ChartData[] = [
  { name: 'Processed', value: 1138, fill: '#10b981' },
  { name: 'Pending', value: 109, fill: '#f59e0b' },
];
