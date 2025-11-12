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
};

export default {
  institucionService,
  categoriaService,
  regionService,
  plantillaService,
};
