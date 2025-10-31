import apiClient from './api';
import { DashboardMetrics, ChartData } from '../types';

export const dashboardService = {
  getMetrics: async () => {
    const response = await apiClient.get<DashboardMetrics>('/dashboard/metrics');
    return response.data;
  },

  getWeeklyTimelogData: async () => {
    const response = await apiClient.get<ChartData[]>('/dashboard/charts/weekly-timelogs');
    return response.data;
  },

  getTicketProgressData: async () => {
    const response = await apiClient.get<ChartData[]>('/dashboard/charts/ticket-progress');
    return response.data;
  },

  getEmailStatusData: async () => {
    const response = await apiClient.get<ChartData[]>('/dashboard/charts/email-status');
    return response.data;
  }
};
