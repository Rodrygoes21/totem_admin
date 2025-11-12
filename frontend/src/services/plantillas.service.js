import api from '../config/api.config';

export const plantillasService = {
  getAll: async () => {
    const response = await api.get('/plantillas');
    return response.data.data || response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/plantillas/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/plantillas', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/plantillas/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/plantillas/${id}`);
    return response.data;
  }
};
