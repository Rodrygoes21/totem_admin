// Configuración de la API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://totem-admin.onrender.com/api',
  REFRESH_INTERVAL: 60000, // 1 minuto
  CAROUSEL_INTERVAL: 5000, // 5 segundos
};

// Obtener ID del tótem desde la URL
export const getTotemId = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const totemId = urlParams.get('totem') || urlParams.get('id');
  
  if (totemId) {
    localStorage.setItem('totem_id', totemId);
    return parseInt(totemId);
  }
  
  const savedTotemId = localStorage.getItem('totem_id');
  return savedTotemId ? parseInt(savedTotemId) : null;
};
