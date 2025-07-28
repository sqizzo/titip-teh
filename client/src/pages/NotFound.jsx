import React from "react";

import NotFoundIllustration from "../assets/404.png";

export const NotFound = () => {
  return (
    <div className="canvas-base justify-center items-center gap-8">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-2xl font-bold">Yah, alamat ini ga ada :(</h2>
        <span className="text-sm">Coba tanya rasikh</span>
      </div>

      <img
        src={NotFoundIllustration}
        alt="not found illustration"
        className="size-72"
      />
      <a
        href="/"
        className="py-2 w-1/4 text-center bg-indigo-500 rounded-md text-white font-medium hover:shadow-md hover:shadow-indigo-600/20 transition-all"
      >
        {" "}
        Balik bos
      </a>
    </div>
  );
};
