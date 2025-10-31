import apiClient from './api';
import { Ticket, Comment } from '../types';

export const ticketService = {
  getTickets: async (params?: { status?: string; assigneeId?: number; page?: number; size?: number }) => {
    const response = await apiClient.get<{ content: Ticket[]; totalElements: number }>('/tickets', { params });
    return response.data;
  },

  getTicketById: async (id: number) => {
    const response = await apiClient.get<Ticket>(`/tickets/${id}`);
    return response.data;
  },

  createTicket: async (ticket: Partial<Ticket>) => {
    const response = await apiClient.post<Ticket>('/tickets', ticket);
    return response.data;
  },

  updateTicket: async (id: number, ticket: Partial<Ticket>) => {
    const response = await apiClient.put<Ticket>(`/tickets/${id}`, ticket);
    return response.data;
  },

  addComment: async (ticketId: number, content: string) => {
    const response = await apiClient.post<Comment>(`/tickets/${ticketId}/comments`, { content });
    return response.data;
  },

  getComments: async (ticketId: number) => {
    const response = await apiClient.get<Comment[]>(`/tickets/${ticketId}/comments`);
    return response.data;
  },

  getStatusHistory: async (ticketId: number) => {
    const response = await apiClient.get(`/tickets/${ticketId}/history`);
    return response.data;
  }
};
