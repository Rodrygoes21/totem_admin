import api, { config } from '../config/api.config';

export const authService = {
  async login(credentials) {
    console.log('🔐 Attempting login with:', { email: credentials.email });
    const response = await api.post(config.endpoints.auth.login, credentials);
    console.log('✅ Login response:', response.data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async register(userData) {
    const response = await api.post(config.endpoints.auth.register, userData);
    return response.data;
  },

  async getMe() {
    const response = await api.get(config.endpoints.auth.me);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  isAdmin() {
    const user = this.getCurrentUser();
    return user?.rol === 'admin';
  },
};

export default authService;
