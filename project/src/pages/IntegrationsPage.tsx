import { useEffect, useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { integrationService } from '../services/integrationService';
import { Integration, IntegrationType, IntegrationLog } from '../types';
import { formatDate } from '../utils/formatters';
import { Settings, CheckCircle, XCircle, Activity } from 'lucide-react';

export const IntegrationsPage = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [logs, setLogs] = useState<IntegrationLog[]>([]);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [formData, setFormData] = useState({
    apiUrl: '',
    apiToken: '',
  });

  useEffect(() => {
    loadIntegrations();
    loadLogs();
  }, []);

  const loadIntegrations = async () => {
    try {
      const data = await integrationService.getIntegrations();
      setIntegrations(data);
    } catch (error) {
      setIntegrations([
        {
          id: 1,
          name: 'Jira Integration',
          type: IntegrationType.JIRA,
          apiUrl: 'https://your-domain.atlassian.net',
          isActive: true,
          lastSyncedAt: '2025-10-30T10:00:00',
        },
        {
          id: 2,
          name: 'Slack Integration',
          type: IntegrationType.SLACK,
          apiUrl: 'https://hooks.slack.com/services/...',
          isActive: true,
          lastSyncedAt: '2025-10-30T09:30:00',
        },
        {
          id: 3,
          name: 'Teams Integration',
          type: IntegrationType.TEAMS,
          apiUrl: 'https://outlook.office.com/webhook/...',
          isActive: false,
        },
      ]);
    }
  };

  const loadLogs = async () => {
    try {
      const data = await integrationService.getIntegrationLogs();
      setLogs(data);
    } catch (error) {
      setLogs([]);
    }
  };

  const handleEdit = (integration: Integration) => {
    setSelectedIntegration(integration);
    setFormData({
      apiUrl: integration.apiUrl,
      apiToken: '••••••••',
    });
    setShowEditModal(true);
  };

  const handleTest = async (integration: Integration) => {
    try {
      await integrationService.testIntegration(integration.id);
      alert('Integration test successful!');
    } catch (error) {
      alert('Integration test failed. Please check your configuration.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIntegration) {
      try {
        await integrationService.updateIntegration(selectedIntegration.id, {
          apiUrl: formData.apiUrl,
        });
        setShowEditModal(false);
        loadIntegrations();
      } catch (error) {
        alert('Failed to update integration');
      }
    }
  };

  const getIntegrationIcon = (type: IntegrationType) => {
    switch (type) {
      case IntegrationType.JIRA:
        return <Activity className="h-8 w-8" />;
      case IntegrationType.SLACK:
        return <Settings className="h-8 w-8" />;
      case IntegrationType.TEAMS:
        return <Settings className="h-8 w-8" />;
      default:
        return <Settings className="h-8 w-8" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Integrations</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Configure and manage third-party integrations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                    integration.isActive
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400'
                  }`}>
                    {getIntegrationIcon(integration.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {integration.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {integration.type}
                    </p>
                  </div>
                </div>
                <Badge className={integration.isActive
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                }>
                  {integration.isActive ? (
                    <CheckCircle className="h-3 w-3 mr-1 inline" />
                  ) : (
                    <XCircle className="h-3 w-3 mr-1 inline" />
                  )}
                  {integration.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">API URL:</span>
                  <p className="text-gray-900 dark:text-white truncate font-mono text-xs">
                    {integration.apiUrl}
                  </p>
                </div>
                {integration.lastSyncedAt && (
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Last Synced:</span>
                    <p className="text-gray-900 dark:text-white">
                      {formatDate(integration.lastSyncedAt)}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEdit(integration)}
                >
                  Configure
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleTest(integration)}
                >
                  Test
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card
        title="Integration Logs"
        action={
          <Button variant="ghost" size="sm" onClick={() => setShowLogsModal(true)}>
            <Activity className="h-4 w-4 mr-2" />
            View All
          </Button>
        }
      >
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No integration logs available
            </p>
          ) : (
            logs.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {log.integrationName}
                    </span>
                    <Badge className={
                      log.status === 'SUCCESS'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : log.status === 'FAILURE'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }>
                      {log.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {log.action}: {log.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {formatDate(log.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Integration Logs modal (opened via "View All") */}
      <Modal
        isOpen={showLogsModal}
        onClose={() => setShowLogsModal(false)}
        title="Integration Logs"
        size="lg"
      >
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No integration logs available
            </p>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white">{log.integrationName}</span>
                    <Badge className={
                      log.status === 'SUCCESS'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : log.status === 'FAILURE'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }>
                      {log.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{log.action}: {log.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{formatDate(log.timestamp)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Configure Integration"
        size="lg"
      >
        {selectedIntegration && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>{selectedIntegration.name}</strong> configuration
              </p>
            </div>

            <Input
              label="API URL"
              value={formData.apiUrl}
              onChange={(e) => setFormData({ ...formData, apiUrl: e.target.value })}
              required
            />

            <Input
              label="API Token / Key"
              type="password"
              value={formData.apiToken}
              onChange={(e) => setFormData({ ...formData, apiToken: e.target.value })}
              placeholder="Enter your API token"
            />

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Configuration
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
