import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

// API
import axios from "axios";

// Components
import LoginForm from "../components/forms/LoginForm";
import { ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { useToast } from "../context/ToastContext";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(`${serverUrl}/auth/login`, formData);

      showToast({
        type: "success",
        title: "Login berhasil",
        message: "Selamat datang kembali!",
      });

      localStorage.setItem("token", response.data.token);
      dispatch(loginSuccess(response.data.token));
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
    <div className="canvas-base gap-4">
      {/* Navigation */}
      <button
        className="cursor-pointer text-slate-600/50 bg-slate-200/50 rounded-full w-fit p-2"
        onClick={() => navigate("/")}
      >
        {" "}
        <ArrowLeft size={18} />{" "}
      </button>

      {/* Greeting */}
      <div className="flex gap-6 flex-col text-center items-center">
        <h1 className="text-4xl font-bold">Login Dulu Yaa!</h1>
        <p className="text-center text-slate-400 w-md text-md">
          Laper? Log in dulu biar bisa pesen makan yaa!
        </p>
      </div>

      {/* Form */}
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
