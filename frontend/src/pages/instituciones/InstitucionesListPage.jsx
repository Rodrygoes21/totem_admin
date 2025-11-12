import { useState, useEffect } from 'react';
import { institucionesService } from '../../services/instituciones.service';
import toast from 'react-hot-toast';

export default function InstitucionesListPage() {
  const [instituciones, setInstituciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInstituciones();
  }, []);

  const loadInstituciones = async () => {
    try {
      setLoading(true);
      const data = await institucionesService.getAll();
      setInstituciones(data);
    } catch (error) {
      toast.error('Error al cargar instituciones');
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Instituciones</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {instituciones.map((inst) => (
          <div key={inst.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">{inst.nombre}</h3>
            <p className="text-gray-600 text-sm">{inst.descripcion}</p>
            <p className="text-gray-500 text-xs mt-2">{inst.direccion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
