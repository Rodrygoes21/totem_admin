-- Script para actualizar el ENUM de tipo en la tabla Notificacion
-- Agregar 'emergencia' como opción válida

ALTER TABLE Notificacion 
MODIFY COLUMN tipo ENUM('info', 'warning', 'error', 'success', 'emergencia') DEFAULT 'info';

-- Verificar el cambio
DESCRIBE Notificacion;
