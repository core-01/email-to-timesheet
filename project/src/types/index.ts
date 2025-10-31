export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department?: string;
  isActive: boolean;
  createdAt: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE'
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface Email {
  id: number;
  subject: string;
  sender: string;
  recipient: string;
  receivedDate: string;
  body: string;
  status: EmailStatus;
  hasAttachments: boolean;
  attachments?: Attachment[];
}

export enum EmailStatus {
  UNPROCESSED = 'UNPROCESSED',
  PROCESSED = 'PROCESSED',
  TICKET_CREATED = 'TICKET_CREATED',
  FAILED = 'FAILED'
}

export interface Attachment {
  id: number;
  fileName: string;
  fileSize: number;
  fileType: string;
  downloadUrl: string;
}

export interface Ticket {
  id: number;
  ticketNumber: string;
  title: string;
  description: string;
  type: TicketType;
  priority: Priority;
  status: TicketStatus;
  assigneeId?: number;
  assigneeName?: string;
  reporterId: number;
  reporterName: string;
  emailId?: number;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  comments?: Comment[];
  statusHistory?: StatusHistoryEntry[];
}

export enum TicketType {
  INCIDENT = 'INCIDENT',
  SERVICE_REQUEST = 'SERVICE_REQUEST',
  CHANGE_REQUEST = 'CHANGE_REQUEST'
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

export interface Comment {
  id: number;
  ticketId: number;
  userId: number;
  userName: string;
  content: string;
  createdAt: string;
}

export interface StatusHistoryEntry {
  id: number;
  ticketId: number;
  fromStatus: TicketStatus;
  toStatus: TicketStatus;
  changedBy: string;
  changedAt: string;
  comment?: string;
}

export interface Timesheet {
  id: number;
  userId: number;
  userName: string;
  ticketId?: number;
  ticketNumber?: string;
  date: string;
  hoursLogged: number;
  description: string;
  status: TimesheetStatus;
  approvedBy?: number;
  approverName?: string;
  approvedAt?: string;
  comments?: string;
  createdAt: string;
}

export enum TimesheetStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface Integration {
  id: number;
  name: string;
  type: IntegrationType;
  apiUrl: string;
  isActive: boolean;
  lastSyncedAt?: string;
  config?: Record<string, unknown>;
}

export enum IntegrationType {
  JIRA = 'JIRA',
  SLACK = 'SLACK',
  TEAMS = 'TEAMS'
}

export interface IntegrationLog {
  id: number;
  integrationId: number;
  integrationName: string;
  action: string;
  status: LogStatus;
  message: string;
  timestamp: string;
}

export enum LogStatus {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  WARNING = 'WARNING'
}

export interface SystemLog {
  id: number;
  serviceName: string;
  level: LogLevel;
  message: string;
  timestamp: string;
  details?: string;
}

export enum LogLevel {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG'
}

export interface ErrorLog {
  id: number;
  serviceName: string;
  errorType: string;
  errorMessage: string;
  stackTrace?: string;
  timestamp: string;
  userId?: number;
}

export interface DashboardMetrics {
  totalEmails: number;
  emailsProcessed: number;
  emailsPending: number;
  totalTickets: number;
  ticketsOpen: number;
  ticketsClosed: number;
  totalTimesheets: number;
  timesheetsPending: number;
  timesheetsApproved: number;
  hoursLoggedThisWeek: number;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}
