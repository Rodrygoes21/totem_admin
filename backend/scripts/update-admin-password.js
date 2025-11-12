import db from '../src/models/index.js';
import { hashPassword } from '../src/utils/hashPassword.js';

async function updateAdminPassword() {
    try {
        // Verificar conexión
        await db.sequelize.authenticate();
        console.log('✅ Conexión a BD establecida');

        // Obtener usuario admin
        const admin = await db.Usuario.findOne({
            where: { email: 'admin@totem.com' }
        });

        if (!admin) {
            console.log('❌ Usuario admin no encontrado');
            return;
        }

        // Generar hash de la contraseña
        const hashedPassword = await hashPassword('admin123');
        
        // Actualizar contraseña
        await admin.update({
            contrasenia: hashedPassword
        });

        console.log('✅ Contraseña de admin actualizada correctamente');
        console.log('📝 Detalles del usuario:');
        console.log('- ID:', admin.id);
        console.log('- Username:', admin.username);
        console.log('- Email:', admin.email);
        console.log('- Rol:', admin.rol);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await db.sequelize.close();
    }
}

updateAdminPassword();