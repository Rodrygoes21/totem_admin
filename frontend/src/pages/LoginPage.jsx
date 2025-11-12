import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { LogIn } from 'lucide-react';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(credentials);
      toast.success('¡Bienvenido!');
      navigate('/admin/totems');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <LogIn className="text-blue-600" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Totem Admin</h2>
            <p className="text-gray-600 mt-2">Panel de Administración</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Correo Electrónico"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="admin@totem.com"
              required
            />

            <Input
              label="Contraseña"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={loading}
            >
              Iniciar Sesión
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Sistema de Gestión de Tótems v1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
