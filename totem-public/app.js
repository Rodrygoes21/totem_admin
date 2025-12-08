// Estado de la aplicación
const AppState = {
    totemData: null,
    institucionData: null,
    multimedia: [],
    notificaciones: [],
    currentSlide: 0,
    carouselInterval: null,
    refreshInterval: null,
};

// Utilidades
const Utils = {
    // Formatear fecha
    formatDate(date) {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        
        return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
    },
    
    // Formatear hora
    formatTime(date) {
        return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    },
    
    // Fetch con manejo de errores
    async fetchApi(endpoint, options = {}) {
        try {
            const response = await fetch(`${CONFIG.API_URL}${endpoint}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en la petición:', error);
            throw error;
        }
    },
    
    // Sanitizar HTML para prevenir XSS
    sanitizeHtml(html) {
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    }
};

// Gestor del Reloj
const Clock = {
    update() {
        const now = new Date();
        const timeElement = document.getElementById('current-time');
        const dateElement = document.getElementById('current-date');
        
        if (timeElement) timeElement.textContent = Utils.formatTime(now);
        if (dateElement) dateElement.textContent = Utils.formatDate(now);
    },
    
    init() {
        this.update();
        setInterval(() => this.update(), CONFIG.CLOCK_UPDATE_INTERVAL);
    }
};

// Gestor del Carrusel
const Carousel = {
    init() {
        this.container = document.getElementById('carousel');
        this.indicators = document.getElementById('indicators');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
        
        this.startAutoPlay();
    },
    
    render(multimedia) {
        if (!this.container) return;
        
        if (!multimedia || multimedia.length === 0) {
            this.container.innerHTML = `
                <div style="text-align: center; color: white; padding: 2rem;">
                    <h3>No hay contenido multimedia disponible</h3>
                    <p>Por favor, agregue imágenes o videos desde el panel de administración</p>
                </div>
            `;
            return;
        }
        
        AppState.multimedia = multimedia;
        this.container.innerHTML = '';
        this.indicators.innerHTML = '';
        
        multimedia.forEach((item, index) => {
            const slide = document.createElement('div');
            slide.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            
            let mediaElement;
            if (item.tipo_multimedia === 'video') {
                mediaElement = `
                    <video autoplay muted loop playsinline>
                        <source src="${item.url}" type="video/mp4">
                        Tu navegador no soporta video HTML5.
                    </video>
                `;
            } else if (item.tipo_multimedia === 'imagen') {
                mediaElement = `<img src="${item.url}" alt="${Utils.sanitizeHtml(item.titulo)}">`;
            } else {
                return; // Saltar tipos no soportados
            }
            
            slide.innerHTML = `
                ${mediaElement}
                ${item.titulo || item.descripcion ? `
                    <div class="carousel-caption">
                        ${item.titulo ? `<h3>${Utils.sanitizeHtml(item.titulo)}</h3>` : ''}
                        ${item.descripcion ? `<p>${Utils.sanitizeHtml(item.descripcion)}</p>` : ''}
                    </div>
                ` : ''}
            `;
            
            this.container.appendChild(slide);
            
            // Crear indicador
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicators.appendChild(indicator);
        });
        
        AppState.currentSlide = 0;
    },
    
    goToSlide(index) {
        const items = this.container.querySelectorAll('.carousel-item');
        const indicators = this.indicators.querySelectorAll('.indicator');
        
        if (items.length === 0) return;
        
        items[AppState.currentSlide]?.classList.remove('active');
        indicators[AppState.currentSlide]?.classList.remove('active');
        
        AppState.currentSlide = index;
        
        items[AppState.currentSlide]?.classList.add('active');
        indicators[AppState.currentSlide]?.classList.add('active');
    },
    
    next() {
        const nextIndex = (AppState.currentSlide + 1) % AppState.multimedia.length;
        this.goToSlide(nextIndex);
    },
    
    prev() {
        const prevIndex = (AppState.currentSlide - 1 + AppState.multimedia.length) % AppState.multimedia.length;
        this.goToSlide(prevIndex);
    },
    
    startAutoPlay() {
        this.stopAutoPlay();
        AppState.carouselInterval = setInterval(() => {
            if (AppState.multimedia.length > 0) {
                this.next();
            }
        }, CONFIG.CAROUSEL_INTERVAL);
    },
    
    stopAutoPlay() {
        if (AppState.carouselInterval) {
            clearInterval(AppState.carouselInterval);
        }
    }
};

// Gestor de Notificaciones
const Notifications = {
    container: null,
    
    init() {
        this.container = document.getElementById('notifications-container');
    },
    
    getIcon(tipo) {
        const icons = {
            info: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
            success: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
            warning: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
            error: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
            emergencia: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
        };
        return icons[tipo] || icons.info;
    },
    
    render(notificaciones) {
        if (!this.container) return;
        
        // Filtrar notificaciones activas
        const activeNotifications = notificaciones.filter(n => n.activo);
        
        if (activeNotifications.length === 0) {
            this.container.innerHTML = '';
            return;
        }
        
        this.container.innerHTML = activeNotifications.map(notif => `
            <div class="notification ${notif.tipo}" data-id="${notif.id}">
                <div class="notification-icon">
                    ${this.getIcon(notif.tipo)}
                </div>
                <div class="notification-content">
                    <h4 class="notification-title">${Utils.sanitizeHtml(notif.titulo)}</h4>
                    <p class="notification-message">${Utils.sanitizeHtml(notif.mensaje)}</p>
                </div>
                <span class="notification-priority ${notif.prioridad}">${notif.prioridad}</span>
            </div>
        `).join('');
        
        // Mostrar modal para emergencias
        const emergencia = activeNotifications.find(n => n.tipo === 'emergencia');
        if (emergencia) {
            this.showEmergencyModal(emergencia);
        }
    },
    
    showEmergencyModal(notificacion) {
        const modal = document.getElementById('emergency-modal');
        const title = document.getElementById('emergency-title');
        const message = document.getElementById('emergency-message');
        
        if (modal && title && message) {
            title.textContent = notificacion.titulo;
            message.textContent = notificacion.mensaje;
            modal.classList.add('show');
            
            // Auto-cerrar después de 10 segundos
            setTimeout(() => {
                modal.classList.remove('show');
            }, 10000);
        }
    }
};

// Gestor de Datos del Tótem
const TotemData = {
    async load() {
        try {
            if (!CONFIG.TOTEM_ID) {
                console.error('No se ha configurado un ID de tótem');
                this.showError('Por favor, configure el tótem usando ?totem=ID en la URL');
                return;
            }
            
            // Cargar datos del tótem
            const totemResponse = await Utils.fetchApi(`/totems/${CONFIG.TOTEM_ID}`);
            if (totemResponse.success) {
                AppState.totemData = totemResponse.data;
                this.renderTotemInfo();
            }
            
            // Cargar institución
            if (AppState.totemData?.institucion_id) {
                const institucionResponse = await Utils.fetchApi(`/instituciones/${AppState.totemData.institucion_id}`);
                if (institucionResponse.success) {
                    AppState.institucionData = institucionResponse.data;
                    this.renderInstitucionInfo();
                }
            }
            
            // Cargar multimedia
            const multimediaResponse = await Utils.fetchApi(`/multimedia?totem_id=${CONFIG.TOTEM_ID}&activo=true`);
            if (multimediaResponse.success) {
                const sortedMultimedia = multimediaResponse.data.sort((a, b) => a.orden - b.orden);
                Carousel.render(sortedMultimedia);
            }
            
            // Cargar notificaciones activas del tótem
            const notifResponse = await Utils.fetchApi(`/notificaciones?totem_id=${CONFIG.TOTEM_ID}&activo=true`);
            if (notifResponse.success) {
                const activeNotifs = notifResponse.data.filter(n => {
                    const now = new Date();
                    const start = new Date(n.fecha_inicio);
                    const end = n.fecha_fin ? new Date(n.fecha_fin) : null;
                    return now >= start && (!end || now <= end);
                });
                Notifications.render(activeNotifs);
            }
            
        } catch (error) {
            console.error('Error cargando datos:', error);
            this.showError('Error al cargar los datos del tótem');
        }
    },
    
    renderTotemInfo() {
        const totem = AppState.totemData;
        if (!totem) return;
        
        // Actualizar ubicación
        const ubicacionEl = document.getElementById('totem-ubicacion');
        if (ubicacionEl && totem.ubicacion) {
            ubicacionEl.textContent = totem.ubicacion;
        }
        
        // Aplicar colores personalizados si existen
        if (totem.color) {
            document.documentElement.style.setProperty('--primary-color', totem.color);
        }
    },
    
    renderInstitucionInfo() {
        const institucion = AppState.institucionData;
        if (!institucion) return;
        
        // Actualizar nombre
        const nombreEl = document.getElementById('institucion-nombre');
        if (nombreEl) {
            nombreEl.textContent = institucion.nombre;
        }
        
        // Actualizar descripción
        const descripcionEl = document.getElementById('institucion-descripcion');
        if (descripcionEl && institucion.descripcion) {
            descripcionEl.textContent = institucion.descripcion;
        }
        
        // Actualizar logo
        const logoEl = document.getElementById('institucion-logo');
        if (logoEl && institucion.logo_url) {
            logoEl.src = institucion.logo_url;
            logoEl.style.display = 'block';
        }
        
        // Actualizar servicios
        const serviciosEl = document.getElementById('servicios-content');
        if (serviciosEl && institucion.servicios) {
            const servicios = institucion.servicios.split(',').map(s => s.trim()).filter(s => s);
            if (servicios.length > 0) {
                serviciosEl.innerHTML = `<ul>${servicios.map(s => `<li>${Utils.sanitizeHtml(s)}</li>`).join('')}</ul>`;
            }
        }
        
        // Actualizar horarios
        const horariosEl = document.getElementById('horarios-content');
        if (horariosEl && institucion.horario_atencion) {
            horariosEl.innerHTML = `<p>${Utils.sanitizeHtml(institucion.horario_atencion)}</p>`;
        }
        
        // Actualizar contacto
        const contactoEl = document.getElementById('contacto-content');
        if (contactoEl) {
            const contactInfo = [];
            if (institucion.telefono) contactInfo.push(`<li>📞 ${Utils.sanitizeHtml(institucion.telefono)}</li>`);
            if (institucion.email) contactInfo.push(`<li>📧 ${Utils.sanitizeHtml(institucion.email)}</li>`);
            if (institucion.sitio_web) contactInfo.push(`<li>🌐 ${Utils.sanitizeHtml(institucion.sitio_web)}</li>`);
            
            if (contactInfo.length > 0) {
                contactoEl.innerHTML = `<ul>${contactInfo.join('')}</ul>`;
            }
        }
    },
    
    showError(message) {
        const main = document.querySelector('.main-content');
        if (main) {
            main.innerHTML = `
                <div style="text-align: center; padding: 4rem; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" style="margin: 0 auto 1rem;">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                    <h2 style="color: #1f2937; margin-bottom: 1rem;">Error</h2>
                    <p style="color: #6b7280; font-size: 1.1rem;">${message}</p>
                </div>
            `;
        }
    }
};

// Inicialización de la aplicación
async function initApp() {
    console.log('Inicializando aplicación del tótem...');
    console.log('ID del tótem:', CONFIG.TOTEM_ID);
    
    // Inicializar componentes
    Clock.init();
    Carousel.init();
    Notifications.init();
    
    // Cargar datos iniciales
    await TotemData.load();
    
    // Configurar actualización automática
    AppState.refreshInterval = setInterval(() => {
        console.log('Actualizando datos...');
        TotemData.load();
    }, CONFIG.REFRESH_INTERVAL);
    
    console.log('Aplicación inicializada correctamente');
}

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Cerrar modal de emergencia al hacer clic fuera
document.addEventListener('click', (e) => {
    const modal = document.getElementById('emergency-modal');
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// Prevenir que la pantalla se apague (útil para tótems)
if ('wakeLock' in navigator) {
    let wakeLock = null;
    
    const requestWakeLock = async () => {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Wake Lock activado');
        } catch (err) {
            console.error('Error activando Wake Lock:', err);
        }
    };
    
    requestWakeLock();
    
    document.addEventListener('visibilitychange', () => {
        if (wakeLock !== null && document.visibilityState === 'visible') {
            requestWakeLock();
        }
    });
}
