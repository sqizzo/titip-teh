import { useState } from "react";

import { Outlet } from "react-router-dom";

import { Toast } from "../ui/Toast";

import React from "react";
import BottomBar from "../navigation/BottomBar";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const [toast, setToast] = useState(null);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="relative">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <Outlet context={{ showToast: setToast }} />

      {isLoggedIn && <BottomBar />}
    </div>
  );
};

export default MainLayout;
