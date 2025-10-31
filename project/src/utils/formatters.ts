export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    OPEN: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    IN_PROGRESS: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    PENDING: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    RESOLVED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    CLOSED: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    APPROVED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    SUBMITTED: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    DRAFT: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    PROCESSED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    UNPROCESSED: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    TICKET_CREATED: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    FAILED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
};

export const getPriorityColor = (priority: string): string => {
  const priorityColors: Record<string, string> = {
    LOW: 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200',
    MEDIUM: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    HIGH: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    CRITICAL: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };
  return priorityColors[priority] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
};

export const formatHours = (hours: number): string => {
  return `${hours.toFixed(1)}h`;
};
