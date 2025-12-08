import { X, Download, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function PDFViewer({ url, onClose }) {
  const [viewMode, setViewMode] = useState('google'); // 'google', 'direct', 'download'

  if (!url) return null;

  // Función para descargar el PDF
  const handleDownload = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = url.split('/').pop() || 'documento.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error al descargar:', error);
      // Si falla, intentar abrir en nueva pestaña
      window.open(url, '_blank');
    }
  };

  // URL para Google Docs Viewer
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

  // URL para Mozilla PDF.js viewer
  const mozillaViewerUrl = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(url)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full h-full max-w-7xl max-h-screen m-4 bg-white rounded-lg shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">Visor de PDF</h3>
          
          {/* View Mode Selector */}
          <div className="flex items-center gap-2">
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="google">Google Docs</option>
              <option value="mozilla">Mozilla PDF.js</option>
              <option value="direct">Vista Directa</option>
            </select>

            <button
              onClick={handleDownload}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Descargar PDF"
            >
              <Download size={20} />
            </button>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
              title="Abrir en nueva pestaña"
            >
              <ExternalLink size={20} />
            </a>

            <button
              onClick={onClose}
              className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title="Cerrar"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden">
          {viewMode === 'google' && (
            <iframe
              src={googleViewerUrl}
              className="w-full h-full border-0"
              title="PDF Viewer - Google Docs"
            />
          )}

          {viewMode === 'mozilla' && (
            <iframe
              src={mozillaViewerUrl}
              className="w-full h-full border-0"
              title="PDF Viewer - Mozilla PDF.js"
            />
          )}

          {viewMode === 'direct' && (
            <iframe
              src={url}
              className="w-full h-full border-0"
              title="PDF Viewer - Direct"
            />
          )}
        </div>

        {/* Footer with Info */}
        <div className="p-3 border-t bg-gray-50 text-xs text-gray-600">
          <p className="truncate">
            <strong>URL:</strong> {url}
          </p>
          <p className="mt-1 text-gray-500">
            💡 Si el PDF no se visualiza, intenta cambiar el modo de visualización o descárgalo.
          </p>
        </div>
      </div>
    </div>
  );
}
