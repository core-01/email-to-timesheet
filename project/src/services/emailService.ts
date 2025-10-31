import apiClient from './api';
import { Email } from '../types';

export const emailService = {
  getEmails: async (params?: { status?: string; page?: number; size?: number }) => {
    const response = await apiClient.get<{ content: Email[]; totalElements: number }>('/emails', { params });
    return response.data;
  },

  getEmailById: async (id: number) => {
    const response = await apiClient.get<Email>(`/emails/${id}`);
    return response.data;
  },

  updateEmailStatus: async (id: number, status: string) => {
    const response = await apiClient.patch(`/emails/${id}/status`, { status });
    return response.data;
  }
};
