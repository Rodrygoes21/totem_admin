import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token en cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const config = {
  apiUrl: API_URL,
  endpoints: {
    auth: {
      login: `${API_URL}/auth/login`,
      register: `${API_URL}/auth/register`,
      me: `${API_URL}/auth/me`,
    },
    totems: {
      getAll: `${API_URL}/totems`,
      getById: (id) => `${API_URL}/totems/${id}`,
      create: `${API_URL}/totems`,
      update: (id) => `${API_URL}/totems/${id}`,
      delete: (id) => `${API_URL}/totems/${id}`,
      toggleStatus: (id) => `${API_URL}/totems/${id}/toggle-status`,
      multimedia: (id) => `${API_URL}/totems/${id}/multimedia`,
      notifications: (id) => `${API_URL}/totems/${id}/notificaciones`,
    },
    instituciones: {
      getAll: `${API_URL}/instituciones`,
      getById: (id) => `${API_URL}/instituciones/${id}`,
    },
    categorias: {
      getAll: `${API_URL}/categorias`,
      getById: (id) => `${API_URL}/categorias/${id}`,
    },
    regiones: {
      getAll: `${API_URL}/regiones`,
      getById: (id) => `${API_URL}/regiones/${id}`,
    },
    plantillas: {
      getAll: `${API_URL}/plantillas`,
      getById: (id) => `${API_URL}/plantillas/${id}`,
    },
  },
};

export default api;
