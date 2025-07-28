import { useState } from "react";

import { Outlet } from "react-router-dom";

import { Toast } from "../ui/Toast";

import React from "react";
import BottomBar from "../navigation/BottomBar";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <Outlet />

      {isLoggedIn && <BottomBar />}
    </>
  );
};

export default MainLayout;
