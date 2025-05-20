import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/store/useAuth";

function AdminRoute({ children }) {
  const { role, loading } = useAuth();

  if (!loading && role !== "admin") return <Navigate to="/" />;

  return children;
}

export default AdminRoute;
