import express from 'express';
import upload from '../middlewares/upload.js';
import { authenticateToken } from '../middlewares/auth.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';
import fs from 'fs/promises';

const router = express.Router();

// Subir un solo archivo
router.post('/single', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No se proporcionó ningún archivo'
      });
    }

    // Subir a Cloudinary
    const cloudinaryResult = await uploadToCloudinary(req.file.path, {
      folder: 'totem_pdfs',
      resource_type: 'auto',
      access_mode: 'public', // Asegurar acceso público
      type: 'upload' // Tipo de entrega público
    });

    // Eliminar archivo temporal local
    await fs.unlink(req.file.path);

    res.json({
      success: true,
      message: 'Archivo subido exitosamente a Cloudinary',
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: cloudinaryResult.url,
        publicId: cloudinaryResult.publicId,
        cloudinary: true
      }
    });
  } catch (error) {
    console.error('Error en upload:', error);
    // Intentar limpiar archivo temporal si existe
    if (req.file?.path) {
      try {
        await fs.unlink(req.file.path);
      } catch {}
    }
    res.status(500).json({
      success: false,
      message: 'Error al subir el archivo',
      error: error.message
    });
  }
});

// Subir múltiples archivos
router.post('/multiple', authenticateToken, upload.array('files', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No se proporcionaron archivos'
      });
    }

    // Subir todos los archivos a Cloudinary
    const uploadPromises = req.files.map(async (file) => {
      const cloudinaryResult = await uploadToCloudinary(file.path, {
        folder: 'totem_multimedia',
        resource_type: 'auto',
        access_mode: 'public', // Asegurar acceso público
        type: 'upload' // Tipo de entrega público
      });
      
      // Eliminar archivo temporal
      await fs.unlink(file.path);
      
      return {
        filename: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        url: cloudinaryResult.url,
        publicId: cloudinaryResult.publicId,
        cloudinary: true
      };
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    res.json({
      success: true,
      message: 'Archivos subidos exitosamente',
      data: uploadedFiles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al subir los archivos',
      error: error.message
    });
  }
});

export default router;
