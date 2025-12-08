import pg from 'pg';
import bcrypt from 'bcrypt';

const { Client } = pg;

const client = new Client({
  host: 'dpg-d4r536uuk2gs738114cg-a.oregon-postgres.render.com',
  port: 5432,
  user: 'totem_database_5z32_user',
  password: 'RiKUG5gajAuWxlfVZYnO9wMns0xBCw38',
  database: 'totem_database_5z32',
  ssl: {
    rejectUnauthorized: false
  }
});

async function createAdmin() {
  try {
    console.log('🔄 Conectando a PostgreSQL en Render...');
    await client.connect();
    console.log('✅ Conectado exitosamente!');

    // Verificar si ya existe el admin
    const checkQuery = 'SELECT * FROM "Usuario" WHERE email = $1';
    const existingUser = await client.query(checkQuery, ['admin@totem.com']);

    if (existingUser.rows.length > 0) {
      console.log('⚠️ El usuario admin ya existe!');
      console.log('📧 Email:', existingUser.rows[0].email);
      console.log('👤 Username:', existingUser.rows[0].username);
      
      // Actualizar la contraseña
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const updateQuery = `
        UPDATE "Usuario" 
        SET contrasenia = $1, activo = true 
        WHERE email = $2
      `;
      await client.query(updateQuery, [hashedPassword, 'admin@totem.com']);
      console.log('✅ Contraseña actualizada a: admin123');
    } else {
      // Crear nuevo usuario admin
      console.log('🔄 Creando usuario administrador...');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const insertQuery = `
        INSERT INTO "Usuario" (
          username, 
          email, 
          contrasenia, 
          nombre, 
          rol, 
          activo,
          fecha_creacion,
          fecha_actualizacion
        ) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
        RETURNING id, username, email, nombre, rol
      `;
      
      const result = await client.query(insertQuery, [
        'admin',
        'admin@totem.com',
        hashedPassword,
        'Administrador',
        'admin',
        true
      ]);
      
      console.log('✅ Usuario administrador creado exitosamente!');
      console.log('📋 Detalles:', result.rows[0]);
    }

    console.log('\n🎉 Credenciales de acceso:');
    console.log('📧 Email: admin@totem.com');
    console.log('🔑 Password: admin123');
    console.log('\n🌐 Accede en: https://totem-admin-bay.vercel.app');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Detalles:', error);
  } finally {
    await client.end();
    console.log('🔌 Conexión cerrada');
  }
}

createAdmin();
