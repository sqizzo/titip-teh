import { CircleUser, Home, LogOut, Scroll } from "lucide-react";
import React from "react";

import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

import { useToast } from "../../context/ToastContext";

import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const BottomBar = () => {
  const location = useLocation();
  const { pathname } = location;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    showToast({
      type: "success",
      title: "Logout berhasil",
      message: "Bye!",
    });
  };

  return (
    <div className="fixed bottom-0 px-2 h-1/10 w-full bg-slate-100 inset-shadow-2xs flex justify-evenly items-center">
      <a
        href="/"
        className={`bottom-bar-btn ${
          pathname === "/" ? "bottom-active" : "bottom-inactive"
        }`}
      >
        <Home size={16} />
      </a>
      <a
        href="/orders"
        className={`bottom-bar-btn ${
          pathname === "/orders" ? "bottom-active" : "bottom-inactive"
        }`}
      >
        <Scroll size={16} />
      </a>
      <a
        href="/profile"
        className={`bottom-bar-btn ${
          pathname === "/profile" ? "bottom-active" : "bottom-inactive"
        }`}
      >
        <CircleUser size={16} />
      </a>
      <a onClick={handleLogout} className="bottom-bar-btn bottom-inactive">
        <LogOut size={16} />
      </a>
    </div>
  );
};

export default BottomBar;
