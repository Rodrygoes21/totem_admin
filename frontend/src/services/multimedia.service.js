import api from '../config/api.config';

const multimediaService = {
  async create(data) {
    const response = await api.post('/multimedia', data);
    return response.data;
  },

  async createMultiple(totemId, items) {
    const promises = items.map(item => 
      this.create({
        totem_id: totemId,
        ...item
      })
    );
    return await Promise.all(promises);
  },

  async getByTotem(totemId) {
    const response = await api.get(`/multimedia/totem/${totemId}`);
    return response.data.data || response.data;
  },

  async delete(id) {
    const response = await api.delete(`/multimedia/${id}`);
    return response.data;
  },

  async deleteByTotem(totemId, tipo) {
    const multimedia = await this.getByTotem(totemId);
    const filtered = Array.isArray(multimedia) 
      ? multimedia.filter(m => m.tipo_multimedia === tipo)
      : [];
    
    const promises = filtered.map(m => this.delete(m.id));
    return await Promise.all(promises);
  }
};

export default multimediaService;
