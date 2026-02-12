import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminRoute = () => {
  const { loading, isAuth, isAdmin } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!isAuth) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/dashboard" />;
  return <Outlet />;
};

export default AdminRoute;
