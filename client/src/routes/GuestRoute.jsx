import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import React from "react";

const GuestRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

export default GuestRoute;
