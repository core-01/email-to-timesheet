import apiClient from './api';
import { User } from '../types';
import { mockUsers } from '../utils/mockData';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    // Use a local mock login when running in Vite dev mode or when VITE_USE_MOCK is enabled.
    // This makes the demo credentials (admin / password) work without a backend.
    const useMock = import.meta.env.DEV || import.meta.env.VITE_USE_MOCK === 'true';
    if (useMock) {
      const user = mockUsers.find((u) => u.username === credentials.username);
      // For demo purposes the password is fixed to 'password' for all mock users.
      if (!user || credentials.password !== 'password') {
        return Promise.reject({ response: { data: { message: 'Invalid username or password' } } });
      }

      const token = `mock-token-${btoa(user.username)}`;
      return Promise.resolve({ token, user });
    }

    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  setToken: (token: string) => {
    localStorage.setItem('token', token);
  },

  setUser: (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
  }
};
