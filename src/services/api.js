import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://taskmanager-backend-1-jcsk.onrender.com/api' // Production API URL
    : 'http://localhost:5000/api'; // Replace with your API URL
// Create a unique storage key for this tab
const generateStorageKey = () => {
  return `auth_token_${Math.random().toString(36).substring(2, 15)}`;
};

// Get the storage key for this tab
const getStorageKey = () => {
  let key = sessionStorage.getItem('auth_token_key');
  if (!key) {
    key = generateStorageKey();
    sessionStorage.setItem('auth_token_key', key);
  }
  return key;
};

// Check if we already have a token in localStorage
const getExistingToken = () => {
  return localStorage.getItem('auth_token');
};

// Store token in both localStorage and sessionStorage
const storeToken = (token) => {
  // Store in localStorage for cross-tab persistence
  localStorage.setItem('auth_token', token);
  // Also store in sessionStorage with a unique key for this tab
  sessionStorage.setItem(getStorageKey(), token);
};

// Remove token from both storages
const removeToken = () => {
  localStorage.removeItem('auth_token');
  const tokenKey = sessionStorage.getItem('auth_token_key');
  if (tokenKey) {
    sessionStorage.removeItem(tokenKey);
    sessionStorage.removeItem('auth_token_key');
  }
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  // First try to get token from sessionStorage (tab-specific)
  let token = sessionStorage.getItem(getStorageKey());
  
  // If not found in sessionStorage, check localStorage
  if (!token) {
    token = getExistingToken();
    // If found in localStorage, store it in sessionStorage for this tab
    if (token) {
      sessionStorage.setItem(getStorageKey(), token);
    }
  }
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: async (email, password) => {
    const response = await api.post('/auth/signup', { email, password });
    if (response.data.token) {
      storeToken(response.data.token);
    }
    return response.data;
  },
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      storeToken(response.data.token);
    }
    return response.data;
  },
  logout: async () => {
    removeToken();
    const response = await api.get('/auth/logout');
    return response.data;
  },
  validateToken: async () => {
    try {
      const response = await api.get('/auth/validate');
      return response.data;
    } catch (error) {
      console.error('Token validation error:', error);
      throw error;
    }
  },
};

// Task API
export const taskAPI = {
  getTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },
  getTaskById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },
  createTask: async (title, description) => {
    const response = await api.post('/tasks', { title, description });
    return response.data;
  },
  updateTask: async (id, title, description) => {
    const response = await api.put(`/tasks/${id}`, { title, description });
    return response.data;
  },
  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default api;