import api from '../config/api.config';

export const totemService = {
  async getAll(params = {}) {
    const response = await api.get('/totems', { params });
    // Si la respuesta tiene estructura de paginación, devolverla completa
    if (response.data.pagination) {
      return response.data;
    }
    // Si no, devolver solo los datos
    return response.data.data || response.data;
  },

  async getById(id) {
    const response = await api.get(`/totems/${id}`);
    return response.data.data || response.data;
  },

  async create(totemData) {
    const response = await api.post('/totems', totemData);
    return response.data.data || response.data;
  },

  async update(id, totemData) {
    const response = await api.put(`/totems/${id}`, totemData);
    return response.data.data || response.data;
  },

  async delete(id) {
    const response = await api.delete(`/totems/${id}`);
    return response.data;
  },

  async toggleStatus(id) {
    const response = await api.patch(`/totems/${id}/toggle-status`);
    return response.data;
  },

  async getMultimedia(id, params = {}) {
    const response = await api.get(`/totems/${id}/multimedia`, { params });
    return response.data.data || response.data;
  },

  async getNotifications(id, params = {}) {
    const response = await api.get(`/totems/${id}/notificaciones`, { params });
    return response.data.data || response.data;
  },
};

export default totemService;
