import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

/* eslint-disable react/prop-types */
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    localStorage.removeItem("token"); // Limpiamos cualquier token inválido
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
