import { useEffect, useState } from 'react';
import { Card } from '../components/common/Card';
import { Table } from '../components/common/Table';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Loading } from '../components/common/Loading';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchTickets, fetchTicketById, fetchComments } from '../redux/slices/ticketSlice';
import { Ticket, TicketStatus, TicketType, Priority } from '../types';
import { formatDate, getStatusColor, getPriorityColor } from '../utils/formatters';
import { Plus, MessageSquare } from 'lucide-react';
import { mockTickets } from '../utils/mockData';

export const TicketsPage = () => {
  const dispatch = useAppDispatch();
  const { tickets, selectedTicket, comments, loading } = useAppSelector((state) => state.ticket);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    dispatch(fetchTickets({ status: statusFilter || undefined })).catch(() => {});
  }, [dispatch, statusFilter]);

  const displayTickets = tickets.length > 0 ? tickets : mockTickets;

  const handleRowClick = async (ticket: Ticket) => {
    await dispatch(fetchTicketById(ticket.id));
    await dispatch(fetchComments(ticket.id));
    setShowDetailModal(true);
  };

  const columns = [
    {
      header: 'Ticket Number',
      accessor: (row: Ticket) => (
        <span className="font-mono font-medium text-blue-600 dark:text-blue-400">
          {row.ticketNumber}
        </span>
      ),
    },
    {
      header: 'Title',
      accessor: 'title' as keyof Ticket,
    },
    {
      header: 'Type',
      accessor: (row: Ticket) => (
        <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200">
          {row.type.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      header: 'Priority',
      accessor: (row: Ticket) => (
        <Badge className={getPriorityColor(row.priority)}>
          {row.priority}
        </Badge>
      ),
    },
    {
      header: 'Status',
      accessor: (row: Ticket) => (
        <Badge className={getStatusColor(row.status)}>
          {row.status.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      header: 'Assignee',
      accessor: (row: Ticket) => row.assigneeName || 'Unassigned',
    },
    {
      header: 'Created',
      accessor: (row: Ticket) => formatDate(row.createdAt),
    },
  ];

  if (loading && displayTickets.length === 0) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tickets</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and track all support tickets
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          <Plus className="h-5 w-5 mr-2" />
          Create Ticket
        </Button>
      </div>

      <Card>
        <div className="mb-4">
          <Select
            label="Filter by Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: '', label: 'All Statuses' },
              { value: TicketStatus.OPEN, label: 'Open' },
              { value: TicketStatus.IN_PROGRESS, label: 'In Progress' },
              { value: TicketStatus.PENDING, label: 'Pending' },
              { value: TicketStatus.RESOLVED, label: 'Resolved' },
              { value: TicketStatus.CLOSED, label: 'Closed' },
            ]}
          />
        </div>
        <Table data={displayTickets} columns={columns} onRowClick={handleRowClick} />
      </Card>

      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="Ticket Details"
        size="xl"
      >
        {selectedTicket && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ticket Number</p>
                <p className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">
                  {selectedTicket.ticketNumber}
                </p>
              </div>
              <div className="flex gap-2">
                <Badge className={getPriorityColor(selectedTicket.priority)}>
                  {selectedTicket.priority}
                </Badge>
                <Badge className={getStatusColor(selectedTicket.status)}>
                  {selectedTicket.status.replace('_', ' ')}
                </Badge>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Title</label>
              <p className="text-xl font-semibold text-gray-900 dark:text-white mt-1">
                {selectedTicket.title}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Type</label>
                <p className="text-gray-900 dark:text-white mt-1">
                  {selectedTicket.type.replace('_', ' ')}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Assignee</label>
                <p className="text-gray-900 dark:text-white mt-1">
                  {selectedTicket.assigneeName || 'Unassigned'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Reporter</label>
                <p className="text-gray-900 dark:text-white mt-1">{selectedTicket.reporterName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Created</label>
                <p className="text-gray-900 dark:text-white mt-1">{formatDate(selectedTicket.createdAt)}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Description</label>
              <div className="mt-1 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                  {selectedTicket.description}
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Comments ({comments.length})
                </label>
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {comments.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No comments yet</p>
                ) : (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {comment.userName}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
                Close
              </Button>
              <Button variant="primary">
                Add Comment
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Ticket"
        size="lg"
      >
        <form className="space-y-4">
          <Input label="Title" placeholder="Enter ticket title" required />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Type"
              options={[
                { value: TicketType.INCIDENT, label: 'Incident' },
                { value: TicketType.SERVICE_REQUEST, label: 'Service Request' },
                { value: TicketType.CHANGE_REQUEST, label: 'Change Request' },
              ]}
              required
            />
            <Select
              label="Priority"
              options={[
                { value: Priority.LOW, label: 'Low' },
                { value: Priority.MEDIUM, label: 'Medium' },
                { value: Priority.HIGH, label: 'High' },
                { value: Priority.CRITICAL, label: 'Critical' },
              ]}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter ticket description"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Ticket
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
