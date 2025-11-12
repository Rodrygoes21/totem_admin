import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { notificacionService } from '../../services/notificacion.service';
import { totemService } from '../../services/catalog.service';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import Select from '../../components/common/Select';
import Loader from '../../components/common/Loader';
import { Plus, Edit, Trash2, Bell, AlertTriangle } from 'lucide-react';

export default function NotificacionesListPage() {
  const navigate = useNavigate();
  const [notificaciones, setNotificaciones] = useState([]);
  const [totems, setTotems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    mensaje: '',
    tipo: 'info',
    totem_id: '',
    prioridad: 'media',
    fecha_inicio: new Date().toISOString().slice(0, 16),
    fecha_fin: '',
    activo: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [notifsData, totemsData] = await Promise.all([
        notificacionService.getAll(),
        totemService.getAll({ limit: 100 }),
      ]);
      setNotificaciones(Array.isArray(notifsData) ? notifsData : []);
      
      // Manejar respuesta paginada o array directo
      const totemsArray = totemsData.data || totemsData;
      setTotems(Array.isArray(totemsArray) ? totemsArray : []);
    } catch (error) {
      toast.error('Error al cargar datos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (notif = null) => {
    if (notif) {
      setEditingId(notif.id);
      setFormData({
        titulo: notif.titulo,
        mensaje: notif.mensaje,
        tipo: notif.tipo,
        totem_id: notif.totem_id || '',
        prioridad: notif.prioridad || 'media',
        fecha_inicio: notif.fecha_inicio ? new Date(notif.fecha_inicio).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
        fecha_fin: notif.fecha_fin ? new Date(notif.fecha_fin).toISOString().slice(0, 16) : '',
        activo: notif.activo,
      });
    } else {
      setEditingId(null);
      setFormData({
        titulo: '',
        mensaje: '',
        tipo: 'info',
        totem_id: '',
        prioridad: 'media',
        fecha_inicio: new Date().toISOString().slice(0, 16),
        fecha_fin: '',
        activo: true,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.titulo.trim() || !formData.mensaje.trim()) {
      toast.error('Título y mensaje son obligatorios');
      return;
    }

    try {
      const dataToSend = {
        titulo: formData.titulo,
        mensaje: formData.mensaje,
        tipo: formData.tipo,
        prioridad: formData.prioridad,
        totem_id: formData.totem_id || null,
        fecha_inicio: formData.fecha_inicio,
        fecha_fin: formData.fecha_fin || null,
        activo: formData.activo,
      };

      if (editingId) {
        await notificacionService.update(editingId, dataToSend);
        toast.success('Notificación actualizada exitosamente');
      } else {
        await notificacionService.create(dataToSend);
        toast.success('Notificación creada exitosamente');
      }
      handleCloseModal();
      loadData();
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Error al guardar la notificación');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta notificación?')) return;

    try {
      await notificacionService.delete(id);
      toast.success('Notificación eliminada exitosamente');
      loadData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al eliminar');
    }
  };

  const handleToggle = async (id) => {
    try {
      await notificacionService.toggle(id);
      toast.success('Estado actualizado');
      loadData();
    } catch (error) {
      toast.error('Error al actualizar');
    }
  };

  const getTipoColor = (tipo) => {
    const colores = {
      info: 'bg-blue-100 text-blue-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      success: 'bg-green-100 text-green-800',
      emergencia: 'bg-red-600 text-white',
    };
    return colores[tipo] || colores.info;
  };

  const getTipoIcono = (tipo) => {
    if (tipo === 'emergencia' || tipo === 'error') {
      return <AlertTriangle className="w-5 h-5" />;
    }
    return <Bell className="w-5 h-5" />;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notificaciones</h1>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Notificación
        </Button>
      </div>

      {notificaciones.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No hay notificaciones registradas</p>
            <Button onClick={() => handleOpenModal()}>
              <Plus className="w-4 h-4 mr-2" />
              Crear primera notificación
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {notificaciones.map((notif) => (
            <Card key={notif.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${getTipoColor(notif.tipo)}`}>
                  {getTipoIcono(notif.tipo)}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{notif.titulo}</h3>
                      <p className="text-gray-600 mt-1">{notif.mensaje}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={notif.activo ? 'success' : 'secondary'}>
                        {notif.activo ? 'Activa' : 'Inactiva'}
                      </Badge>
                      {notif.prioridad === 'alta' && (
                        <Badge variant="danger">Alta Prioridad</Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    {notif.totem_id && (
                      <span>📍 Tótem: {notif.TOTEM?.nombre_to || `ID ${notif.totem_id}`}</span>
                    )}
                    <span>Tipo: {notif.tipo}</span>
                    <span>{new Date(notif.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenModal(notif)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggle(notif.id)}
                    >
                      {notif.activo ? 'Desactivar' : 'Activar'}
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(notif.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingId ? 'Editar Notificación' : 'Nueva Notificación'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Título *"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            placeholder="Ej: Alerta Sísmica"
          />

          <TextArea
            label="Mensaje *"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
            placeholder="Descripción de la notificación..."
            rows={4}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Tipo *"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              options={[
                { value: 'info', label: 'Información' },
                { value: 'warning', label: 'Advertencia' },
                { value: 'error', label: 'Error' },
                { value: 'success', label: 'Éxito' },
                { value: 'emergencia', label: '🚨 EMERGENCIA' },
              ]}
            />

            <Select
              label="Prioridad"
              name="prioridad"
              value={formData.prioridad}
              onChange={handleChange}
              options={[
                { value: 'baja', label: 'Baja' },
                { value: 'media', label: 'Media' },
                { value: 'alta', label: 'Alta' },
              ]}
            />
          </div>

          <Select
            label="Tótem (opcional)"
            name="totem_id"
            value={formData.totem_id}
            onChange={handleChange}
            options={[
              { value: '', label: 'Todos los tótems' },
              ...totems.map(t => ({ value: t.id, label: t.nombre_to }))
            ]}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha Inicio *
              </label>
              <input
                type="datetime-local"
                name="fecha_inicio"
                value={formData.fecha_inicio}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha Fin (opcional)
              </label>
              <input
                type="datetime-local"
                name="fecha_fin"
                value={formData.fecha_fin}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="activo"
              id="activo"
              checked={formData.activo}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="activo" className="ml-2 text-sm text-gray-700">
              Notificación activa
            </label>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="submit">
              Guardar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
