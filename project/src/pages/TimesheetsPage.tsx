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
import { fetchTimesheets, approveTimesheet, rejectTimesheet } from '../redux/slices/timesheetSlice';
import { Timesheet, TimesheetStatus, UserRole } from '../types';
import { formatDateShort, getStatusColor, formatHours } from '../utils/formatters';
import { Plus, Download, CheckCircle, XCircle } from 'lucide-react';
import { mockTimesheets } from '../utils/mockData';

export const TimesheetsPage = () => {
  const dispatch = useAppDispatch();
  const { timesheets, loading } = useAppSelector((state) => state.timesheet);
  const { user } = useAppSelector((state) => state.auth);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedTimesheet, setSelectedTimesheet] = useState<Timesheet | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [approvalComments, setApprovalComments] = useState('');

  useEffect(() => {
    const params: any = { status: statusFilter || undefined };
    if (user?.role === UserRole.EMPLOYEE) {
      params.userId = user.id;
    }
    dispatch(fetchTimesheets(params)).catch(() => {});
  }, [dispatch, statusFilter, user]);

  const displayTimesheets = timesheets.length > 0 ? timesheets : mockTimesheets;

  const isManager = user?.role === UserRole.MANAGER || user?.role === UserRole.ADMIN;

  const handleApprove = async () => {
    if (selectedTimesheet) {
      await dispatch(approveTimesheet({ id: selectedTimesheet.id, comments: approvalComments }));
      setShowApprovalModal(false);
      setSelectedTimesheet(null);
      setApprovalComments('');
      dispatch(fetchTimesheets({}));
    }
  };

  const handleReject = async () => {
    if (selectedTimesheet && approvalComments) {
      await dispatch(rejectTimesheet({ id: selectedTimesheet.id, comments: approvalComments }));
      setShowApprovalModal(false);
      setSelectedTimesheet(null);
      setApprovalComments('');
      dispatch(fetchTimesheets({}));
    }
  };

  const columns = [
    {
      header: 'Date',
      accessor: (row: Timesheet) => formatDateShort(row.date),
    },
    {
      header: 'Employee',
      accessor: 'userName' as keyof Timesheet,
    },
    {
      header: 'Ticket',
      accessor: (row: Timesheet) => (
        <span className="font-mono text-sm">{row.ticketNumber || 'N/A'}</span>
      ),
    },
    {
      header: 'Hours',
      accessor: (row: Timesheet) => (
        <span className="font-semibold">{formatHours(row.hoursLogged)}</span>
      ),
    },
    {
      header: 'Description',
      accessor: (row: Timesheet) => (
        <span className="truncate max-w-xs block">{row.description}</span>
      ),
    },
    {
      header: 'Status',
      accessor: (row: Timesheet) => (
        <Badge className={getStatusColor(row.status)}>
          {row.status}
        </Badge>
      ),
    },
    ...(isManager ? [{
      header: 'Actions',
      accessor: (row: Timesheet) => (
        row.status === TimesheetStatus.SUBMITTED && (
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTimesheet(row);
                setShowApprovalModal(true);
              }}
              className="text-green-600 hover:text-green-700 dark:text-green-400"
            >
              <CheckCircle className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTimesheet(row);
                setShowApprovalModal(true);
              }}
              className="text-red-600 hover:text-red-700 dark:text-red-400"
            >
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        )
      ),
    }] : []),
  ];

  if (loading && displayTimesheets.length === 0) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Timesheets</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {isManager ? 'Review and approve team timesheets' : 'Track your work hours'}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Download className="h-5 w-5 mr-2" />
            Export
          </Button>
          {user?.role === UserRole.EMPLOYEE && (
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              <Plus className="h-5 w-5 mr-2" />
              Add Entry
            </Button>
          )}
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
              { value: TimesheetStatus.DRAFT, label: 'Draft' },
              { value: TimesheetStatus.SUBMITTED, label: 'Submitted' },
              { value: TimesheetStatus.APPROVED, label: 'Approved' },
              { value: TimesheetStatus.REJECTED, label: 'Rejected' },
            ]}
          />
        </div>
        <Table data={displayTimesheets} columns={columns} />
      </Card>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add Timesheet Entry"
        size="lg"
      >
        <form className="space-y-4">
          <Input
            label="Date"
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            required
          />

          <Input
            label="Ticket Number (Optional)"
            placeholder="e.g., INC-2025-001"
          />

          <Input
            label="Hours Logged"
            type="number"
            step="0.5"
            min="0"
            max="24"
            placeholder="e.g., 8.0"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Describe the work performed"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button variant="ghost" type="submit">
              Save as Draft
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showApprovalModal}
        onClose={() => {
          setShowApprovalModal(false);
          setSelectedTimesheet(null);
          setApprovalComments('');
        }}
        title="Approve/Reject Timesheet"
        size="md"
      >
        {selectedTimesheet && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Employee:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {selectedTimesheet.userName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Date:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatDateShort(selectedTimesheet.date)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Hours:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatHours(selectedTimesheet.hoursLogged)}
                </span>
              </div>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-900 dark:text-white">
                  {selectedTimesheet.description}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Comments (Optional for approval, required for rejection)
              </label>
              <textarea
                rows={3}
                value={approvalComments}
                onChange={(e) => setApprovalComments(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Add comments about this timesheet"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowApprovalModal(false);
                  setSelectedTimesheet(null);
                  setApprovalComments('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleReject}
                disabled={!approvalComments}
              >
                <XCircle className="h-5 w-5 mr-2" />
                Reject
              </Button>
              <Button variant="primary" onClick={handleApprove}>
                <CheckCircle className="h-5 w-5 mr-2" />
                Approve
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
