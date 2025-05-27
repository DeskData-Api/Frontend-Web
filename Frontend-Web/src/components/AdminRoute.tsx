import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface AdminRouteProps {
  children: JSX.Element;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    // Usuário não está logado
    return <Navigate to="/" replace />;
  }

  if (user.cargo !== "Administrador") {
    // Usuário logado, mas não é admin
    return <Navigate to="/dashboard" replace />;
  }

  // Usuário é admin
  return children;
};

export default AdminRoute;
