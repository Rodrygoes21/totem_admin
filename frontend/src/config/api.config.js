import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('🔧 API Configuration:', {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  API_URL: API_URL,
  MODE: import.meta.env.MODE
});

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
    console.log('📤 API Request:', {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      hasToken: !!token
    });
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
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
      login: '/auth/login',
      register: '/auth/register',
      me: '/auth/me',
    },
    totems: {
      getAll: '/totems',
      getById: (id) => `/totems/${id}`,
      create: '/totems',
      update: (id) => `/totems/${id}`,
      delete: (id) => `/totems/${id}`,
      toggleStatus: (id) => `/totems/${id}/toggle-status`,
      multimedia: (id) => `/totems/${id}/multimedia`,
      notifications: (id) => `/totems/${id}/notificaciones`,
    },
    instituciones: {
      getAll: '/instituciones',
      getById: (id) => `/instituciones/${id}`,
    },
    categorias: {
      getAll: '/categorias',
      getById: (id) => `/categorias/${id}`,
    },
    regiones: {
      getAll: '/regiones',
      getById: (id) => `/regiones/${id}`,
    },
    plantillas: {
      getAll: '/plantillas',
      getById: (id) => `/plantillas/${id}`,
    },
  },
};

export default api;
