import db from '../src/models/index.js';
import { hashPassword, comparePassword } from '../src/utils/hashPassword.js';

async function debugAndUpdateAdmin() {
    try {
        // 1. Verificar conexión
        await db.sequelize.authenticate();
        console.log('✅ Conexión a BD establecida');

        // 2. Obtener usuario admin y mostrar datos actuales
        const admin = await db.Usuario.findOne({
            where: { email: 'admin@totem.com' }
        });

        if (!admin) {
            console.log('❌ Usuario admin no encontrado');
            return;
        }

        console.log('📝 Datos actuales del usuario:');
        console.log('- ID:', admin.id);
        console.log('- Username:', admin.username);
        console.log('- Email:', admin.email);
        console.log('- Contraseña actual (hash/texto):', admin.contrasenia);
        console.log('- Rol:', admin.rol);
        console.log('- Activo:', admin.activo);

        // 3. Generar nuevo hash y verificar
        const newPassword = 'admin123';
        const hashedPassword = await hashPassword(newPassword);
        
        console.log('\n🔐 Información de la nueva contraseña:');
        console.log('- Contraseña en texto plano:', newPassword);
        console.log('- Hash generado:', hashedPassword);

        // 4. Actualizar contraseña
        await admin.update({
            contrasenia: hashedPassword
        });

        // 5. Verificar la actualización
        const updatedAdmin = await db.Usuario.findOne({
            where: { email: 'admin@totem.com' }
        });

        console.log('\n✅ Verificación después de actualizar:');
        console.log('- Hash almacenado:', updatedAdmin.contrasenia);
        
        // 6. Probar la contraseña
        const isValid = await comparePassword(newPassword, updatedAdmin.contrasenia);
        console.log('- Prueba de contraseña:', isValid ? 'EXITOSA' : 'FALLIDA');

        if (isValid) {
            console.log('\n✅ La contraseña se actualizó y verificó correctamente');
            console.log('Ahora puedes intentar login con:');
            console.log('Email: admin@totem.com');
            console.log('Password: admin123');
        } else {
            console.log('\n❌ La actualización no fue exitosa');
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await db.sequelize.close();
    }
}

debugAndUpdateAdmin();