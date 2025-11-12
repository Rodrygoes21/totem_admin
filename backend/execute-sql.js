import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
    host: 'switchback.proxy.rlwy.net',
    port: 18664,
    user: 'root',
    password: 'JKwXRjsKuiXWlXaThpyJIgWRYctZqCki',
    database: 'railway',
    multipleStatements: true
};

async function executeSql() {
    let connection;
    try {
        console.log('\n╔═══════════════════════════════════════════════════╗');
        console.log('║  EJECUTANDO SQL EN RAILWAY MYSQL                  ║');
        console.log('╚═══════════════════════════════════════════════════╝\n');
        
        console.log('📡 Conectando a Railway MySQL...');
        console.log(`   Host: ${config.host}`);
        console.log(`   Puerto: ${config.port}`);
        console.log(`   Base de datos: ${config.database}\n`);
        
        connection = await mysql.createConnection(config);
        console.log('✅ Conectado exitosamente!\n');

        // Leer el archivo SQL
        const sqlFile = join(__dirname, 'railway-final.sql');
        console.log('📄 Leyendo railway-final.sql...');
        const sqlContent = readFileSync(sqlFile, 'utf8');
        console.log(`   ${sqlContent.split('\n').length} líneas leídas\n`);
        
        console.log('⚙️  Ejecutando SQL...\n');
        const [results] = await connection.query(sqlContent);
        
        console.log('\n✅ ¡SQL ejecutado exitosamente!\n');
        
        // Mostrar las tablas creadas
        if (Array.isArray(results)) {
            const lastResult = results[results.length - 1];
            if (lastResult && lastResult.length > 0) {
                console.log('📊 Tablas creadas:');
                console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                lastResult.forEach((row, index) => {
                    const tableName = row[Object.keys(row)[0]];
                    console.log(`   ${index + 1}. ${tableName}`);
                });
                console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
            }
        }
        
        console.log('📝 Resumen de operaciones:');
        console.log('   ✓ Tablas eliminadas (DROP)');
        console.log('   ✓ 10 tablas creadas');
        console.log('   ✓ Índices creados');
        console.log('   ✓ Datos de ejemplo insertados\n');
        
        console.log('🎉 Base de datos lista para usar!\n');
        console.log('📌 Siguiente paso:');
        console.log('   Ejecuta: node scripts/generate-admin-hash.js');
        console.log('   Para crear el usuario administrador\n');
        
    } catch (error) {
        console.error('\n❌ Error al ejecutar SQL:');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error(`   ${error.message}`);
        if (error.sql) {
            console.error('\n   SQL que causó el error:');
            console.error(`   ${error.sql.substring(0, 200)}...`);
        }
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
            console.log('🔌 Conexión cerrada\n');
        }
    }
}

executeSql();
