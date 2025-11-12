import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { plantillaService } from '../../services/catalog.service';
import { ArrowLeft, Palette } from 'lucide-react';

export default function PlantillaFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    color_principal: '#3498db',
    color_secundario: '#2c3e50',
    color_fondo: '#ffffff',
    color_texto: '#000000',
    descripcion: '',
    activo: true
  });

  useEffect(() => {
    if (isEditMode) {
      loadPlantilla();
    }
  }, [id]);

  const loadPlantilla = async () => {
    try {
      setLoading(true);
      const data = await plantillaService.getById(id);
      setFormData({
        nombre: data.nombre || '',
        color_principal: data.color_principal || '#3498db',
        color_secundario: data.color_secundario || '#2c3e50',
        color_fondo: data.color_fondo || '#ffffff',
        color_texto: data.color_texto || '#000000',
        descripcion: data.descripcion || '',
        activo: data.activo !== undefined ? data.activo : true
      });
    } catch (error) {
      console.error('Error al cargar plantilla:', error);
      toast.error('Error al cargar los datos de la plantilla');
      navigate('/admin/plantillas');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.nombre.trim()) {
      toast.error('El nombre es requerido');
      return;
    }

    try {
      setLoading(true);
      if (isEditMode) {
        await plantillaService.update(id, formData);
        toast.success('Plantilla actualizada correctamente');
      } else {
        await plantillaService.create(formData);
        toast.success('Plantilla creada correctamente');
      }
      navigate('/admin/plantillas');
    } catch (error) {
      console.error('Error al guardar plantilla:', error);
      toast.error(error.response?.data?.message || 'Error al guardar la plantilla');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate('/admin/plantillas')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver a Plantillas
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Editar Plantilla' : 'Nueva Plantilla'}
          </h1>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Plantilla Corporativa"
              required
            />
          </div>

          {/* Preview de colores */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-5 h-5 text-gray-600" />
              <h3 className="font-medium text-gray-900">Vista Previa</h3>
            </div>
            <div 
              className="rounded-lg p-6 border-2"
              style={{ 
                backgroundColor: formData.color_fondo,
                borderColor: formData.color_secundario
              }}
            >
              <div 
                className="text-2xl font-bold mb-2"
                style={{ color: formData.color_principal }}
              >
                Título Principal
              </div>
              <div 
                className="text-base mb-4"
                style={{ color: formData.color_texto }}
              >
                Este es un ejemplo de texto con los colores seleccionados.
              </div>
              <button 
                className="px-4 py-2 rounded-md font-medium"
                style={{ 
                  backgroundColor: formData.color_principal,
                  color: formData.color_fondo
                }}
              >
                Botón de Acción
              </button>
            </div>
          </div>

          {/* Colores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Color Principal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color Principal
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="color_principal"
                  value={formData.color_principal}
                  onChange={handleChange}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.color_principal}
                  onChange={(e) => setFormData(prev => ({ ...prev, color_principal: e.target.value }))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="#3498db"
                  pattern="^#[0-9A-Fa-f]{6}$"
                />
              </div>
            </div>

            {/* Color Secundario */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color Secundario
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="color_secundario"
                  value={formData.color_secundario}
                  onChange={handleChange}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.color_secundario}
                  onChange={(e) => setFormData(prev => ({ ...prev, color_secundario: e.target.value }))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="#2c3e50"
                  pattern="^#[0-9A-Fa-f]{6}$"
                />
              </div>
            </div>

            {/* Color Fondo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color de Fondo
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="color_fondo"
                  value={formData.color_fondo}
                  onChange={handleChange}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.color_fondo}
                  onChange={(e) => setFormData(prev => ({ ...prev, color_fondo: e.target.value }))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="#ffffff"
                  pattern="^#[0-9A-Fa-f]{6}$"
                />
              </div>
            </div>

            {/* Color Texto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color de Texto
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="color_texto"
                  value={formData.color_texto}
                  onChange={handleChange}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.color_texto}
                  onChange={(e) => setFormData(prev => ({ ...prev, color_texto: e.target.value }))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="#000000"
                  pattern="^#[0-9A-Fa-f]{6}$"
                />
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descripción de la plantilla de colores..."
            />
          </div>

          {/* Activo */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="activo"
              name="activo"
              checked={formData.activo}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="activo" className="ml-2 block text-sm text-gray-700">
              Plantilla activa
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/admin/plantillas')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
