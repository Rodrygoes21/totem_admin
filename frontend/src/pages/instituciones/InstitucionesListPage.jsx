import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { institucionService } from '../../services/catalog.service';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Power } from 'lucide-react';

export default function InstitucionesListPage() {
  const navigate = useNavigate();
  const [instituciones, setInstituciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInstituciones();
  }, []);

  const loadInstituciones = async () => {
    try {
      setLoading(true);
      const data = await institucionService.getAll();
      setInstituciones(data);
    } catch (error) {
      toast.error('Error al cargar instituciones');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      await institucionService.toggle(id);
      toast.success(`Institución ${currentStatus ? 'desactivada' : 'activada'} correctamente`);
      loadInstituciones();
    } catch (error) {
      toast.error('Error al cambiar el estado');
      console.error(error);
    }
  };

  const handleDelete = async (id, nombre) => {
    if (!window.confirm(`¿Estás seguro de eliminar la institución "${nombre}"?`)) {
      return;
    }

    try {
      await institucionService.delete(id);
      toast.success('Institución eliminada correctamente');
      loadInstituciones();
    } catch (error) {
      toast.error('Error al eliminar la institución');
      console.error(error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Instituciones</h1>
        <button
          onClick={() => navigate('/admin/instituciones/new')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Nueva Institución
        </button>
      </div>

      {/* Grid de instituciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {instituciones.map((inst) => (
          <div key={inst.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-gray-900">{inst.nombre}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                inst.activo 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {inst.activo ? 'Activa' : 'Inactiva'}
              </span>
            </div>
            
            {inst.descripcion && (
              <p className="text-gray-600 text-sm mb-2">{inst.descripcion}</p>
            )}
            
            {inst.direccion && (
              <p className="text-gray-500 text-xs mb-1">📍 {inst.direccion}</p>
            )}
            
            {inst.telefono && (
              <p className="text-gray-500 text-xs mb-1">📞 {inst.telefono}</p>
            )}
            
            {inst.email && (
              <p className="text-gray-500 text-xs mb-3">✉️ {inst.email}</p>
            )}

            {/* Botones de acción */}
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
              <button
                onClick={() => navigate(`/admin/instituciones/${inst.id}`)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 text-sm"
              >
                <Edit className="w-3.5 h-3.5" />
                Editar
              </button>
              <button
                onClick={() => handleToggle(inst.id, inst.activo)}
                className={`flex items-center justify-center gap-1 px-3 py-1.5 rounded text-sm ${
                  inst.activo
                    ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                    : 'bg-green-50 text-green-600 hover:bg-green-100'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(inst.id, inst.nombre)}
                className="flex items-center justify-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 text-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {instituciones.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No hay instituciones registradas</p>
          <button
            onClick={() => navigate('/admin/instituciones/new')}
            className="mt-4 text-blue-600 hover:underline"
          >
            Crear la primera institución
          </button>
        </div>
      )}
    </div>
  );
}
