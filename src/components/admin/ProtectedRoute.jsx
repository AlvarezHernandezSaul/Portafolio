import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { isSessionValid, setupActivityMonitor } from '../../utils/auth';

const ProtectedRoute = ({ children }) => {
  useEffect(() => {
    // Setup activity monitor
    const cleanup = setupActivityMonitor();
    return cleanup;
  }, []);

  if (!isSessionValid()) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
