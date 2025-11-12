import api from '../config/api.config';

export const regionesService = {
  getAll: async () => {
    const response = await api.get('/regiones');
    return response.data.data || response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/regiones/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/regiones', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/regiones/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/regiones/${id}`);
    return response.data;
  }
};
