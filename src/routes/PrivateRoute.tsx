import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useMemo } from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, token } = useAuth();
  const location = useLocation();

  const isUserAuthenticated = useMemo(() => isAuthenticated, [isAuthenticated]);
  const userToken = useMemo(() => token, [token]);

  // Se não houver token, redireciona para o login
  if (!userToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se houver token mas não estiver autenticado, mostra loading
  if (!isUserAuthenticated) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Carregando...
      </div>
    );
  }
  // Se houver token mas não estiver autenticado, mostra loading
  if (!isUserAuthenticated) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Carregando...
      </div>
    );
  }

  return <>{children}</>;
}
