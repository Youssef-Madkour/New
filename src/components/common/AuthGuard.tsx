import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useStore } from '../../Zustand/store';

interface AuthGuardProps {
  requireAuth?: boolean;
}

const AuthGuard = ({ requireAuth = true }: AuthGuardProps) => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const location = useLocation();

  if (isLoggedIn && !requireAuth) {
    return <Navigate to="/" replace />;
  }

  if (!isLoggedIn && requireAuth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default AuthGuard;