import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import totemService from '../../services/totem.service';
import multimediaService from '../../services/multimedia.service';
import {
  institucionService,
  categoriaService,
  regionService,
  plantillaService,
} from '../../services/catalog.service';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import TextArea from '../../components/common/TextArea';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import FileUpload from '../../components/common/FileUpload';
import { ArrowLeft, Save, Image, Video, Trash2, Plus, X } from 'lucide-react';

const TotemFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nombre_to: '',
    ubicacion: '',
    color: '#3498db',
    descripcion: '',
    activo: true,
    institucion_id: '',
    categoria_id: '',
    region_id: '',
    plantilla_id: '',
    login_sitio: '',
    password_sitio: '',
    chatpdf_url: '',
    contenido_texto: '',
    video_url: '',
    mostrar_chat: true,
    mostrar_notificaciones: true,
    intervalo_actualizacion: 30,
  });
  const [errors, setErrors] = useState({});
  const [fotos, setFotos] = useState([]);
  const [videos, setVideos] = useState([]);

  // Catálogos
  const [instituciones, setInstituciones] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [plantillas, setPlantillas] = useState([]);

  useEffect(() => {
    fetchCatalogs();
    if (isEdit) {
      fetchTotem();
    }
  }, [id]);

  const fetchCatalogs = async () => {
    try {
      const [instituciones, categorias, regiones, plantillas] = await Promise.all([
        institucionService.getAll({ activo: true, limit: 100 }),
        categoriaService.getAll({ activo: true, limit: 100 }),
        regionService.getAll({ activo: true, limit: 100 }),
        plantillaService.getAll({ activo: true, limit: 100 }),
      ]);

      setInstituciones(Array.isArray(instituciones) ? instituciones : []);
      setCategorias(Array.isArray(categorias) ? categorias : []);
      setRegiones(Array.isArray(regiones) ? regiones : []);
      setPlantillas(Array.isArray(plantillas) ? plantillas : []);
    } catch (error) {
      toast.error('Error al cargar catálogos');
      console.error(error);
    }
  };

  const fetchTotem = async () => {
    setLoading(true);
    try {
      const totem = await totemService.getById(id);
      console.log('📋 Tótem cargado:', totem);
      setFormData({
        nombre_to: totem.nombre_to || '',
        ubicacion: totem.ubicacion || '',
        color: totem.color || '#3498db',
        descripcion: totem.descripcion || '',
        activo: totem.activo ?? true,
        institucion_id: totem.institucion_id || '',
        categoria_id: totem.categoria_id || '',
        region_id: totem.region_id || '',
        plantilla_id: totem.plantilla_id || '',
        login_sitio: totem.login_sitio || '',
        password_sitio: '',
        chatpdf_url: totem.chatpdf_url || '',
        contenido_texto: totem.contenido_texto || '',
        video_url: totem.video_url || '',
        mostrar_chat: totem.mostrar_chat ?? true,
        mostrar_notificaciones: totem.mostrar_notificaciones ?? true,
        intervalo_actualizacion: totem.intervalo_actualizacion || 30,
      });
      
      // Cargar fotos y videos desde multimedia si existen
      if (totem.Multimedias && Array.isArray(totem.Multimedias)) {
        const fotosArray = totem.Multimedias
          .filter(m => m.tipo_multimedia === 'imagen')
          .map(m => m.url);
        const videosArray = totem.Multimedias
          .filter(m => m.tipo_multimedia === 'video')
          .map(m => m.url);
        
        setFotos(fotosArray);
        setVideos(videosArray);
      }
    } catch (error) {
      toast.error('Error al cargar el tótem');
      console.error(error);
      navigate('/admin/totems');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Limpiar error del campo
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre_to || formData.nombre_to.length < 3) {
      newErrors.nombre_to = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.ubicacion || formData.ubicacion.length < 5) {
      newErrors.ubicacion = 'La ubicación debe tener al menos 5 caracteres';
    }

    if (!/^#[0-9A-F]{6}$/i.test(formData.color)) {
      newErrors.color = 'Color inválido (formato: #RRGGBB)';
    }

    if (
      formData.intervalo_actualizacion < 10 ||
      formData.intervalo_actualizacion > 300
    ) {
      newErrors.intervalo_actualizacion = 'Debe estar entre 10 y 300 segundos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Por favor, corrige los errores en el formulario');
      return;
    }

    setSaving(true);
    try {
      // Preparar datos (eliminar campos vacíos opcionales)
      const dataToSend = { ...formData };
      Object.keys(dataToSend).forEach((key) => {
        if (dataToSend[key] === '' && key !== 'nombre_to' && key !== 'ubicacion') {
          delete dataToSend[key];
        }
      });

      let totemId;
      if (isEdit) {
        await totemService.update(id, dataToSend);
        totemId = id;
        toast.success('Tótem actualizado correctamente');
      } else {
        const response = await totemService.create(dataToSend);
        totemId = response.data?.id || response.id;
        toast.success('Tótem creado correctamente');
      }

      // Guardar fotos como multimedia
      if (fotos.length > 0) {
        const fotosData = fotos.map((url, index) => ({
          tipo_multimedia: 'imagen',
          url: url,
          titulo: `Foto ${index + 1}`,
          orden: index,
          activo: true
        }));
        
        if (isEdit) {
          // Eliminar fotos antiguas y crear nuevas
          await multimediaService.deleteByTotem(totemId, 'imagen');
        }
        await multimediaService.createMultiple(totemId, fotosData);
      }

      // Guardar videos como multimedia
      if (videos.length > 0) {
        const videosData = videos.map((url, index) => ({
          tipo_multimedia: 'video',
          url: url,
          titulo: `Video ${index + 1}`,
          orden: index,
          activo: true
        }));
        
        if (isEdit) {
          // Eliminar videos antiguos y crear nuevos
          await multimediaService.deleteByTotem(totemId, 'video');
        }
        await multimediaService.createMultiple(totemId, videosData);
      }

      navigate('/admin/totems');
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          `Error al ${isEdit ? 'actualizar' : 'crear'} el tótem`
      );
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader text="Cargando tótem..." />;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/admin/totems')}>
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? 'Editar Tótem' : 'Nuevo Tótem'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEdit
              ? 'Modifica la información del tótem'
              : 'Completa los datos para crear un nuevo tótem'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información Básica */}
        <Card title="Información Básica">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nombre del Tótem"
              name="nombre_to"
              value={formData.nombre_to}
              onChange={handleChange}
              error={errors.nombre_to}
              required
              placeholder="Ej: Tótem Principal"
            />

            <Input
              label="Ubicación"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              error={errors.ubicacion}
              required
              placeholder="Ej: Edificio A, Planta Baja"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                />
                <Input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  error={errors.color}
                  placeholder="#3498db"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="activo"
                  checked={formData.activo}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Tótem Activo
                </span>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <TextArea
              label="Descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={3}
              placeholder="Descripción opcional del tótem"
            />
          </div>
        </Card>

        {/* Relaciones */}
        <Card title="Relaciones">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Institución"
              name="institucion_id"
              value={formData.institucion_id}
              onChange={handleChange}
              options={instituciones.map((inst) => ({
                value: inst.id,
                label: inst.nombre,
              }))}
              placeholder="Seleccionar institución..."
            />

            <Select
              label="Categoría"
              name="categoria_id"
              value={formData.categoria_id}
              onChange={handleChange}
              options={categorias.map((cat) => ({
                value: cat.id,
                label: cat.nombre,
              }))}
              placeholder="Seleccionar categoría..."
            />

            <Select
              label="Región"
              name="region_id"
              value={formData.region_id}
              onChange={handleChange}
              options={regiones.map((reg) => ({
                value: reg.id,
                label: reg.nombre,
              }))}
              placeholder="Seleccionar región..."
            />

            <Select
              label="Plantilla de Color"
              name="plantilla_id"
              value={formData.plantilla_id}
              onChange={handleChange}
              options={plantillas.map((plant) => ({
                value: plant.id,
                label: plant.nombre,
              }))}
              placeholder="Seleccionar plantilla..."
            />
          </div>
        </Card>

        {/* Configuración de Acceso */}
        <Card title="Configuración de Acceso">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Usuario del Sitio"
              name="login_sitio"
              value={formData.login_sitio}
              onChange={handleChange}
              placeholder="usuario_admin"
            />

            <Input
              label="Contraseña del Sitio"
              name="password_sitio"
              type="password"
              value={formData.password_sitio}
              onChange={handleChange}
              placeholder={isEdit ? 'Dejar vacío para no cambiar' : ''}
            />
          </div>
        </Card>

        {/* Contenido y Multimedia */}
        <Card title="Contenido y Multimedia">
          <div className="space-y-8">
            <FileUpload
              label="Archivo PDF o URL de ChatPDF"
              value={formData.chatpdf_url}
              onChange={(url) => setFormData({ ...formData, chatpdf_url: url })}
              accept=".pdf,application/pdf"
              maxSize={10}
            />

            <Input
              label="URL de Video Principal"
              name="video_url"
              type="url"
              value={formData.video_url}
              onChange={handleChange}
              placeholder="https://youtube.com/..."
            />

            <TextArea
              label="Contenido de Texto"
              name="contenido_texto"
              value={formData.contenido_texto}
              onChange={handleChange}
              rows={5}
              placeholder="Contenido textual para mostrar en el tótem"
            />

            {/* Galería de Fotos */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Image size={24} className="text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Galería de Fotos</h3>
                </div>
                <span className="text-sm text-gray-500">{fotos.length} foto(s)</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {fotos.map((foto, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={foto}
                      alt={`Foto ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => setFotos(fotos.filter((_, i) => i !== index))}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <FileUpload
                label="Agregar Fotos"
                value=""
                onChange={(url) => {
                  if (url) {
                    setFotos([...fotos, url]);
                  }
                }}
                accept="image/*"
                maxSize={5}
              />
            </div>

            {/* Galería de Videos */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Video size={24} className="text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Videos Adicionales</h3>
                </div>
                <span className="text-sm text-gray-500">{videos.length} video(s)</span>
              </div>

              <div className="space-y-3 mb-4">
                {videos.map((video, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <Video size={20} className="text-purple-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">Video {index + 1}</p>
                      <p className="text-xs text-gray-500 truncate">{video}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setVideos(videos.filter((_, i) => i !== index))}
                      className="flex-shrink-0 text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <FileUpload
                label="Agregar Videos"
                value=""
                onChange={(url) => {
                  if (url) {
                    setVideos([...videos, url]);
                  }
                }}
                accept="video/*"
                maxSize={50}
              />
            </div>
          </div>
        </Card>

        {/* Configuración de Visualización */}
        <Card title="Configuración de Visualización">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="mostrar_chat"
                checked={formData.mostrar_chat}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Mostrar Chat
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="mostrar_notificaciones"
                checked={formData.mostrar_notificaciones}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Mostrar Notificaciones
              </label>
            </div>

            <Input
              label="Intervalo de Actualización (segundos)"
              name="intervalo_actualizacion"
              type="number"
              min="10"
              max="300"
              value={formData.intervalo_actualizacion}
              onChange={handleChange}
              error={errors.intervalo_actualizacion}
            />
          </div>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/totems')}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="primary" loading={saving}>
            <Save size={20} className="mr-2" />
            {isEdit ? 'Actualizar' : 'Crear'} Tótem
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TotemFormPage;
