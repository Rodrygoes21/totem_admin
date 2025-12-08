import express from 'express';
import axios from 'axios';

const router = express.Router();

// Proxy para servir PDFs de Cloudinary sin problemas de CORS
router.get('/pdf-proxy', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'URL del PDF requerida'
      });
    }

    // Validar que sea una URL de Cloudinary
    if (!url.includes('cloudinary.com')) {
      return res.status(400).json({
        success: false,
        message: 'Solo se permiten URLs de Cloudinary'
      });
    }

    console.log('📄 Proxy PDF request:', url);

    // Descargar el PDF de Cloudinary
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    // Establecer headers correctos para PDF
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400' // Cache de 24 horas
    });

    // Enviar el PDF
    res.send(Buffer.from(response.data));
    
  } catch (error) {
    console.error('❌ Error en PDF proxy:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al cargar el PDF',
      error: error.message
    });
  }
});

export default router;
