import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
