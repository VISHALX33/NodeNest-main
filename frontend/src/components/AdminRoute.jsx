import { Navigate } from "react-router-dom";
import { isAdminUser, isAuthenticated } from "../utils/auth";

const AdminRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin-login" replace />;
  }

  if (!isAdminUser()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
