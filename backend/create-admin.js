import mysql from 'mysql2/promise';

const config = {
    host: 'switchback.proxy.rlwy.net',
    port: 18664,
    user: 'root',
    password: 'JKwXRjsKuiXWlXaThpyJIgWRYctZqCki',
    database: 'railway'
};

async function createAdmin() {
    let connection;
    try {
        console.log('\n╔═══════════════════════════════════════════════════╗');
        console.log('║  CREANDO USUARIO ADMINISTRADOR                    ║');
        console.log('╚═══════════════════════════════════════════════════╝\n');
        
        connection = await mysql.createConnection(config);
        console.log('✅ Conectado a Railway MySQL\n');

        const adminHash = '$2a$10$K7HMaV6SMOjHL3n/sv7j2eQhu2DPM35TUlhHJnyMJNjZeHmpByX.i';
        
        const sql = `
            INSERT INTO Usuario (nombre, username, email, contrasenia, rol, activo) 
            VALUES ('Administrador del Sistema', 'admin', 'admin@totem.com', ?, 'admin', TRUE)
        `;
        
        console.log('⚙️  Insertando usuario admin...\n');
        await connection.execute(sql, [adminHash]);
        
        console.log('✅ ¡Usuario administrador creado exitosamente!\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📧 Email:    admin@totem.com');
        console.log('🔑 Password: admin123');
        console.log('👤 Rol:      admin');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        console.log('📌 Siguiente paso:');
        console.log('   1. Inicia el backend: npm start');
        console.log('   2. Ve al frontend: http://localhost:3000');
        console.log('   3. Login con admin@totem.com / admin123\n');
        
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            console.log('\n⚠️  El usuario admin ya existe en la base de datos');
            console.log('   Puedes usar: admin@totem.com / admin123\n');
        } else {
            console.error('\n❌ Error:', error.message);
        }
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
            console.log('🔌 Conexión cerrada\n');
        }
    }
}

createAdmin();
