import React from "react";
import { useNavigate } from "react-router-dom";

// Components
import RegisterForm from "../components/forms/RegisterForm";
import { ArrowLeft } from "lucide-react";
import { useToast } from "../context/ToastContext";

// API
import { registerUser } from "../api/authApi";

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleRegister = async (formData) => {
    try {
      await registerUser(formData);

      showToast({
        type: "success",
        title: "Registrasi Berhasil",
        message: "Akun kamu sudah dibuat. Silakan login!",
      });

      navigate("/login");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Terjadi kesalahan saat registrasi.";
      showToast({
        type: "fail",
        title: "Registrasi gagal",
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
        <ArrowLeft size={18} />
      </button>

      {/* Greeting */}
      <div className="flex gap-4 flex-col text-center items-center">
        <h1 className="page-title">Daftar Akun Baru</h1>
        <p className="page-subtitle w-xs text-sm text-center">
          Isi data di bawah untuk bikin akun baru dan mulai pesan makanan!
        </p>
      </div>

      {/* Form */}
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default Register;
