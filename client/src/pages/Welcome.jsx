import React from "react";

// Components
import WelcomeIllustration from "../assets/welcome_illustration.png";

const Welcome = () => {
  return (
    <div className="w-full h-screen flex p-8 gap-2 text-gray-800 flex-col bg-slate-50 items-center">
      {/* Logo */}
      <span className="text-lg font-extrabold text-indigo-500">TitipTeh!</span>
      {/* Illustration */}
      <img
        src={WelcomeIllustration}
        alt="welcome illustration"
        className="w-60"
      />
      {/* Text */}
      <div className="flex flex-col gap-4 mt-4 items-center">
        <h1 className="text-4xl font-bold text-center w-xs">
          Selamat Datang di Titip Teh!
        </h1>
        <p className="text-center text-slate-400 w-md">
          Pesan makanan dengan praktis dan efisien! Ga perlu repot pergi ke luar
          dan cukup nikmati makananmu!
        </p>
      </div>
      {/* Buttons */}
      <div className="flex flex-col mt-6 items-center w-xs text-center">
        <a
          href="/login"
          className="w-full bg-indigo-500 px-4 py-3 text-white rounded-md hover:shadow-md hover:shadow-indigo-400/30 transition-all font-medium"
        >
          Masuk
        </a>
        <span className="text-sm my-2 text-slate-400">atau</span>
        <a
          href="#"
          className="w-full border-transparent border-2 text-indigo-500 bg-indigo-500/20 px-4 py-3 rounded-md  transition-all font-medium hover:border-indigo-500 hover:border-2"
        >
          Daftar Sekarang!
        </a>
      </div>
    </div>
  );
};

export default Welcome;
