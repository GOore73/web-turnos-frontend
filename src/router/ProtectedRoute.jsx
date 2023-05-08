import { React } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({
  isAllowed,
  children,
  redirectTo = '/admin/auth',
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
  // Si lo que está bajo ProtectedRoute no es un Route, no renderiza nada, entonces si es un componente, aplica igual la regla, pero renderiza el children
};
