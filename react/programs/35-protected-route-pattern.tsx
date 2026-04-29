import {Navigate} from 'react-router-dom';
import type {ReactNode} from 'react';

export function ProtectedRoute({
  children,
  isAuthenticated,
}: {
  children: ReactNode;
  isAuthenticated: boolean;
}) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
