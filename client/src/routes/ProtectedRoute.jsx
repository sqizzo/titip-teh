import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import React from "react";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default ProtectedRoute;
