import apiClient from './api';
import { Timesheet } from '../types';

export const timesheetService = {
  getTimesheets: async (params?: { userId?: number; status?: string; startDate?: string; endDate?: string }) => {
    const response = await apiClient.get<Timesheet[]>('/timesheets', { params });
    return response.data;
  },

  getTimesheetById: async (id: number) => {
    const response = await apiClient.get<Timesheet>(`/timesheets/${id}`);
    return response.data;
  },

  createTimesheet: async (timesheet: Partial<Timesheet>) => {
    const response = await apiClient.post<Timesheet>('/timesheets', timesheet);
    return response.data;
  },

  updateTimesheet: async (id: number, timesheet: Partial<Timesheet>) => {
    const response = await apiClient.put<Timesheet>(`/timesheets/${id}`, timesheet);
    return response.data;
  },

  submitTimesheet: async (id: number) => {
    const response = await apiClient.post(`/timesheets/${id}/submit`);
    return response.data;
  },

  approveTimesheet: async (id: number, comments?: string) => {
    const response = await apiClient.post(`/timesheets/${id}/approve`, { comments });
    return response.data;
  },

  rejectTimesheet: async (id: number, comments: string) => {
    const response = await apiClient.post(`/timesheets/${id}/reject`, { comments });
    return response.data;
  },

  exportTimesheets: async (params: { startDate: string; endDate: string; format: 'pdf' | 'excel' }) => {
    const response = await apiClient.get('/timesheets/export', {
      params,
      responseType: 'blob'
    });
    return response.data;
  }
};
