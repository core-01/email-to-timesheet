import apiClient from './api';
import { User } from '../types';

export const userService = {
  getUsers: async () => {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  },

  getUserById: async (id: number) => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },

  createUser: async (user: Partial<User>) => {
    const response = await apiClient.post<User>('/users', user);
    return response.data;
  },

  updateUser: async (id: number, user: Partial<User>) => {
    const response = await apiClient.put<User>(`/users/${id}`, user);
    return response.data;
  },

  deleteUser: async (id: number) => {
    await apiClient.delete(`/users/${id}`);
  },

  getRoles: async () => {
    const response = await apiClient.get('/roles');
    return response.data;
  }
};
