import {
  CircleUser,
  Home,
  ListCheck,
  LogOut,
  Scroll,
  Shield,
} from "lucide-react";
import React from "react";

import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

import { useToast } from "../../context/ToastContext";

import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const BottomBar = () => {
  const role = JSON.parse(localStorage.getItem("user")).role;
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
    <div className="fixed bottom-0 px-2 py-3 w-full bg-slate-100 inset-shadow-2xs flex justify-evenly items-center">
      <div className="flex flex-col items-center mt-1 gap-1">
        <a
          href="/"
          className={`bottom-bar-btn ${
            pathname === "/" ? "bottom-active" : "bottom-inactive"
          }`}
        >
          <Home size={16} />
        </a>
        <span className="text-xs font-medium text-indigo-600">Home</span>
      </div>
      <div className="flex flex-col items-center mt-1 gap-1">
        <a
          href="/orders"
          className={`bottom-bar-btn ${
            pathname === "/orders" ? "bottom-active" : "bottom-inactive"
          }`}
        >
          <Scroll size={16} />
        </a>
        <span className="text-xs font-medium text-indigo-600">Orders</span>
      </div>
      {/* Admin */}
      {role === "admin" && (
        <div className="flex flex-col items-center mt-1 gap-1">
          <a
            href="/admin"
            className={`bottom-bar-btn ${
              pathname === "/admin" ? "bottom-active" : "bottom-inactive"
            }`}
          >
            <Shield size={16} />
          </a>
          <span className="text-xs font-medium text-indigo-600">Admin</span>
        </div>
      )}

      <div className="flex flex-col items-center mt-1 gap-1">
        <a
          href="/profile"
          className={`bottom-bar-btn ${
            pathname === "/profile" ? "bottom-active" : "bottom-inactive"
          }`}
        >
          <CircleUser size={16} />
        </a>
        <span className="text-xs font-medium text-indigo-600">Profile</span>
      </div>
      <div className="flex flex-col items-center mt-1 gap-1">
        <a onClick={handleLogout} className="bottom-bar-btn bottom-inactive">
          <LogOut size={16} />
        </a>
        <span className="text-xs font-medium text-indigo-600">Log Out</span>
      </div>
    </div>
  );
};

export default BottomBar;
