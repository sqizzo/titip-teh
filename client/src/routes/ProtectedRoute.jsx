import { Navigate, Outlet } from "react-router-dom"; // 1. Import Outlet
import { useSelector } from "react-redux";
import React from "react";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={"/welcome"} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
