import db from '../src/models/index.js';
import { hashPassword } from '../src/utils/hashPassword.js';

async function verifyDatabaseAndUser() {
    try {
        // 1. Verificar conexión
        console.log('🔄 Verificando conexión a la base de datos...');
        await db.sequelize.authenticate();
        console.log('✅ Conexión a la base de datos establecida correctamente');

        // 2. Verificar tablas
        console.log('🔄 Verificando estructura de tablas...');
        const tables = await db.sequelize.query("SHOW TABLES", { type: db.sequelize.QueryTypes.SHOWTABLES });
        console.log('📋 Tablas encontradas:', tables);

        // 3. Verificar usuario admin
        console.log('🔄 Buscando usuario admin...');
        const admin = await db.Usuario.findOne({
            where: { email: 'admin@totem.com' }
        });

        if (admin) {
            console.log('✅ Usuario admin encontrado:');
            console.log('- ID:', admin.id);
            console.log('- Username:', admin.username);
            console.log('- Email:', admin.email);
            console.log('- Rol:', admin.rol);
            console.log('- Activo:', admin.activo);
        } else {
            console.log('❌ Usuario admin no encontrado, creándolo...');
            const hashedPassword = await hashPassword('admin123');
            const newAdmin = await db.Usuario.create({
                username: 'admin',
                email: 'admin@totem.com',
                contrasenia: hashedPassword,
                rol: 'admin',
                activo: true
            });
            console.log('✅ Usuario admin creado con ID:', newAdmin.id);
        }

    } catch (error) {
        console.error('❌ Error:', error);
        if (error.name === 'SequelizeConnectionError') {
            console.log('⚠️ Sugerencias:');
            console.log('1. Verifica las credenciales en .env');
            console.log('2. Asegúrate que la base de datos esté accesible');
            console.log('3. Revisa el firewall y configuración de red');
        }
    } finally {
        await db.sequelize.close();
    }
}

verifyDatabaseAndUser();