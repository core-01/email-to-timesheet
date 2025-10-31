import { useEffect, useState } from 'react';
import { Card } from '../components/common/Card';
import { Table } from '../components/common/Table';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Select } from '../components/common/Select';
import { Input } from '../components/common/Input';
import { logService } from '../services/logService';
import { SystemLog, ErrorLog, LogLevel } from '../types';
import { formatDate } from '../utils/formatters';
import { Download, AlertCircle, Info } from 'lucide-react';

type LogType = 'system' | 'error';

export const LogsPage = () => {
  const [logType, setLogType] = useState<LogType>('system');
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([]);
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([]);
  const [serviceFilter, setServiceFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLogs();
  }, [logType, serviceFilter, levelFilter]);

  const loadLogs = async () => {
    setLoading(true);
    try {
      if (logType === 'system') {
        const data = await logService.getSystemLogs({
          serviceName: serviceFilter || undefined,
          level: levelFilter || undefined,
        });
        setSystemLogs(data.content);
      } else {
        const data = await logService.getErrorLogs({
          serviceName: serviceFilter || undefined,
        });
        setErrorLogs(data.content);
      }
    } catch (error) {
      if (logType === 'system') {
        setSystemLogs([
          {
            id: 1,
            serviceName: 'EmailService',
            level: LogLevel.INFO,
            message: 'Email processing completed successfully',
            timestamp: '2025-10-30T14:30:00',
          },
          {
            id: 2,
            serviceName: 'TicketService',
            level: LogLevel.WARNING,
            message: 'High volume of tickets detected',
            timestamp: '2025-10-30T13:15:00',
          },
        ]);
      } else {
        setErrorLogs([
          {
            id: 1,
            serviceName: 'EmailService',
            errorType: 'NetworkException',
            errorMessage: 'Failed to connect to email server',
            timestamp: '2025-10-30T12:00:00',
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      const blob = await logService.exportLogs(logType, {
        startDate: startDate.toISOString(),
        endDate: new Date().toISOString(),
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${logType}-logs-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    } catch (error) {
      alert('Export functionality will be available with backend integration');
    }
  };

  const getLevelColor = (level: LogLevel) => {
    const colors = {
      [LogLevel.INFO]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      [LogLevel.WARNING]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      [LogLevel.ERROR]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      [LogLevel.DEBUG]: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    };
    return colors[level];
  };

  const systemColumns = [
    {
      header: 'Timestamp',
      accessor: (row: SystemLog) => formatDate(row.timestamp),
    },
    {
      header: 'Service',
      accessor: (row: SystemLog) => (
        <span className="font-mono text-sm">{row.serviceName}</span>
      ),
    },
    {
      header: 'Level',
      accessor: (row: SystemLog) => (
        <Badge className={getLevelColor(row.level)}>
          {row.level}
        </Badge>
      ),
    },
    {
      header: 'Message',
      accessor: (row: SystemLog) => (
        <span className="truncate max-w-md block">{row.message}</span>
      ),
    },
  ];

  const errorColumns = [
    {
      header: 'Timestamp',
      accessor: (row: ErrorLog) => formatDate(row.timestamp),
    },
    {
      header: 'Service',
      accessor: (row: ErrorLog) => (
        <span className="font-mono text-sm">{row.serviceName}</span>
      ),
    },
    {
      header: 'Error Type',
      accessor: (row: ErrorLog) => (
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          {row.errorType}
        </Badge>
      ),
    },
    {
      header: 'Message',
      accessor: (row: ErrorLog) => (
        <span className="truncate max-w-md block">{row.errorMessage}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Logs</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor system events and errors
          </p>
        </div>
        <Button variant="secondary" onClick={handleExport}>
          <Download className="h-5 w-5 mr-2" />
          Export Logs
        </Button>
      </div>

      <div className="flex gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <Button
            variant={logType === 'system' ? 'primary' : 'ghost'}
            onClick={() => setLogType('system')}
          >
            <Info className="h-4 w-4 mr-2" />
            System Logs
          </Button>
          <Button
            variant={logType === 'error' ? 'primary' : 'ghost'}
            onClick={() => setLogType('error')}
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Error Logs
          </Button>
        </div>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Filter by Service"
            placeholder="e.g., EmailService"
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
          />
          {logType === 'system' && (
            <Select
              label="Filter by Level"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              options={[
                { value: '', label: 'All Levels' },
                { value: LogLevel.INFO, label: 'Info' },
                { value: LogLevel.WARNING, label: 'Warning' },
                { value: LogLevel.ERROR, label: 'Error' },
                { value: LogLevel.DEBUG, label: 'Debug' },
              ]}
            />
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : logType === 'system' ? (
          <Table data={systemLogs} columns={systemColumns} />
        ) : (
          <Table data={errorLogs} columns={errorColumns} />
        )}
      </Card>
    </div>
  );
};
