import 'dotenv/config';
import { Sequelize } from 'sequelize';

// Crear una nueva instancia de Sequelize con las credenciales de Railway
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: console.log,
        dialectOptions: {
            connectTimeout: 60000,
            ssl: process.env.NODE_ENV === 'production' ? {
                rejectUnauthorized: false
            } : null
        }
    }
);

async function updateAdminDirectly() {
    try {
        console.log('🔄 Conectando a Railway...');
        console.log('Host:', process.env.DB_HOST);
        console.log('Puerto:', process.env.DB_PORT);
        console.log('BD:', process.env.DB_NAME);

        // Probar conexión
        await sequelize.authenticate();
        console.log('✅ Conexión establecida');

        // Actualizar directamente con SQL
        const result = await sequelize.query(`
            UPDATE Usuario 
            SET contrasenia = 'admin123'
            WHERE email = 'admin@totem.com';
        `);

        console.log('✅ Contraseña actualizada:', result);

        // Verificar el cambio
        const [users] = await sequelize.query(`
            SELECT id, username, email, contrasenia, rol, activo 
            FROM Usuario 
            WHERE email = 'admin@totem.com';
        `);

        console.log('\n📝 Usuario actualizado:', users[0]);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await sequelize.close();
    }
}

updateAdminDirectly();