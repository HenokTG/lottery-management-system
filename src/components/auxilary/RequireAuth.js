import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = ({ userRole }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.role?.find((role) => userRole?.includes(role)) ? (
    <Outlet />
  )  : (
    <Navigate to="/login" state={{ redirectTo: location }} replace />
  );
};

export default RequireAuth;
