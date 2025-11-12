import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { plantillaService } from '../../services/catalog.service';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Power, Palette } from 'lucide-react';

export default function PlantillasListPage() {
  const navigate = useNavigate();
  const [plantillas, setPlantillas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlantillas();
  }, []);

  const loadPlantillas = async () => {
    try {
      setLoading(true);
      const data = await plantillaService.getAll();
      setPlantillas(data);
    } catch (error) {
      toast.error('Error al cargar plantillas');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      await plantillaService.toggle(id);
      toast.success(`Plantilla ${currentStatus ? 'desactivada' : 'activada'} correctamente`);
      loadPlantillas();
    } catch (error) {
      toast.error('Error al cambiar el estado');
      console.error(error);
    }
  };

  const handleDelete = async (id, nombre) => {
    if (!window.confirm(`¿Estás seguro de eliminar la plantilla "${nombre}"?`)) {
      return;
    }

    try {
      await plantillaService.delete(id);
      toast.success('Plantilla eliminada correctamente');
      loadPlantillas();
    } catch (error) {
      toast.error('Error al eliminar la plantilla');
      console.error(error);
    }
  };

  if (loading) {
    return (<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Plantillas de Color</h1>
        <button onClick={() => navigate('/admin/plantillas/new')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus className="w-4 h-4" />Nueva Plantilla
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plantillas.map((plantilla) => (
          <div key={plantilla.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-gray-600" />
                <h3 className="font-bold text-lg text-gray-900">{plantilla.nombre}</h3>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${plantilla.activo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                {plantilla.activo ? 'Activa' : 'Inactiva'}
              </span>
            </div>
            {plantilla.descripcion && (<p className="text-gray-600 text-sm mb-3">{plantilla.descripcion}</p>)}
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded border border-gray-300" style={{ backgroundColor: plantilla.color_principal }}></div>
                <span className="text-xs text-gray-600">Principal: <span className="font-mono">{plantilla.color_principal}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded border border-gray-300" style={{ backgroundColor: plantilla.color_secundario }}></div>
                <span className="text-xs text-gray-600">Secundario: <span className="font-mono">{plantilla.color_secundario}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded border border-gray-300" style={{ backgroundColor: plantilla.color_fondo }}></div>
                <span className="text-xs text-gray-600">Fondo: <span className="font-mono">{plantilla.color_fondo}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded border border-gray-300" style={{ backgroundColor: plantilla.color_texto }}></div>
                <span className="text-xs text-gray-600">Texto: <span className="font-mono">{plantilla.color_texto}</span></span>
              </div>
            </div>
            <div className="flex gap-2 pt-3 border-t border-gray-200">
              <button onClick={() => navigate(`/admin/plantillas/${plantilla.id}`)} className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 text-sm">
                <Edit className="w-3.5 h-3.5" />Editar
              </button>
              <button onClick={() => handleToggle(plantilla.id, plantilla.activo)} className={`flex items-center justify-center gap-1 px-3 py-1.5 rounded text-sm ${plantilla.activo ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>
                <Power className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => handleDelete(plantilla.id, plantilla.nombre)} className="flex items-center justify-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 text-sm">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {plantillas.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No hay plantillas registradas</p>
          <button onClick={() => navigate('/admin/plantillas/new')} className="mt-4 text-blue-600 hover:underline">Crear la primera plantilla</button>
        </div>
      )}
    </div>
  );
}
