import { useState } from 'react';
import { Upload, X, FileText, Loader2, Eye } from 'lucide-react';
import api from '../../config/api.config';
import toast from 'react-hot-toast';
import PDFViewer from './PDFViewer';

export default function FileUpload({ value, onChange, accept = '*', label = 'Subir archivo', maxSize = 10 }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || '');
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamaño
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`El archivo no debe superar ${maxSize}MB`);
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/upload/single', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // El backend puede devolver data.url o data.data.url
      const fileUrl = response.data.url || response.data.data?.url;
      
      if (!fileUrl) {
        throw new Error('No se recibió URL del archivo');
      }
      
      setPreview(fileUrl);
      onChange(fileUrl);
      toast.success('Archivo subido exitosamente');
    } catch (error) {
      console.error('Error al subir archivo:', error);
      toast.error(error.response?.data?.message || 'Error al subir el archivo');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
  };

  const isPDF = preview && preview.toLowerCase().endsWith('.pdf');

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {preview ? (
        <div className="relative">
          {isPDF ? (
            <>
              <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-300 rounded-lg">
                <FileText className="w-8 h-8 text-red-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Archivo PDF</p>
                  <div className="flex gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setShowPDFViewer(true)}
                      className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                    >
                      <Eye size={14} />
                      Ver PDF
                    </button>
                    <span className="text-xs text-gray-400">•</span>
                    <a 
                      href={preview.replace('/upload/', '/upload/fl_attachment/')} 
                      download
                      className="text-xs text-green-600 hover:underline"
                    >
                      Descargar
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {showPDFViewer && (
                <PDFViewer 
                  url={preview} 
                  onClose={() => setShowPDFViewer(false)} 
                />
              )}
            </>
          ) : (
            <div className="relative">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-48 object-cover rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <input
            type="file"
            onChange={handleFileChange}
            accept={accept}
            className="hidden"
            id="file-upload"
            disabled={uploading}
          />
          <label
            htmlFor="file-upload"
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              uploading
                ? 'border-blue-300 bg-blue-50'
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            {uploading ? (
              <>
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                <p className="text-sm text-blue-600">Subiendo archivo...</p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Click para subir archivo</p>
                <p className="text-xs text-gray-500 mt-1">Máximo {maxSize}MB</p>
              </>
            )}
          </label>
        </div>
      )}

      {/* Input oculto para URL manual (opcional) */}
      <input
        type="text"
        value={preview}
        onChange={(e) => {
          setPreview(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="O pega una URL aquí"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
    </div>
  );
}
