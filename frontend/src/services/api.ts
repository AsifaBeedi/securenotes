import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Note {
  _id: string;
  title: string;
  encryptedContent?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isShared: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface CreateNoteData {
  title: string;
  encryptedContent: string;
  tags?: string[];
}

// Auth API
export const authAPI = {
  login: async (data: LoginData) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Notes API
export const notesAPI = {
  getAllNotes: async (page: number = 1, search: string = '') => {
    const response = await api.get(`/notes?page=${page}&search=${search}`);
    return response.data;
  },

  getNote: async (id: string) => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },

  createNote: async (data: CreateNoteData) => {
    const response = await api.post('/notes', data);
    return response.data;
  },

  updateNote: async (id: string, data: CreateNoteData) => {
    const response = await api.put(`/notes/${id}`, data);
    return response.data;
  },

  deleteNote: async (id: string) => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  },

  shareNote: async (id: string, expiresIn: number = 24) => {
    const response = await api.post(`/notes/${id}/share`, { expiresIn });
    return response.data;
  },

  getSharedNote: async (token: string) => {
    const response = await axios.get(`${API_URL}/notes/shared/${token}`);
    return response.data;
  },
};

export default api;
