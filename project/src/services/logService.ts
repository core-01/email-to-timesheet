import apiClient from './api';
import { SystemLog, ErrorLog } from '../types';

export const logService = {
  getSystemLogs: async (params?: { serviceName?: string; level?: string; startDate?: string; endDate?: string; page?: number; size?: number }) => {
    const response = await apiClient.get<{ content: SystemLog[]; totalElements: number }>('/logs/system', { params });
    return response.data;
  },

  getErrorLogs: async (params?: { serviceName?: string; startDate?: string; endDate?: string; page?: number; size?: number }) => {
    const response = await apiClient.get<{ content: ErrorLog[]; totalElements: number }>('/logs/error', { params });
    return response.data;
  },

  exportLogs: async (type: 'system' | 'error', params: { startDate: string; endDate: string }) => {
    const response = await apiClient.get(`/logs/${type}/export`, {
      params,
      responseType: 'blob'
    });
    return response.data;
  }
};
