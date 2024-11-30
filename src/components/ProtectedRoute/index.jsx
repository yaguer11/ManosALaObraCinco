import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

/* eslint-disable react/prop-types */
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
