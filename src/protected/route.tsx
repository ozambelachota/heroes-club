import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { useEffect } from "react";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
}) => {
  const auth = useAuthStore((state) => state.auth);
  
  useEffect(() => {
  }, [auth]);

  if (!auth) {
    return <Navigate to="/" />;
  }

  if (auth.role && !allowedRoles.includes(auth.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
