import pkg from 'pg';
const { Client } = pkg;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionString = 'postgresql://totem_database_5z32_user:RiKUG5gajAuWxlfVZYnO9wMns0xBCw38@dpg-d4r536uuk2gs738114cg-a.oregon-postgres.render.com/totem_database_5z32';

async function executeSQLFile() {
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔄 Conectando a PostgreSQL en Render...');
    await client.connect();
    console.log('✅ Conectado exitosamente!');

    const sqlFile = path.join(__dirname, 'database-postgres.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    console.log('🔄 Ejecutando script SQL...');
    await client.query(sql);
    console.log('✅ Base de datos creada exitosamente!');
    
    // Hash de la contraseña admin123
    const bcrypt = await import('bcrypt');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Insertar usuario admin con contraseña hasheada
    await client.query(`
      INSERT INTO "Usuario" (username, email, contrasenia, nombre, rol) 
      VALUES ('admin', 'admin@totem.com', $1, 'Administrador', 'admin')
      ON CONFLICT (email) DO UPDATE SET contrasenia = $1
    `, [hashedPassword]);
    
    console.log('✅ Usuario admin creado/actualizado!');
    console.log('');
    console.log('📧 Email: admin@totem.com');
    console.log('🔑 Contraseña: admin123');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await client.end();
    console.log('🔌 Conexión cerrada');
  }
}

executeSQLFile();
