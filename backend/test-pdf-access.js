import axios from 'axios';

// URLs de prueba de PDFs
const testUrls = [
  'https://res.cloudinary.com/dtoif2szt/image/upload/v1765196028/totem_pdfs/gn96z7mvwgl9njswkktq.pdf',
  'https://res.cloudinary.com/dtoif2szt/image/upload/v1765195757/totem_pdfs/rbbj7nris8n3mutdyq6b.pdf'
];

async function testPDFAccess() {
  console.log('🧪 Probando acceso a PDFs de Cloudinary...\n');

  for (const url of testUrls) {
    console.log(`📄 URL: ${url}`);
    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        headers: {
          'User-Agent': 'Mozilla/5.0'
        },
        validateStatus: () => true // No throw on any status
      });

      console.log(`   Status: ${response.status} ${response.statusText}`);
      console.log(`   Content-Type: ${response.headers['content-type']}`);
      console.log(`   Content-Length: ${response.headers['content-length']} bytes`);
      console.log(`   Tamaño real: ${response.data.length} bytes`);

      if (response.status === 200) {
        if (response.data.length > 1000) {
          console.log(`   ✅ PDF accesible (${(response.data.length / 1024).toFixed(2)} KB)`);
        } else {
          console.log(`   ⚠️ PDF muy pequeño, puede estar vacío`);
        }
      } else {
        console.log(`   ❌ Error al acceder`);
      }

    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
    console.log('');
  }

  console.log('\n💡 Recomendación:');
  console.log('Si los PDFs muestran 401 o están vacíos, necesitas:');
  console.log('1. Verificar en Cloudinary Dashboard → Media Library → Settings');
  console.log('2. Asegurarte de que "Delivery type" sea "upload" (no "authenticated")');
  console.log('3. O regenerar los PDFs con las nuevas configuraciones de acceso público');
}

testPDFAccess();
