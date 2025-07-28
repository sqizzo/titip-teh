import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

// Components
import LoginForm from "../components/forms/LoginForm";
import { ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { useToast } from "../context/ToastContext";

// API
import { loginUser } from "../api/authApi";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const handleLogin = async (formData) => {
    try {
      const response = await loginUser(formData);

      showToast({
        type: "success",
        title: "Login berhasil",
        message: "Selamat datang kembali!",
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch(
        loginSuccess({
          token: response.data.token,
          user: { ...response.data.user },
        })
      );
      navigate("/");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Terjadi kesalahan saat login.";
      showToast({
        type: "fail",
        title: "Login gagal",
        message: msg,
      });
    }
  };

  return (
    <div className="canvas-base gap-12">
      {/* Navigation */}
      <button
        className="cursor-pointer text-slate-600/50 bg-slate-200/50 rounded-full w-fit p-2"
        onClick={() => navigate("/")}
      >
        {" "}
        <ArrowLeft size={18} />{" "}
      </button>

      {/* Greeting */}
      <div className="flex gap-4 flex-col text-center items-center">
        <h1 className="page-title">Login Dulu Yaa!</h1>
        <p className="page-subtitle w-xs text-sm text-center">
          Laper? Log in dulu biar bisa pesen makan yaa!
        </p>
      </div>

      {/* Form */}
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
