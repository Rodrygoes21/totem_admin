import bcrypt from 'bcryptjs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n╔══════════════════════════════════════════════╗');
console.log('║  GENERADOR DE HASH BCRYPT PARA USUARIO ADMIN ║');
console.log('╚══════════════════════════════════════════════╝\n');

rl.question('Ingresa la contraseña para el usuario admin: ', (password) => {
  if (!password || password.length < 6) {
    console.error('❌ Error: La contraseña debe tener al menos 6 caracteres');
    rl.close();
    return;
  }

  const hash = bcrypt.hashSync(password, 10);
  
  console.log('\n✅ Hash generado exitosamente!\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Hash de la contraseña:');
  console.log(hash);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  console.log('📋 SQL para insertar usuario admin:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`
INSERT INTO Usuario (nombre, username, email, contrasenia, rol, activo) VALUES 
('Administrador del Sistema', 'admin', 'admin@totem.com', '${hash}', 'admin', TRUE);
  `);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  console.log('💡 Instrucciones:');
  console.log('1. Copia el INSERT statement de arriba');
  console.log('2. Ejecuta el comando en tu base de datos MySQL de Railway');
  console.log('3. Usa estos datos para hacer login:');
  console.log('   - Email: admin@totem.com');
  console.log('   - Password: [la contraseña que ingresaste]');
  console.log('\n');
  
  rl.close();
});
