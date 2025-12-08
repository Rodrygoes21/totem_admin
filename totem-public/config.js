// Configuración de la aplicación del tótem
const CONFIG = {
    // URL de tu API (cambiar en producción)
    API_URL: 'https://totem-admin.onrender.com/api',
    
    // ID del tótem (se obtendrá de la URL o configuración)
    TOTEM_ID: null,
    
    // Intervalo de actualización en milisegundos
    REFRESH_INTERVAL: 60000, // 1 minuto
    
    // Intervalo del carrusel en milisegundos
    CAROUSEL_INTERVAL: 5000, // 5 segundos
    
    // Tiempo de actualización del reloj
    CLOCK_UPDATE_INTERVAL: 1000, // 1 segundo
};

// Función para obtener el ID del tótem desde la URL
function getTotemIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const totemId = urlParams.get('totem') || urlParams.get('id');
    
    if (totemId) {
        CONFIG.TOTEM_ID = parseInt(totemId);
        // Guardar en localStorage para próximas visitas
        localStorage.setItem('totem_id', totemId);
    } else {
        // Intentar obtener del localStorage
        const savedTotemId = localStorage.getItem('totem_id');
        if (savedTotemId) {
            CONFIG.TOTEM_ID = parseInt(savedTotemId);
        }
    }
    
    return CONFIG.TOTEM_ID;
}

// Inicializar configuración
getTotemIdFromUrl();

// Si no hay ID de tótem, mostrar mensaje
if (!CONFIG.TOTEM_ID) {
    console.warn('No se ha especificado un ID de tótem. Use ?totem=ID en la URL');
}
