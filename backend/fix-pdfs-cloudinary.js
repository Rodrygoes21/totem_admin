import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function makePublicExistingPDFs() {
  try {
    console.log('🔄 Buscando PDFs en Cloudinary...');
    
    // Buscar todos los recursos en la carpeta totem_pdfs
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'totem_pdfs',
      resource_type: 'image', // PDFs se suben como 'image' en Cloudinary
      max_results: 500
    });

    console.log(`📁 Encontrados ${result.resources.length} archivos`);

    for (const resource of result.resources) {
      console.log(`\n🔄 Procesando: ${resource.public_id}`);
      console.log(`   URL actual: ${resource.secure_url}`);
      console.log(`   Type: ${resource.type}`);
      console.log(`   Access mode: ${resource.access_mode || 'public (default)'}`);

      // Si ya es público, saltarlo
      if (resource.type === 'upload' && !resource.access_control) {
        console.log(`   ✅ Ya es público`);
        continue;
      }

      try {
        // Actualizar a público
        const updated = await cloudinary.uploader.explicit(resource.public_id, {
          type: 'upload',
          resource_type: 'image',
          access_mode: 'public'
        });
        
        console.log(`   ✅ Actualizado a público`);
        console.log(`   Nueva URL: ${updated.secure_url}`);
      } catch (error) {
        console.error(`   ❌ Error al actualizar: ${error.message}`);
      }
    }

    console.log('\n🎉 Proceso completado!');
    console.log('\n💡 Ahora todos los PDFs deberían ser accesibles públicamente');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

makePublicExistingPDFs();
