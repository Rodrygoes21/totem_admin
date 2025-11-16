import { v2 as cloudinary } from 'cloudinary';

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Sube un archivo a Cloudinary
 * @param {string} filePath - Ruta local del archivo
 * @param {object} options - Opciones adicionales
 * @returns {Promise<object>} - Resultado de la subida con URL
 */
export const uploadToCloudinary = async (filePath, options = {}) => {
  try {
    const defaultOptions = {
      folder: 'totem_uploads',
      resource_type: 'auto', // Detecta automáticamente (image, video, pdf, etc)
      ...options,
    };

    const result = await cloudinary.uploader.upload(filePath, defaultOptions);
    
    return {
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      resourceType: result.resource_type,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Error al subir archivo a Cloudinary');
  }
};

/**
 * Elimina un archivo de Cloudinary
 * @param {string} publicId - ID público del archivo
 * @param {string} resourceType - Tipo de recurso (image, video, raw)
 */
export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw new Error('Error al eliminar archivo de Cloudinary');
  }
};

export default cloudinary;
