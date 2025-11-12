import api from '../config/api.config';

export const institucionesService = {
  getAll: async () => {
    const response = await api.get('/instituciones');
    return response.data.data || response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/instituciones/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/instituciones', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/instituciones/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/instituciones/${id}`);
    return response.data;
  }
};
