import apiClient from './api';
import { Integration, IntegrationLog } from '../types';

export const integrationService = {
  getIntegrations: async () => {
    const response = await apiClient.get<Integration[]>('/integrations');
    return response.data;
  },

  getIntegrationById: async (id: number) => {
    const response = await apiClient.get<Integration>(`/integrations/${id}`);
    return response.data;
  },

  updateIntegration: async (id: number, integration: Partial<Integration>) => {
    const response = await apiClient.put<Integration>(`/integrations/${id}`, integration);
    return response.data;
  },

  testIntegration: async (id: number) => {
    const response = await apiClient.post(`/integrations/${id}/test`);
    return response.data;
  },

  getIntegrationLogs: async (params?: { integrationId?: number; status?: string; startDate?: string; endDate?: string }) => {
    const response = await apiClient.get<IntegrationLog[]>('/integrations/logs', { params });
    return response.data;
  }
};
