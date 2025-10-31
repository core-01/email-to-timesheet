import { useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Loading } from '../components/common/Loading';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import {
  fetchDashboardMetrics,
  fetchWeeklyTimelogData,
  fetchTicketProgressData,
  fetchEmailStatusData
} from '../redux/slices/dashboardSlice';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Mail, Ticket, Clock, CheckCircle } from 'lucide-react';
import { mockMetrics, mockWeeklyTimelogData, mockTicketProgressData, mockEmailStatusData } from '../utils/mockData';

export const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { metrics, weeklyTimelogData, ticketProgressData, emailStatusData, loading } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardMetrics()).catch(() => {});
    dispatch(fetchWeeklyTimelogData()).catch(() => {});
    dispatch(fetchTicketProgressData()).catch(() => {});
    dispatch(fetchEmailStatusData()).catch(() => {});
  }, [dispatch]);

  const displayMetrics = metrics || mockMetrics;
  const displayWeeklyData = weeklyTimelogData.length > 0 ? weeklyTimelogData : mockWeeklyTimelogData;
  const displayTicketData = ticketProgressData.length > 0 ? ticketProgressData : mockTicketProgressData;
  const displayEmailData = emailStatusData.length > 0 ? emailStatusData : mockEmailStatusData;

  if (loading && !metrics) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Overview of your email, tickets, and timesheet metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Emails</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {displayMetrics.totalEmails}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                {displayMetrics.emailsProcessed} processed
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {displayMetrics.totalTickets}
              </p>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                {displayMetrics.ticketsOpen} open
              </p>
            </div>
            <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <Ticket className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Timesheets</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {displayMetrics.totalTimesheets}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                {displayMetrics.timesheetsPending} pending
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hours This Week</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {displayMetrics.hoursLoggedThisWeek}h
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                {displayMetrics.timesheetsApproved} approved
              </p>
            </div>
            <div className="h-12 w-12 bg-slate-100 dark:bg-slate-900/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Weekly Time Logs">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={displayWeeklyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis dataKey="name" className="text-gray-600 dark:text-gray-400" />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem'
                }}
              />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" name="Hours Logged" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Ticket Progress">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={displayTicketData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                dataKey="value"
              >
                {displayTicketData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill as string} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Email Processing Status" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={displayEmailData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis type="number" className="text-gray-600 dark:text-gray-400" />
              <YAxis dataKey="name" type="category" className="text-gray-600 dark:text-gray-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem'
                }}
              />
              <Legend />
              <Bar dataKey="value" name="Emails" radius={[0, 8, 8, 0]}>
                {displayEmailData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill as string} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};
