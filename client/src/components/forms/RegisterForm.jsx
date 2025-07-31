import React, { useState } from "react";

// Icons
import { Mail, KeyRound, User } from "lucide-react";

const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (e.target.value.trim() !== "") {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: !formData.name ? "Nama harus diisi lhoo :*" : "",
      email: !formData.email ? "Email harus diisi lhoo :*" : "",
      password: !formData.password ? "Passwordmu belum diisi lhoo :*" : "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e !== "");
    if (hasError) return;

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex flex-col gap-8">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-md font-bold">
            Nama
          </label>
          <div className="relative flex border-transparent">
            <div className="absolute top-0 left-0 bg-slate-200/50 rounded-l-md h-full w-12 flex justify-center items-center">
              <User size={16} className="text-slate-600/50 z-3" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              id="name"
              placeholder="Nama lengkap"
              className="pl-15 py-3 grow text-sm rounded-md border-slate-200 border-1 focus:outline-none focus:border-indigo-400 z-2"
              onChange={handleChange}
            />
          </div>
          {errors.name && (
            <span className="text-xs text-red-400"> {errors.name} </span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-md font-bold">
            Email
          </label>
          <div className="relative flex border-transparent">
            <div className="absolute top-0 left-0 bg-slate-200/50 rounded-l-md h-full w-12 flex justify-center items-center">
              <Mail size={16} className="text-slate-600/50 z-3" />
            </div>
            <input
              type="text"
              name="email"
              value={formData.email}
              id="email"
              placeholder="rasikh@condet.com"
              className="pl-15 py-3 grow text-sm rounded-md border-slate-200 border-1 focus:outline-none focus:border-indigo-400 z-2"
              onChange={handleChange}
            />
          </div>
          {errors.email && (
            <span className="text-xs text-red-400"> {errors.email} </span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-md font-bold">
            Password
          </label>
          <div className="relative flex border-transparent">
            <div className="absolute top-0 left-0 bg-slate-200/50 rounded-l-md h-full w-12 flex justify-center items-center">
              <KeyRound size={16} className="text-slate-600/50 z-3" />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              id="password"
              placeholder="Bikin password baru"
              className="pl-15 py-3 grow text-sm rounded-md border-slate-200 border-1 focus:outline-none focus:border-indigo-400 z-2"
              onChange={handleChange}
            />
          </div>
          {errors.password && (
            <span className="text-xs text-red-400"> {errors.password} </span>
          )}
        </div>

        {/* Tombol Register */}
        <div className="flex flex-col gap-4 items-center">
          <button
            type="submit"
            className="px-4 py-3 mt-6 text-white bg-indigo-500 rounded-md font-semibold text-md cursor-pointer w-full hover:shadow-md hover:shadow-indigo-400/30 transition-all"
          >
            Daftar
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
