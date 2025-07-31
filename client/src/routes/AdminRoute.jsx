import { Navigate, Outlet } from "react-router-dom"; // 1. Import Outlet
import { useSelector } from "react-redux";
import React from "react";

const AdminRoute = () => {
  const role = JSON.parse(localStorage.getItem("user")).role;

  if (role !== "admin") {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
};

export default AdminRoute;
