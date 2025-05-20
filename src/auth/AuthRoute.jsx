import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../utils/store/useAuth";

const AuthRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // atau <LoadingSpinner />

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthRoute;
