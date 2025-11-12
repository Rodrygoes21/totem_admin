import api from '../config/api.config';

export const categoriasService = {
  getAll: async () => {
    const response = await api.get('/categorias');
    return response.data.data || response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/categorias/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/categorias', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/categorias/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/categorias/${id}`);
    return response.data;
  }
};
