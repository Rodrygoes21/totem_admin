-- ============================================
-- SCRIPT COMPLETO DE BASE DE DATOS TOTEM
-- Para Railway MySQL
-- Fecha: 11 de Noviembre, 2025
-- ============================================

-- Nota: Railway ya crea la base de datos, no uses CREATE DATABASE
-- Si necesitas limpiar las tablas existentes, descomenta las siguientes líneas:
-- DROP TABLE IF EXISTS UserChat;
-- DROP TABLE IF EXISTS Multimedia;
-- DROP TABLE IF EXISTS Notificacion;
-- DROP TABLE IF EXISTS LogActividad;
-- DROP TABLE IF EXISTS TOTEM;
-- DROP TABLE IF EXISTS PlantillaColor;
-- DROP TABLE IF EXISTS Categoria;
-- DROP TABLE IF EXISTS Institucion;
-- DROP TABLE IF EXISTS Region;
-- DROP TABLE IF EXISTS Usuario;

-- ============================================
-- TABLA: Usuario
-- ============================================
CREATE TABLE IF NOT EXISTS Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'usuario', 'moderador') NOT NULL DEFAULT 'usuario',
    activo BOOLEAN DEFAULT TRUE,
    ultimo_acceso DATETIME,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: Region
-- ============================================
CREATE TABLE IF NOT EXISTS Region (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: Institucion
-- ============================================
CREATE TABLE IF NOT EXISTS Institucion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    direccion VARCHAR(200),
    telefono VARCHAR(20),
    email VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: Categoria
-- ============================================
CREATE TABLE IF NOT EXISTS Categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    informacion TEXT,
    icon VARCHAR(100),
    color VARCHAR(7) DEFAULT '#3498db',
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: PlantillaColor
-- ============================================
CREATE TABLE IF NOT EXISTS PlantillaColor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    color_principal VARCHAR(7) NOT NULL DEFAULT '#3498db',
    color_secundario VARCHAR(7) DEFAULT '#2c3e50',
    color_fondo VARCHAR(7) DEFAULT '#ffffff',
    color_texto VARCHAR(7) DEFAULT '#000000',
    descripcion TEXT,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: TOTEM (Principal)
-- ============================================
CREATE TABLE IF NOT EXISTS TOTEM (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_to VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(200) NOT NULL,
    color VARCHAR(7) NOT NULL DEFAULT '#3498db',
    descripcion TEXT,
    activo BOOLEAN DEFAULT TRUE,
    institucion_id INT,
    categoria_id INT,
    region_id INT,
    plantilla_id INT,
    login_sitio VARCHAR(100),
    password_sitio VARCHAR(255),
    chatpdf_url VARCHAR(500),
    contenido_texto TEXT,
    video_url VARCHAR(500),
    mostrar_chat BOOLEAN DEFAULT TRUE,
    mostrar_notificaciones BOOLEAN DEFAULT TRUE,
    intervalo_actualizacion INT DEFAULT 30,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (institucion_id) REFERENCES Institucion(id) ON DELETE SET NULL,
    FOREIGN KEY (categoria_id) REFERENCES Categoria(id) ON DELETE SET NULL,
    FOREIGN KEY (region_id) REFERENCES Region(id) ON DELETE SET NULL,
    FOREIGN KEY (plantilla_id) REFERENCES PlantillaColor(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: Multimedia
-- ============================================
CREATE TABLE IF NOT EXISTS Multimedia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_multimedia ENUM('imagen', 'video', 'audio', 'documento') NOT NULL,
    url VARCHAR(500) NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    duracion INT,
    orden INT DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE,
    totem_id INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (totem_id) REFERENCES TOTEM(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: Notificacion
-- ============================================
CREATE TABLE IF NOT EXISTS Notificacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    mensaje TEXT NOT NULL,
    tipo ENUM('informativa', 'alerta', 'urgente', 'mantenimiento') DEFAULT 'informativa',
    prioridad ENUM('baja', 'media', 'alta') DEFAULT 'media',
    activo BOOLEAN DEFAULT TRUE,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME,
    totem_id INT NOT NULL,
    usuario_creador_id INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (totem_id) REFERENCES TOTEM(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_creador_id) REFERENCES Usuario(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: UserChat
-- ============================================
CREATE TABLE IF NOT EXISTS UserChat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    totem_id INT NOT NULL,
    pregunta TEXT NOT NULL,
    respuesta TEXT,
    usuario_id INT,
    calificacion INT,
    fecha_pregunta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_respuesta TIMESTAMP NULL,
    estado ENUM('pendiente', 'respondida', 'cerrada') DEFAULT 'pendiente',
    FOREIGN KEY (totem_id) REFERENCES TOTEM(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: LogActividad
-- ============================================
CREATE TABLE IF NOT EXISTS LogActividad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    accion VARCHAR(100) NOT NULL,
    entidad VARCHAR(50) NOT NULL,
    entidad_id INT,
    descripcion TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- ÍNDICES PARA MEJORAR EL RENDIMIENTO
-- ============================================

-- Índices para Usuario
CREATE INDEX idx_usuario_email ON Usuario(email);
CREATE INDEX idx_usuario_username ON Usuario(username);
CREATE INDEX idx_usuario_rol ON Usuario(rol);
CREATE INDEX idx_usuario_activo ON Usuario(activo);

-- Índices para Region
CREATE INDEX idx_region_nombre ON Region(nombre);
CREATE INDEX idx_region_activo ON Region(activo);

-- Índices para Institucion
CREATE INDEX idx_institucion_nombre ON Institucion(nombre);
CREATE INDEX idx_institucion_activo ON Institucion(activo);

-- Índices para Categoria
CREATE INDEX idx_categoria_nombre ON Categoria(nombre);
CREATE INDEX idx_categoria_activo ON Categoria(activo);

-- Índices para PlantillaColor
CREATE INDEX idx_plantilla_nombre ON PlantillaColor(nombre);
CREATE INDEX idx_plantilla_activo ON PlantillaColor(activo);

-- Índices para TOTEM
CREATE INDEX idx_totem_nombre ON TOTEM(nombre_to);
CREATE INDEX idx_totem_ubicacion ON TOTEM(ubicacion);
CREATE INDEX idx_totem_activo ON TOTEM(activo);
CREATE INDEX idx_totem_institucion ON TOTEM(institucion_id);
CREATE INDEX idx_totem_categoria ON TOTEM(categoria_id);
CREATE INDEX idx_totem_region ON TOTEM(region_id);
CREATE INDEX idx_totem_plantilla ON TOTEM(plantilla_id);

-- Índices para Multimedia
CREATE INDEX idx_multimedia_totem ON Multimedia(totem_id);
CREATE INDEX idx_multimedia_tipo ON Multimedia(tipo_multimedia);
CREATE INDEX idx_multimedia_activo ON Multimedia(activo);
CREATE INDEX idx_multimedia_orden ON Multimedia(orden);

-- Índices para Notificacion
CREATE INDEX idx_notificacion_totem ON Notificacion(totem_id);
CREATE INDEX idx_notificacion_tipo ON Notificacion(tipo);
CREATE INDEX idx_notificacion_activo ON Notificacion(activo);
CREATE INDEX idx_notificacion_fecha_inicio ON Notificacion(fecha_inicio);
CREATE INDEX idx_notificacion_fecha_fin ON Notificacion(fecha_fin);

-- Índices para UserChat
CREATE INDEX idx_userchat_totem ON UserChat(totem_id);
CREATE INDEX idx_userchat_usuario ON UserChat(usuario_id);
CREATE INDEX idx_userchat_estado ON UserChat(estado);
CREATE INDEX idx_userchat_fecha ON UserChat(fecha_pregunta);

-- Índices para LogActividad
CREATE INDEX idx_log_usuario ON LogActividad(usuario_id);
CREATE INDEX idx_log_accion ON LogActividad(accion);
CREATE INDEX idx_log_entidad ON LogActividad(entidad);
CREATE INDEX idx_log_fecha ON LogActividad(fecha_creacion);

-- ============================================
-- DATOS DE EJEMPLO
-- ============================================

-- Regiones
INSERT INTO Region (nombre, descripcion) VALUES 
('Región Metropolitana', 'Área metropolitana principal'),
('Región Norte', 'Zona norte del país'),
('Región Sur', 'Zona sur del país'),
('Región Centro', 'Zona central del país');

-- Instituciones de ejemplo
INSERT INTO Institucion (nombre, descripcion, direccion, telefono, email) VALUES 
('Universidad Nacional', 'Institución educativa de nivel superior', 'Av. Principal 123', '+1234567890', 'info@universidad.edu'),
('Hospital Central', 'Centro médico de atención general', 'Calle Salud 456', '+1234567891', 'contacto@hospital.com'),
('Museo de Arte', 'Museo con colecciones de arte contemporáneo', 'Plaza Cultural 789', '+1234567892', 'info@museo.art'),
('Biblioteca Pública', 'Biblioteca con acceso público gratuito', 'Av. Cultura 321', '+1234567893', 'biblioteca@ciudad.gov');

-- Categorías de ejemplo
INSERT INTO Categoria (nombre, informacion, icon, color) VALUES 
('Información General', 'Información básica y general del lugar', 'info', '#3498db'),
('Servicios', 'Servicios disponibles en la institución', 'briefcase', '#2ecc71'),
('Historia', 'Información histórica y cultural', 'book', '#e74c3c'),
('Contacto', 'Datos de contacto y ubicación', 'phone', '#f39c12'),
('Eventos', 'Eventos y actividades programadas', 'calendar', '#9b59b6');

-- Plantillas de Color
INSERT INTO PlantillaColor (nombre, color_principal, color_secundario, color_fondo, color_texto, descripcion) VALUES 
('Azul Profesional', '#3498db', '#2c3e50', '#ffffff', '#000000', 'Tema azul para ambientes profesionales'),
('Verde Natural', '#2ecc71', '#27ae60', '#f0f0f0', '#2c3e50', 'Tema verde para instituciones ecológicas'),
('Rojo Vibrante', '#e74c3c', '#c0392b', '#ffffff', '#000000', 'Tema rojo para lugares dinámicos'),
('Morado Elegante', '#9b59b6', '#8e44ad', '#f8f9fa', '#2c3e50', 'Tema morado para ambientes culturales'),
('Naranja Cálido', '#f39c12', '#e67e22', '#ffffff', '#34495e', 'Tema naranja para espacios acogedores');

-- Usuario Administrador (contraseña: admin123)
-- IMPORTANTE: Cambiar esta contraseña después de la instalación
INSERT INTO Usuario (nombre, username, email, contrasenia, rol, activo) VALUES 
('Administrador del Sistema', 'admin', 'admin@totem.com', '$2b$10$rQZ5Y6YhQhCQYxXVZYxYvOXKZJ0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0', 'admin', TRUE);

-- Nota: Para crear un usuario admin con contraseña real, ejecuta el script:
-- node backend/scripts/create-admin.js

-- TOTEMs de ejemplo
INSERT INTO TOTEM (nombre_to, ubicacion, color, descripcion, institucion_id, categoria_id, region_id, plantilla_id, activo) VALUES 
('TOTEM Principal Entrada', 'Entrada principal del edificio A', '#3498db', 'Tótem informativo principal ubicado en la entrada', 1, 1, 1, 1, TRUE),
('TOTEM Servicios Recepción', 'Planta baja, cerca de recepción', '#2ecc71', 'Información sobre servicios disponibles', 1, 2, 1, 2, TRUE),
('TOTEM Historia Museo', 'Sala de exposiciones permanentes', '#e74c3c', 'Información histórica y cultural del museo', 3, 3, 1, 4, TRUE),
('TOTEM Información Hospital', 'Hall principal de atención', '#f39c12', 'Información general y orientación del hospital', 2, 1, 1, 5, TRUE);

-- Multimedia de ejemplo
INSERT INTO Multimedia (tipo_multimedia, url, titulo, descripcion, totem_id, orden, activo) VALUES 
('imagen', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f', 'Logo Institucional', 'Logo oficial de la institución', 1, 1, TRUE),
('video', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Video de Bienvenida', 'Video de bienvenida para visitantes', 1, 2, TRUE),
('imagen', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c', 'Mapa del Campus', 'Mapa interactivo de las instalaciones', 1, 3, TRUE);

-- Notificaciones de ejemplo
INSERT INTO Notificacion (titulo, mensaje, tipo, prioridad, fecha_inicio, fecha_fin, totem_id, activo) VALUES 
('Bienvenidos', 'Bienvenidos a nuestras instalaciones. Estamos aquí para ayudarle.', 'informativa', 'baja', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 1, TRUE),
('Horario de Atención', 'Horario: Lunes a Viernes de 8:00 AM a 6:00 PM', 'informativa', 'media', NOW(), DATE_ADD(NOW(), INTERVAL 90 DAY), 1, TRUE),
('Mantenimiento Programado', 'El día de mañana habrá mantenimiento de 2:00 PM a 4:00 PM', 'mantenimiento', 'alta', NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY), 2, TRUE);

-- ============================================
-- VERIFICACIÓN DE TABLAS CREADAS
-- ============================================
SHOW TABLES;

-- ============================================
-- INFORMACIÓN ADICIONAL
-- ============================================

-- Para ver la estructura de cada tabla:
-- DESCRIBE Usuario;
-- DESCRIBE Region;
-- DESCRIBE Institucion;
-- DESCRIBE Categoria;
-- DESCRIBE PlantillaColor;
-- DESCRIBE TOTEM;
-- DESCRIBE Multimedia;
-- DESCRIBE Notificacion;
-- DESCRIBE UserChat;
-- DESCRIBE LogActividad;

-- Para crear un usuario administrador con contraseña personalizada:
-- node backend/scripts/create-admin.js

-- Para verificar la base de datos:
-- node backend/scripts/verify-db.js

-- ============================================
-- SCRIPT COMPLETADO EXITOSAMENTE
-- ============================================
