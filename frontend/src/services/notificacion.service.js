import api from '../config/api.config';

export const notificacionService = {
  async getAll(params = {}) {
    const response = await api.get('/notificaciones', { params });
    return response.data.data || response.data;
  },

  async getById(id) {
    const response = await api.get(`/notificaciones/${id}`);
    return response.data.data || response.data;
  },

  async getByTotem(totemId, params = {}) {
    const response = await api.get(`/notificaciones/totem/${totemId}`, { params });
    return response.data.data || response.data;
  },

  async getActive(params = {}) {
    const response = await api.get('/notificaciones/activas', { params });
    return response.data.data || response.data;
  },

  async create(data) {
    const response = await api.post('/notificaciones', data);
    return response.data.data || response.data;
  },

  async update(id, data) {
    const response = await api.put(`/notificaciones/${id}`, data);
    return response.data.data || response.data;
  },

  async delete(id) {
    const response = await api.delete(`/notificaciones/${id}`);
    return response.data;
  },

  async toggle(id) {
    const response = await api.put(`/notificaciones/${id}/toggle`);
    return response.data;
  },

  async marcarLeida(id) {
    const response = await api.put(`/notificaciones/${id}/leida`);
    return response.data;
  },
};

export default notificacionService;
