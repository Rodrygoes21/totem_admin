import db from '../src/models/index.js';

async function fixTimestamps() {
  try {
    const queryInterface = db.sequelize.getQueryInterface();
    
    // Añadir columnas de timestamp a Region si no existen
    await queryInterface.sequelize.query(`
      ALTER TABLE Region 
      ADD COLUMN IF NOT EXISTS fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
      ADD COLUMN IF NOT EXISTS fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
    `);

    console.log('✅ Columnas de timestamp añadidas/actualizadas correctamente');
    
    // Actualizar registros existentes
    await queryInterface.sequelize.query(`
      UPDATE Region 
      SET fecha_creacion = CURRENT_TIMESTAMP, 
          fecha_actualizacion = CURRENT_TIMESTAMP 
      WHERE fecha_creacion IS NULL 
      OR fecha_actualizacion IS NULL;
    `);
    
    console.log('✅ Registros existentes actualizados');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await db.sequelize.close();
  }
}

fixTimestamps();