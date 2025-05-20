import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../utils/store/useAuth";

const UserRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // atau tampilkan spinner

  return user ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default UserRoute;
