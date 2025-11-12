import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { regionesService } from '../../services/regiones.service';
import toast from 'react-hot-toast';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function RegionesListPage() {
  const [regiones, setRegiones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRegiones();
  }, []);

  const loadRegiones = async () => {
    try {
      setLoading(true);
      const data = await regionesService.getAll();
      setRegiones(data);
    } catch (error) {
      toast.error('Error al cargar regiones');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta región?')) return;

    try {
      await regionesService.delete(id);
      toast.success('Región eliminada exitosamente');
      loadRegiones();
    } catch (error) {
      toast.error('Error al eliminar región');
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
        <h1 className="text-2xl font-bold text-gray-800">Regiones</h1>
        <Link
          to="/admin/regiones/new"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <PlusIcon className="w-5 h-5" />
          Nueva Región
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
              {regiones.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No hay regiones registradas
                  </td>
                </tr>
              ) : (
                regiones.map((region) => (
                  <tr key={region.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{region.nombre}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {region.descripcion || 'Sin descripción'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          region.activo
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {region.activo ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/regiones/${region.id}/edit`}
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded transition"
                          title="Editar"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(region.id)}
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
