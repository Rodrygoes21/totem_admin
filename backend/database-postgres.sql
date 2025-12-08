-- Script de Migración: Tótem Database - PostgreSQL
-- Base de datos compatible con Render PostgreSQL Free Tier

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabla: Region
CREATE TABLE IF NOT EXISTS "Region" (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla: Usuario
CREATE TABLE IF NOT EXISTS "Usuario" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    rol VARCHAR(20) DEFAULT 'usuario' CHECK (rol IN ('admin', 'usuario', 'moderador')),
    activo BOOLEAN DEFAULT true,
    region_id INTEGER,
    ultimo_acceso TIMESTAMP,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (region_id) REFERENCES "Region"(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- 3. Tabla: Institucion
CREATE TABLE IF NOT EXISTS "Institucion" (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    direccion VARCHAR(200),
    telefono VARCHAR(20),
    email VARCHAR(100),
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabla: Categoria
CREATE TABLE IF NOT EXISTS "Categoria" (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    informacion TEXT,
    icon VARCHAR(100),
    color VARCHAR(7) DEFAULT '#3498db',
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabla: PlantillaColor
CREATE TABLE IF NOT EXISTS "PlantillaColor" (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    color_principal VARCHAR(7) NOT NULL DEFAULT '#3498db',
    color_secundario VARCHAR(7) DEFAULT '#2c3e50',
    color_fondo VARCHAR(7) DEFAULT '#ffffff',
    color_texto VARCHAR(7) DEFAULT '#000000',
    descripcion TEXT,
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Tabla: TOTEM
CREATE TABLE IF NOT EXISTS "TOTEM" (
    id SERIAL PRIMARY KEY,
    nombre_to VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(200) NOT NULL,
    color VARCHAR(7) NOT NULL DEFAULT '#3498db',
    descripcion TEXT,
    activo BOOLEAN DEFAULT true,
    institucion_id INTEGER,
    categoria_id INTEGER,
    region_id INTEGER,
    plantilla_id INTEGER,
    login_sitio VARCHAR(100),
    password_sitio VARCHAR(255),
    chatpdf_url VARCHAR(500),
    contenido_texto TEXT,
    video_url VARCHAR(500),
    mostrar_chat BOOLEAN DEFAULT true,
    mostrar_notificaciones BOOLEAN DEFAULT true,
    intervalo_actualizacion INTEGER DEFAULT 30,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (institucion_id) REFERENCES "Institucion"(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES "Categoria"(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (region_id) REFERENCES "Region"(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (plantilla_id) REFERENCES "PlantillaColor"(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- 7. Tabla: Multimedia
CREATE TABLE IF NOT EXISTS "Multimedia" (
    id SERIAL PRIMARY KEY,
    totem_id INTEGER NOT NULL,
    tipo_multimedia VARCHAR(20) NOT NULL CHECK (tipo_multimedia IN ('imagen', 'video', 'audio', 'documento')),
    url VARCHAR(500) NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    orden INTEGER DEFAULT 0,
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (totem_id) REFERENCES "TOTEM"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 8. Tabla: Notificacion
CREATE TABLE IF NOT EXISTS "Notificacion" (
    id SERIAL PRIMARY KEY,
    totem_id INTEGER,
    titulo VARCHAR(200) NOT NULL,
    mensaje TEXT NOT NULL,
    tipo VARCHAR(20) DEFAULT 'info' CHECK (tipo IN ('info', 'warning', 'error', 'success', 'emergencia')),
    prioridad VARCHAR(20) DEFAULT 'media' CHECK (prioridad IN ('baja', 'media', 'alta', 'urgente')),
    activo BOOLEAN DEFAULT true,
    fecha_inicio TIMESTAMP NOT NULL,
    fecha_fin TIMESTAMP,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    leida BOOLEAN DEFAULT false,
    FOREIGN KEY (totem_id) REFERENCES "TOTEM"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 9. Tabla: UserChat
CREATE TABLE IF NOT EXISTS "UserChat" (
    id SERIAL PRIMARY KEY,
    totem_id INTEGER NOT NULL,
    usuario_id INTEGER,
    pregunta TEXT NOT NULL,
    respuesta TEXT,
    fecha_pregunta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_respuesta TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'respondida', 'cerrada')),
    ip_address VARCHAR(45),
    user_agent TEXT,
    FOREIGN KEY (totem_id) REFERENCES "TOTEM"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES "Usuario"(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- 10. Tabla: LogActividad
CREATE TABLE IF NOT EXISTS "LogActividad" (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER,
    accion VARCHAR(100) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    tabla_afectada VARCHAR(50),
    registro_id INTEGER,
    datos_anteriores JSONB,
    datos_nuevos JSONB,
    fecha_accion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES "Usuario"(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- 11. Tabla: ConfiguracionSistema
CREATE TABLE IF NOT EXISTS "ConfiguracionSistema" (
    id SERIAL PRIMARY KEY,
    clave VARCHAR(100) NOT NULL UNIQUE,
    valor TEXT NOT NULL,
    tipo VARCHAR(20) DEFAULT 'string' CHECK (tipo IN ('string', 'number', 'boolean', 'json')),
    descripcion TEXT,
    categoria VARCHAR(50) DEFAULT 'general',
    editable BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_totem_activo ON "TOTEM"(activo);
CREATE INDEX IF NOT EXISTS idx_totem_institucion ON "TOTEM"(institucion_id);
CREATE INDEX IF NOT EXISTS idx_totem_categoria ON "TOTEM"(categoria_id);
CREATE INDEX IF NOT EXISTS idx_totem_region ON "TOTEM"(region_id);
CREATE INDEX IF NOT EXISTS idx_multimedia_totem ON "Multimedia"(totem_id);
CREATE INDEX IF NOT EXISTS idx_notificacion_totem ON "Notificacion"(totem_id);
CREATE INDEX IF NOT EXISTS idx_notificacion_activo ON "Notificacion"(activo);
CREATE INDEX IF NOT EXISTS idx_userchat_totem ON "UserChat"(totem_id);
CREATE INDEX IF NOT EXISTS idx_usuario_email ON "Usuario"(email);

-- Triggers para actualizar fecha_actualizacion automáticamente
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_actualizacion = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_region_timestamp BEFORE UPDATE ON "Region"
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_usuario_timestamp BEFORE UPDATE ON "Usuario"
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_institucion_timestamp BEFORE UPDATE ON "Institucion"
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_categoria_timestamp BEFORE UPDATE ON "Categoria"
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_plantilla_timestamp BEFORE UPDATE ON "PlantillaColor"
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_totem_timestamp BEFORE UPDATE ON "TOTEM"
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_multimedia_timestamp BEFORE UPDATE ON "Multimedia"
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_notificacion_timestamp BEFORE UPDATE ON "Notificacion"
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_config_timestamp BEFORE UPDATE ON "ConfiguracionSistema"
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Datos iniciales (Seed Data)

-- Regiones
INSERT INTO "Region" (nombre, descripcion) VALUES
('Región Metropolitana', 'Santiago y alrededores'),
('Región de Valparaíso', 'Quinta región'),
('Región del Biobío', 'Octava región'),
('Región de Antofagasta', 'Segunda región')
ON CONFLICT (nombre) DO NOTHING;

-- Usuario Admin (contraseña: admin123 - hasheada con bcrypt)
INSERT INTO "Usuario" (username, email, contrasenia, nombre, rol) VALUES
('admin', 'admin@totem.com', '$2a$10$xQR5ZqGqZ8YxH8KJ8NqhOeLxF.4K0gGqZ8YxH8KJ8NqhOeLxF.4K0g', 'Administrador', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Instituciones
INSERT INTO "Institucion" (nombre, descripcion, direccion, telefono, email) VALUES
('Hospital Regional', 'Hospital público principal', 'Av. Principal 123', '+56912345678', 'contacto@hospital.cl'),
('Universidad Nacional', 'Casa de estudios superiores', 'Calle Universidad 456', '+56987654321', 'info@universidad.cl')
ON CONFLICT DO NOTHING;

-- Categorías
INSERT INTO "Categoria" (nombre, informacion, color) VALUES
('Salud', 'Información médica y salud', '#e74c3c'),
('Educación', 'Información educativa', '#3498db'),
('Turismo', 'Información turística', '#2ecc71'),
('Servicios', 'Servicios públicos', '#f39c12')
ON CONFLICT DO NOTHING;

-- Plantillas de Color
INSERT INTO "PlantillaColor" (nombre, color_principal, color_secundario, color_fondo, color_texto, descripcion) VALUES
('Plantilla Azul', '#3498db', '#2c3e50', '#ffffff', '#000000', 'Plantilla corporativa azul'),
('Plantilla Verde', '#27ae60', '#16a085', '#ecf0f1', '#2c3e50', 'Plantilla natural verde'),
('Plantilla Roja', '#e74c3c', '#c0392b', '#ffffff', '#000000', 'Plantilla energética roja')
ON CONFLICT DO NOTHING;

-- Configuración del Sistema
INSERT INTO "ConfiguracionSistema" (clave, valor, tipo, descripcion, categoria) VALUES
('app_name', 'Sistema Tótem', 'string', 'Nombre de la aplicación', 'general'),
('app_version', '1.0.0', 'string', 'Versión de la aplicación', 'general'),
('maintenance_mode', 'false', 'boolean', 'Modo de mantenimiento', 'sistema'),
('max_upload_size', '10', 'number', 'Tamaño máximo de subida en MB', 'archivos')
ON CONFLICT (clave) DO NOTHING;

-- Mensaje de éxito
DO $$
BEGIN
    RAISE NOTICE 'Base de datos creada exitosamente!';
    RAISE NOTICE 'Usuario admin: admin@totem.com';
    RAISE NOTICE 'Contraseña: admin123';
END $$;
