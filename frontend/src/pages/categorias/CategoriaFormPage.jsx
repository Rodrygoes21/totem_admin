import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { categoriaService } from '../../services/catalog.service';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import { ArrowLeft, Save } from 'lucide-react';

const CategoriaFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    color: '#3B82F6',
    icono: '',
    activo: true,
  });

  useEffect(() => {
    if (id) {
      fetchCategoria();
    }
  }, [id]);

  const fetchCategoria = async () => {
    setLoading(true);
    try {
      const data = await categoriaService.getById(id);
      setFormData({
        nombre: data.nombre || '',
        descripcion: data.descripcion || '',
        color: data.color || '#3B82F6',
        icono: data.icono || '',
        activo: data.activo ?? true,
      });
    } catch (error) {
      toast.error('Error al cargar la categoría');
      navigate('/admin/categorias');
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre.trim()) {
      toast.error('El nombre es obligatorio');
      return;
    }

    setSaving(true);
    try {
      if (id) {
        await categoriaService.update(id, formData);
        toast.success('Categoría actualizada exitosamente');
      } else {
        await categoriaService.create(formData);
        toast.success('Categoría creada exitosamente');
      }
      navigate('/admin/categorias');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Error al guardar la categoría');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/admin/categorias')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">
          {id ? 'Editar Categoría' : 'Nueva Categoría'}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <div className="space-y-6">
            <Input
              label="Nombre *"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Nombre de la categoría"
            />

            <TextArea
              label="Descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción de la categoría"
              rows={3}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color *
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-16 h-10 rounded cursor-pointer"
                  />
                  <Input
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="#3B82F6"
                  />
                </div>
              </div>

              <Input
                label="Ícono"
                name="icono"
                value={formData.icono}
                onChange={handleChange}
                placeholder="📚"
              />
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
                Activo
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/categorias')}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default CategoriaFormPage;
