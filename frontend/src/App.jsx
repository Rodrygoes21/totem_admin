import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';
import LoginPage from './pages/LoginPage';
import TotemsListPage from './pages/totems/TotemsListPage';
import TotemFormPage from './pages/totems/TotemFormPage';
import PlantillasListPage from './pages/plantillas/PlantillasListPage';
import RegionesListPage from './pages/regiones/RegionesListPage';
import InstitucionesListPage from './pages/instituciones/InstitucionesListPage';
import CategoriasListPage from './pages/categorias/CategoriasListPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#363636',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/totems" replace />} />
            <Route path="dashboard" element={<Navigate to="/admin/totems" replace />} />
            
            {/* Rutas de Tótems */}
            <Route path="totems" element={<TotemsListPage />} />
            <Route path="totems/new" element={<TotemFormPage />} />
            <Route path="totems/:id/edit" element={<TotemFormPage />} />
            
            {/* Rutas de Plantillas */}
            <Route path="plantillas" element={<PlantillasListPage />} />
            
            {/* Rutas de Regiones */}
            <Route path="regiones" element={<RegionesListPage />} />
            
            {/* Rutas de Instituciones */}
            <Route path="instituciones" element={<InstitucionesListPage />} />
            
            {/* Rutas de Categorías */}
            <Route path="categorias" element={<CategoriasListPage />} />
          </Route>

          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
