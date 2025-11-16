import api from '../config/api.config';

export const institucionService = {
  async getAll(params = {}) {
    const response = await api.get('/instituciones', { params });
    return response.data.data || response.data;
  },

  async getById(id) {
    const response = await api.get(`/instituciones/${id}`);
    return response.data.data || response.data;
  },

  async create(data) {
    const response = await api.post('/instituciones', data);
    return response.data.data || response.data;
  },

  async update(id, data) {
    const response = await api.put(`/instituciones/${id}`, data);
    return response.data.data || response.data;
  },

  async delete(id) {
    const response = await api.delete(`/instituciones/${id}`);
    return response.data;
  },

  async toggle(id) {
    const response = await api.put(`/instituciones/${id}/toggle`);
    return response.data;
  },
};

export const categoriaService = {
  async getAll(params = {}) {
    const response = await api.get('/categorias', { params });
    return response.data.data || response.data;
  },

  async getById(id) {
    const response = await api.get(`/categorias/${id}`);
    return response.data.data || response.data;
  },

  async create(data) {
    const response = await api.post('/categorias', data);
    return response.data.data || response.data;
  },

  async update(id, data) {
    const response = await api.put(`/categorias/${id}`, data);
    return response.data.data || response.data;
  },

  async delete(id) {
    const response = await api.delete(`/categorias/${id}`);
    return response.data;
  },

  async toggle(id) {
    const response = await api.put(`/categorias/${id}/toggle`);
    return response.data;
  },
};

export const regionService = {
  async getAll(params = {}) {
    const response = await api.get('/regiones', { params });
    return response.data.data || response.data;
  },

  async getById(id) {
    const response = await api.get(`/regiones/${id}`);
    return response.data.data || response.data;
  },

  async create(data) {
    const response = await api.post('/regiones', data);
    return response.data.data || response.data;
  },

  async update(id, data) {
    const response = await api.put(`/regiones/${id}`, data);
    return response.data.data || response.data;
  },

  async delete(id) {
    const response = await api.delete(`/regiones/${id}`);
    return response.data;
  },

  async toggle(id) {
    const response = await api.put(`/regiones/${id}/toggle`);
    return response.data;
  },
};

export const plantillaService = {
  async getAll(params = {}) {
    const response = await api.get('/plantillas', { params });
    return response.data.data || response.data;
  },

  async getById(id) {
    const response = await api.get(`/plantillas/${id}`);
    return response.data.data || response.data;
  },

  async create(data) {
    const response = await api.post('/plantillas', data);
    return response.data.data || response.data;
  },

  async update(id, data) {
    const response = await api.put(`/plantillas/${id}`, data);
    return response.data.data || response.data;
  },

  async delete(id) {
    const response = await api.delete(`/plantillas/${id}`);
    return response.data;
  },

  async toggle(id) {
    const response = await api.put(`/plantillas/${id}/toggle`);
    return response.data;
  },
};

export const totemService = {
  async getAll(params = {}) {
    const response = await api.get('/totems', { params });
    return response.data.data || response.data;
  },

  async getById(id) {
    const response = await api.get(`/totems/${id}`);
    return response.data.data || response.data;
  },

  async create(data) {
    const response = await api.post('/totems', data);
    return response.data.data || response.data;
  },

  async update(id, data) {
    const response = await api.put(`/totems/${id}`, data);
    return response.data.data || response.data;
  },

  async delete(id) {
    const response = await api.delete(`/totems/${id}`);
    return response.data;
  },

  async toggle(id) {
    const response = await api.put(`/totems/${id}/toggle`);
    return response.data;
  },
};

export default {
  institucionService,
  categoriaService,
  regionService,
  plantillaService,
  totemService,
};
