import { useEffect, useState } from 'react';
import { Card } from '../components/common/Card';
import { Table } from '../components/common/Table';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Select } from '../components/common/Select';
import { Loading } from '../components/common/Loading';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchEmails, clearSelectedEmail } from '../redux/slices/emailSlice';
import { Email, EmailStatus } from '../types';
import { formatDate, getStatusColor } from '../utils/formatters';
import { Paperclip } from 'lucide-react';
import { mockEmails } from '../utils/mockData';

export const EmailsPage = () => {
  const dispatch = useAppDispatch();
  const { emails, loading } = useAppSelector((state) => state.email);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    dispatch(fetchEmails({ status: statusFilter || undefined })).catch(() => {});
  }, [dispatch, statusFilter]);

  const displayEmails = emails.length > 0 ? emails : mockEmails;

  const handleRowClick = (email: Email) => {
    setSelectedEmail(email);
    setShowDetailModal(true);
  };

  const handleCreateTicket = () => {
    setShowDetailModal(false);
    setShowTicketModal(true);
  };

  const handleCloseModals = () => {
    setShowDetailModal(false);
    setShowTicketModal(false);
    setSelectedEmail(null);
    dispatch(clearSelectedEmail());
  };

  const columns = [
    {
      header: 'Subject',
      accessor: (row: Email) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.subject}</span>
          {row.hasAttachments && <Paperclip className="h-4 w-4 text-gray-400" />}
        </div>
      ),
    },
    {
      header: 'Sender',
      accessor: 'sender' as keyof Email,
    },
    {
      header: 'Received Date',
      accessor: (row: Email) => formatDate(row.receivedDate),
    },
    {
      header: 'Status',
      accessor: (row: Email) => (
        <Badge className={getStatusColor(row.status)}>
          {row.status.replace('_', ' ')}
        </Badge>
      ),
    },
  ];

  if (loading && displayEmails.length === 0) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Emails</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and process incoming emails
          </p>
        </div>
      </div>

      <Card>
        <div className="mb-4">
          <Select
            label="Filter by Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: '', label: 'All Statuses' },
              { value: EmailStatus.UNPROCESSED, label: 'Unprocessed' },
              { value: EmailStatus.PROCESSED, label: 'Processed' },
              { value: EmailStatus.TICKET_CREATED, label: 'Ticket Created' },
              { value: EmailStatus.FAILED, label: 'Failed' },
            ]}
          />
        </div>
        <Table data={displayEmails} columns={columns} onRowClick={handleRowClick} />
      </Card>

      <Modal
        isOpen={showDetailModal}
        onClose={handleCloseModals}
        title="Email Details"
        size="lg"
      >
        {selectedEmail && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Subject</label>
              <p className="text-gray-900 dark:text-white font-medium mt-1">{selectedEmail.subject}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">From</label>
                <p className="text-gray-900 dark:text-white mt-1">{selectedEmail.sender}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">To</label>
                <p className="text-gray-900 dark:text-white mt-1">{selectedEmail.recipient}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Received</label>
              <p className="text-gray-900 dark:text-white mt-1">{formatDate(selectedEmail.receivedDate)}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</label>
              <div className="mt-1">
                <Badge className={getStatusColor(selectedEmail.status)}>
                  {selectedEmail.status.replace('_', ' ')}
                </Badge>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Message</label>
              <div className="mt-1 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{selectedEmail.body}</p>
              </div>
            </div>

            {selectedEmail.status !== EmailStatus.TICKET_CREATED && (
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="secondary" onClick={handleCloseModals}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleCreateTicket}>
                  Create Ticket
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>

      <Modal
        isOpen={showTicketModal}
        onClose={handleCloseModals}
        title="Create Ticket from Email"
        size="lg"
      >
        {selectedEmail && (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Create a new ticket with information from this email.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                This feature will be implemented with your backend API integration.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={handleCloseModals}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleCloseModals}>
                Create Ticket
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
