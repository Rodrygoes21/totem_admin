import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import totemService from '../../services/totem.service';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Power, 
  Eye,
  Filter
} from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Badge from '../../components/common/Badge';
import Loader from '../../components/common/Loader';
import Pagination from '../../components/common/Pagination';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';

const TotemsListPage = () => {
  const navigate = useNavigate();
  const [totems, setTotems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [filters, setFilters] = useState({
    search: '',
    activo: '',
    region_id: '',
    institucion_id: '',
    categoria_id: '',
  });
  const [deleteModal, setDeleteModal] = useState({ open: false, totem: null });

  useEffect(() => {
    fetchTotems();
  }, [pagination.page, pagination.limit]);

  const fetchTotems = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== '')
        ),
      };
      const response = await totemService.getAll(params);
      
      // Manejar diferentes formatos de respuesta
      if (Array.isArray(response)) {
        // Si es un array directo
        setTotems(response);
        setPagination({
          ...pagination,
          total: response.length,
          pages: Math.ceil(response.length / pagination.limit)
        });
      } else if (response.data) {
        // Si tiene estructura { data: [...], pagination: {...} }
        setTotems(response.data);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      }
    } catch (error) {
      toast.error('Error al cargar los tótems');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPagination({ ...pagination, page: 1 });
    fetchTotems();
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      activo: '',
      region_id: '',
      institucion_id: '',
      categoria_id: '',
    });
    setPagination({ ...pagination, page: 1 });
  };

  const handleToggleStatus = async (totem) => {
    try {
      await totemService.toggleStatus(totem.id);
      toast.success(
        `Tótem ${totem.activo ? 'desactivado' : 'activado'} correctamente`
      );
      fetchTotems();
    } catch (error) {
      toast.error('Error al cambiar el estado del tótem');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.totem) return;
    
    try {
      await totemService.delete(deleteModal.totem.id);
      toast.success('Tótem eliminado correctamente');
      setDeleteModal({ open: false, totem: null });
      fetchTotems();
    } catch (error) {
      toast.error('Error al eliminar el tótem');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tótems</h1>
          <p className="text-gray-600 mt-1">
            Gestiona todos los tótems del sistema
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate('/admin/totems/new')}
        >
          <Plus size={20} className="mr-2" />
          Nuevo Tótem
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Buscar por nombre, ubicación..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Select
            value={filters.activo}
            onChange={(e) => setFilters({ ...filters, activo: e.target.value })}
            options={[
              { value: '', label: 'Todos los estados' },
              { value: 'true', label: 'Activos' },
              { value: 'false', label: 'Inactivos' },
            ]}
            placeholder="Estado"
          />
          <div className="flex gap-2">
            <Button variant="primary" onClick={handleSearch} className="flex-1">
              <Search size={18} className="mr-2" />
              Buscar
            </Button>
            <Button variant="outline" onClick={handleClearFilters}>
              <Filter size={18} />
            </Button>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card>
        {loading ? (
          <Loader />
        ) : totems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron tótems</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ubicación
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Institución
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoría
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
                  {totems.map((totem) => (
                    <tr key={totem.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-3"
                            style={{ backgroundColor: totem.color }}
                          />
                          <div className="text-sm font-medium text-gray-900">
                            {totem.nombre_to}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {totem.ubicacion}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {totem.institucion?.nombre || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {totem.categoria ? (
                          <Badge
                            variant="info"
                            style={{
                              backgroundColor: `${totem.categoria.color}20`,
                              color: totem.categoria.color,
                            }}
                          >
                            {totem.categoria.nombre}
                          </Badge>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={totem.activo ? 'success' : 'danger'}>
                          {totem.activo ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/admin/totems/${totem.id}`)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Ver detalles"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => navigate(`/admin/totems/${totem.id}/edit`)}
                            className="text-yellow-600 hover:text-yellow-900"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(totem)}
                            className={`${
                              totem.activo
                                ? 'text-orange-600 hover:text-orange-900'
                                : 'text-green-600 hover:text-green-900'
                            }`}
                            title={totem.activo ? 'Desactivar' : 'Activar'}
                          >
                            <Power size={18} />
                          </button>
                          <button
                            onClick={() =>
                              setDeleteModal({ open: true, totem })
                            }
                            className="text-red-600 hover:text-red-900"
                            title="Eliminar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.pages}
              totalItems={pagination.total}
              itemsPerPage={pagination.limit}
              onPageChange={(page) => setPagination({ ...pagination, page })}
            />
          </>
        )}
      </Card>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, totem: null })}
        title="Eliminar Tótem"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setDeleteModal({ open: false, totem: null })}
            >
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar
            </Button>
          </>
        }
      >
        <p>
          ¿Estás seguro de que deseas eliminar el tótem{' '}
          <strong>{deleteModal.totem?.nombre_to}</strong>? Esta acción no se
          puede deshacer.
        </p>
      </Modal>
    </div>
  );
};

export default TotemsListPage;
