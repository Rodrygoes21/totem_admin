import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoriaService } from '../../services/catalog.service';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Power } from 'lucide-react';

export default function CategoriasListPage() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      setLoading(true);
      const data = await categoriaService.getAll();
      setCategorias(data);
    } catch (error) {
      toast.error('Error al cargar categorías');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      await categoriaService.toggle(id);
      toast.success(`Categoría ${currentStatus ? 'desactivada' : 'activada'} correctamente`);
      loadCategorias();
    } catch (error) {
      toast.error('Error al cambiar el estado');
      console.error(error);
    }
  };

  const handleDelete = async (id, nombre) => {
    if (!window.confirm(`¿Estás seguro de eliminar la categoría "${nombre}"?`)) {
      return;
    }

    try {
      await categoriaService.delete(id);
      toast.success('Categoría eliminada correctamente');
      loadCategorias();
    } catch (error) {
      toast.error('Error al eliminar la categoría');
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
        <h1 className="text-2xl font-bold text-gray-800">Categorías</h1>
        <button
          onClick={() => navigate('/admin/categorias/new')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Nueva Categoría
        </button>
      </div>

      {/* Grid de categorías */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categorias.map((cat) => (
          <div 
            key={cat.id} 
            className="bg-white p-4 rounded-lg shadow border-l-4" 
            style={{ borderLeftColor: cat.color }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-gray-900">{cat.nombre}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                cat.activo 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {cat.activo ? 'Activa' : 'Inactiva'}
              </span>
            </div>
            
            {cat.informacion && (
              <p className="text-gray-600 text-sm mb-3">{cat.informacion}</p>
            )}
            
            <div className="flex items-center gap-2 mb-3">
              <div 
                className="w-6 h-6 rounded border border-gray-300" 
                style={{ backgroundColor: cat.color }}
              ></div>
              <span className="text-xs text-gray-500 font-mono">{cat.color}</span>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2 pt-3 border-t border-gray-200">
              <button
                onClick={() => navigate(`/admin/categorias/${cat.id}`)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 text-sm"
              >
                <Edit className="w-3.5 h-3.5" />
                Editar
              </button>
              <button
                onClick={() => handleToggle(cat.id, cat.activo)}
                className={`flex items-center justify-center gap-1 px-3 py-1.5 rounded text-sm ${
                  cat.activo
                    ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                    : 'bg-green-50 text-green-600 hover:bg-green-100'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(cat.id, cat.nombre)}
                className="flex items-center justify-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 text-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {categorias.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No hay categorías registradas</p>
          <button
            onClick={() => navigate('/admin/categorias/new')}
            className="mt-4 text-blue-600 hover:underline"
          >
            Crear la primera categoría
          </button>
        </div>
      )}
    </div>
  );
}
