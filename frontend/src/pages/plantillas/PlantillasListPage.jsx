import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { plantillasService } from '../../services/plantillas.service';
import toast from 'react-hot-toast';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function PlantillasListPage() {
  const [plantillas, setPlantillas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlantillas();
  }, []);

  const loadPlantillas = async () => {
    try {
      setLoading(true);
      const data = await plantillasService.getAll();
      setPlantillas(data);
    } catch (error) {
      toast.error('Error al cargar plantillas');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta plantilla?')) return;

    try {
      await plantillasService.delete(id);
      toast.success('Plantilla eliminada exitosamente');
      loadPlantillas();
    } catch (error) {
      toast.error('Error al eliminar plantilla');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Plantillas de Colores</h1>
        <Link
          to="/admin/plantillas/new"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <PlusIcon className="w-5 h-5" />
          Nueva Plantilla
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Colores
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {plantillas.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No hay plantillas registradas
                  </td>
                </tr>
              ) : (
                plantillas.map((plantilla) => (
                  <tr key={plantilla.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{plantilla.nombre}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                          <div
                            className="w-6 h-6 rounded border"
                            style={{ backgroundColor: plantilla.color_principal }}
                            title="Principal"
                          ></div>
                          <span className="text-xs text-gray-500">{plantilla.color_principal}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className="w-6 h-6 rounded border"
                            style={{ backgroundColor: plantilla.color_secundario }}
                            title="Secundario"
                          ></div>
                          <span className="text-xs text-gray-500">{plantilla.color_secundario}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {plantilla.descripcion || 'Sin descripción'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          plantilla.activo
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {plantilla.activo ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/plantillas/${plantilla.id}/edit`}
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded transition"
                          title="Editar"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(plantilla.id)}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded transition"
                          title="Eliminar"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
