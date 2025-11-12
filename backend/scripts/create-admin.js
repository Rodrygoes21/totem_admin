import db from '../src/models/index.js';
import { hashPassword } from '../src/utils/hashPassword.js';

async function createAdminUser() {
    try {
        await db.sequelize.authenticate();
        console.log('✅ Conexión a BD establecida');

        // Crear usuario admin
        const hashedPassword = await hashPassword('admin123');
        const [usuario, created] = await db.Usuario.findOrCreate({
            where: { email: 'admin@totem.com' },
            defaults: {
                username: 'admin',
                contrasenia: hashedPassword,
                rol: 'admin',
                activo: true
            }
        });

        if (created) {
            console.log('✅ Usuario admin creado exitosamente');
        } else {
            // Actualizar contraseña del usuario existente
            await usuario.update({
                contrasenia: hashedPassword,
                activo: true
            });
            console.log('✅ Contraseña de admin actualizada');
        }

        // Verificar que podemos encontrar el usuario
        const adminUser = await db.Usuario.findOne({
            where: { email: 'admin@totem.com' }
        });

        if (adminUser) {
            console.log('✅ Usuario admin verificado en la BD');
            console.log('📝 Detalles del usuario:');
            console.log('- ID:', adminUser.id);
            console.log('- Username:', adminUser.username);
            console.log('- Email:', adminUser.email);
            console.log('- Rol:', adminUser.rol);
            console.log('- Activo:', adminUser.activo);
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await db.sequelize.close();
    }
}

createAdminUser();