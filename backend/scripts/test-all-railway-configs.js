// Script para probar TODAS las configuraciones posibles de Railway
import mysql from 'mysql2/promise';

const configs = [
  {
    name: 'Config 1 - MYSQL_ROOT_PASSWORD',
    host: 'switchback.proxy.rlwy.net',
    port: 18664,
    user: 'root',
    password: 'JkwXRjskuiXWlXaThpyJIgWRYctZqCki',
    database: 'railway'
  },
  {
    name: 'Config 2 - MYSQLPASSWORD',
    host: 'switchback.proxy.rlwy.net',
    port: 18664,
    user: 'root',
    password: 'JkwXRjskuiXWlXaThpyJIgWRYctZqCki',
    database: 'railway'
  },
  {
    name: 'Config 3 - Internal Host',
    host: 'mysql.railway.internal',
    port: 3306,
    user: 'root',
    password: 'JkwXRjskuiXWlXaThpyJIgWRYctZqCki',
    database: 'railway'
  }
];

console.log('\n╔════════════════════════════════════════════╗');
console.log('║  PROBANDO TODAS LAS CONFIGURACIONES       ║');
console.log('╚════════════════════════════════════════════╝\n');

async function testConfig(config) {
  console.log(`\n🔍 Probando: ${config.name}`);
  console.log(`   Host: ${config.host}:${config.port}`);
  console.log(`   User: ${config.user}`);
  console.log(`   Database: ${config.database}\n`);

  try {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
      connectTimeout: 10000
    });

    console.log('✅ ¡CONEXIÓN EXITOSA!\n');

    // Verificar tablas
    const [tables] = await connection.query('SHOW TABLES');
    console.log(`📊 Tablas encontradas: ${tables.length}`);
    
    if (tables.length > 0) {
      console.log('\nTablas:');
      tables.forEach((table, i) => {
        console.log(`   ${i + 1}. ${Object.values(table)[0]}`);
      });
    }

    await connection.end();
    
    console.log('\n╔════════════════════════════════════════════╗');
    console.log('║  ✅ ESTA CONFIGURACIÓN FUNCIONA           ║');
    console.log('╚════════════════════════════════════════════╝');
    console.log('\nUsa esta configuración en tu .env:\n');
    console.log(`DB_HOST = ${config.host}`);
    console.log(`DB_PORT = ${config.port}`);
    console.log(`DB_USER = ${config.user}`);
    console.log(`DB_PASS = ${config.password}`);
    console.log(`DB_NAME = ${config.database}\n`);
    
    return true;

  } catch (error) {
    console.log(`❌ Error: ${error.message}\n`);
    return false;
  }
}

async function testAll() {
  for (const config of configs) {
    const success = await testConfig(config);
    if (success) {
      break; // Si una configuración funciona, no probar las demás
    }
  }
}

testAll().catch(console.error);
