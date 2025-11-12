-- ============================================
-- SCRIPT DE VERIFICACIÓN RÁPIDA
-- Para Railway MySQL
-- ============================================

-- Verificar todas las tablas
SELECT 'Verificando tablas...' as Status;
SHOW TABLES;

-- Contar registros en cada tabla
SELECT 'Usuarios' as Tabla, COUNT(*) as Total FROM Usuario;
SELECT 'Regiones' as Tabla, COUNT(*) as Total FROM Region;
SELECT 'Instituciones' as Tabla, COUNT(*) as Total FROM Institucion;
SELECT 'Categorías' as Tabla, COUNT(*) as Total FROM Categoria;
SELECT 'Plantillas' as Tabla, COUNT(*) as Total FROM PlantillaColor;
SELECT 'Tótems' as Tabla, COUNT(*) as Total FROM TOTEM;
SELECT 'Multimedia' as Tabla, COUNT(*) as Total FROM Multimedia;
SELECT 'Notificaciones' as Tabla, COUNT(*) as Total FROM Notificacion;
SELECT 'Chats' as Tabla, COUNT(*) as Total FROM UserChat;
SELECT 'Logs' as Tabla, COUNT(*) as Total FROM LogActividad;

-- Verificar usuario admin
SELECT '=== USUARIO ADMINISTRADOR ===' as Info;
SELECT id, nombre, username, email, rol, activo, fecha_creacion 
FROM Usuario 
WHERE rol = 'admin';

-- Verificar tótems activos
SELECT '=== TÓTEMS ACTIVOS ===' as Info;
SELECT t.id, t.nombre_to, t.ubicacion, i.nombre as institucion, c.nombre as categoria
FROM TOTEM t
LEFT JOIN Institucion i ON t.institucion_id = i.id
LEFT JOIN Categoria c ON t.categoria_id = c.id
WHERE t.activo = TRUE;

-- Verificar notificaciones activas
SELECT '=== NOTIFICACIONES ACTIVAS ===' as Info;
SELECT n.id, n.titulo, n.tipo, t.nombre_to as totem, n.fecha_inicio, n.fecha_fin
FROM Notificacion n
JOIN TOTEM t ON n.totem_id = t.id
WHERE n.activo = TRUE
ORDER BY n.fecha_inicio DESC
LIMIT 5;

-- Verificar estructura de tabla TOTEM
SELECT '=== ESTRUCTURA TABLA TOTEM ===' as Info;
DESCRIBE TOTEM;

-- Estado de la base de datos
SELECT '=== INFORMACIÓN DE LA BASE DE DATOS ===' as Info;
SELECT 
    table_name as 'Tabla',
    table_rows as 'Filas',
    ROUND(((data_length + index_length) / 1024 / 1024), 2) as 'Tamaño (MB)'
FROM information_schema.TABLES
WHERE table_schema = DATABASE()
ORDER BY (data_length + index_length) DESC;
