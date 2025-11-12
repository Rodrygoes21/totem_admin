// Script para probar conexión a Railway MySQL
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

async function testConnection() {
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║  PROBANDO CONEXIÓN A RAILWAY MYSQL        ║');
  console.log('╚════════════════════════════════════════════╝\n');

  console.log('📋 Credenciales:');
  console.log(`   Host: ${process.env.DB_HOST}`);
  console.log(`   Port: ${process.env.DB_PORT}`);
  console.log(`   User: ${process.env.DB_USER}`);
  console.log(`   Database: ${process.env.DB_NAME}`);
  console.log(`   Password: ${'*'.repeat(process.env.DB_PASS.length)}\n`);

  try {
    console.log('🔌 Intentando conectar...\n');
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    console.log('✅ ¡Conexión exitosa a Railway MySQL!\n');

    // Verificar tablas
    console.log('📊 Verificando tablas existentes...');
    const [tables] = await connection.query('SHOW TABLES');
    
    if (tables.length === 0) {
      console.log('⚠️  No hay tablas en la base de datos');
      console.log('💡 Necesitas ejecutar el script: railway-setup.sql\n');
    } else {
      console.log(`✅ Encontradas ${tables.length} tablas:\n`);
      tables.forEach((table, index) => {
        const tableName = Object.values(table)[0];
        console.log(`   ${index + 1}. ${tableName}`);
      });
      console.log('');
    }

    // Verificar usuarios
    const [users] = await connection.query('SELECT COUNT(*) as total FROM Usuario');
    console.log(`👥 Usuarios en la base de datos: ${users[0].total}`);

    if (users[0].total === 0) {
      console.log('⚠️  No hay usuarios. Crea un admin con:');
      console.log('   node backend/scripts/generate-admin-hash.js\n');
    }

    await connection.end();
    
    console.log('\n╔════════════════════════════════════════════╗');
    console.log('║  ✅ TODO FUNCIONA CORRECTAMENTE           ║');
    console.log('╚════════════════════════════════════════════╝\n');

  } catch (error) {
    console.log('❌ Error al conectar:\n');
    console.error(error.message);
    console.log('\n💡 Posibles soluciones:');
    console.log('   1. Verifica que el servicio MySQL esté corriendo en Railway');
    console.log('   2. Revisa que las credenciales en .env sean correctas');
    console.log('   3. Asegúrate de que el host sea el correcto:');
    console.log('      - Usa mysql.railway.internal si el backend está en Railway');
    console.log('      - Usa switchback.proxy.rlwy.net si conectas desde local\n');
    process.exit(1);
  }
}

testConnection();
