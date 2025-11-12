import { useState, useEffect } from 'react';
import { categoriasService } from '../../services/categorias.service';
import toast from 'react-hot-toast';

export default function CategoriasListPage() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      setLoading(true);
      const data = await categoriasService.getAll();
      setCategorias(data);
    } catch (error) {
      toast.error('Error al cargar categorías');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Categorías</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categorias.map((cat) => (
          <div key={cat.id} className="bg-white p-4 rounded-lg shadow" style={{ borderLeft: `4px solid ${cat.color}` }}>
            <h3 className="font-bold text-lg">{cat.nombre}</h3>
            <p className="text-gray-600 text-sm">{cat.informacion}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: cat.color }}></div>
              <span className="text-xs text-gray-500">{cat.color}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
