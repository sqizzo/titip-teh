import React, { useEffect, useState } from "react";

// Icons
import { Mail, KeyRound } from "lucide-react";

const LoginForm = ({ onSubmit }) => {
  // Buat nyimpen form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Buat nyimpen error
  const [errors, setErrors] = useState({
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

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      email: !formData.email ? "Email harus diisi lhoo :*" : "",
      password: !formData.password ? "Passwordmu belum diisi lhoo :*" : "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e !== "");
    if (hasError) return;

    // Kirim ke parent
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex flex-col gap-8">
        {/* Email */}
        <div className="flex flex-col gap-2">
          {/* Label */}
          <label htmlFor="email" className="text-md font-bold">
            Email
          </label>
          {/* Input Group */}
          <div className="relative flex border-transparent">
            {/* Icons */}
            <div className="absolute top-0 left-0 bg-slate-200/50 rounded-l-md h-full w-12 flex justify-center items-center">
              <Mail size={16} className="text-slate-600/50 z-3" />
            </div>
            <input
              type="text"
              name="email"
              value={formData.email}
              id="email"
              placeholder="rasikh@condet.com"
              className="pl-15 py-3 grow text-sm rounded-md border-slate-200 border-1 focus:outline-none
              focus:border-indigo-400 z-2"
              onChange={handleChange}
            />
          </div>
          {/* Errors */}
          {errors.email && (
            <span className="text-xs text-red-400"> {errors.email} </span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          {/* Label */}
          <label htmlFor="password" className="text-md font-bold">
            Password
          </label>
          {/* Input Group */}
          <div className="relative flex border-transparent">
            {/* Icons */}
            <div className="absolute top-0 left-0 bg-slate-200/50 rounded-l-md h-full w-12 flex justify-center items-center">
              <KeyRound size={16} className="text-slate-600/50 z-3" />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              id="password"
              placeholder="apa hayoo"
              className="pl-15 py-3 grow text-sm rounded-md border-slate-200 border-1 focus:outline-none focus:border-indigo-400 z-2"
              onChange={handleChange}
            />
          </div>
          {/* Errors */}
          {errors.password && (
            <span className="text-xs text-red-400"> {errors.password} </span>
          )}
        </div>

        {/* Tombol Log In */}
        <div className="flex flex-col gap-4 items-center">
          <button
            type="submit"
            className="px-4 py-3 mt-6 text-white bg-indigo-500 rounded-md font-semibold text-md cursor-pointer w-full hover:shadow-md hover:shadow-indigo-400/30 transition-all"
          >
            {" "}
            Masuk
          </button>
          <a href="#" className="w-fit text-sm text-slate-500">
            Lupa password?
          </a>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
