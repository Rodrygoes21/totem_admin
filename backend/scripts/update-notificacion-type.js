import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mysql from 'mysql2/promise';

// Cargar .env desde el directorio backend
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '..', '.env') });

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

console.log('📋 Configuración de DB:', {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  database: dbConfig.database,
  hasPassword: !!dbConfig.password
});

async function updateNotificacionEnum() {
  let connection;
  
  try {
    console.log('🔌 Conectando a la base de datos...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conectado exitosamente\n');

    // Actualizar el ENUM
    console.log('🔧 Actualizando columna tipo en tabla Notificacion...');
    await connection.execute(`
      ALTER TABLE Notificacion 
      MODIFY COLUMN tipo ENUM('info', 'warning', 'error', 'success', 'emergencia') DEFAULT 'info'
    `);
    console.log('✅ Columna tipo actualizada con éxito\n');

    // Hacer totem_id nullable para notificaciones broadcast
    console.log('🔧 Haciendo totem_id nullable para notificaciones broadcast...');
    await connection.execute(`
      ALTER TABLE Notificacion 
      MODIFY COLUMN totem_id INT NULL
    `);
    console.log('✅ Columna totem_id ahora permite valores NULL\n');

    // Verificar cambios
    console.log('📋 Verificando estructura de la tabla:');
    const [rows] = await connection.execute(`DESCRIBE Notificacion`);
    
    const tipoField = rows.find(r => r.Field === 'tipo');
    const totemIdField = rows.find(r => r.Field === 'totem_id');
    
    console.log('\n tipo:', tipoField.Type);
    console.log(' totem_id:', totemIdField.Type, 'NULL:', totemIdField.Null);

    console.log('\n✅ ¡Migración completada exitosamente!');

  } catch (error) {
    console.error('❌ Error durante la migración:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Conexión cerrada');
    }
  }
}

updateNotificacionEnum();
