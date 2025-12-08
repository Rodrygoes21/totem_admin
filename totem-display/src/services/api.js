import axios from 'axios';
import { API_CONFIG } from '../config';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Servicios de API
export const totemService = {
  getById: async (id) => {
    const response = await api.get(`/totems/${id}`);
    return response.data;
  },
};

export const institucionService = {
  getById: async (id) => {
    const response = await api.get(`/instituciones/${id}`);
    return response.data;
  },
};

export const multimediaService = {
  getByTotem: async (totemId) => {
    const response = await api.get(`/multimedia/totem/${totemId}`);
    return response.data;
  },
};

export const notificacionService = {
  getByTotem: async (totemId) => {
    const response = await api.get(`/notificaciones`, {
      params: { totem_id: totemId, activo: true },
    });
    return response.data;
  },
  
  getActivas: async () => {
    const response = await api.get(`/notificaciones/activas`);
    return response.data;
  },
};

export default api;
