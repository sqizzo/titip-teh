import React from "react";

import NotFoundIllustration from "../assets/404.png";

export const NotFound = () => {
  return (
    <div className="canvas-base justify-center items-center gap-4">
      <h2 className="text-2xl font-bold">Yah, alamat ini ga ada :(</h2>
      <img
        src={NotFoundIllustration}
        alt="not found illustration"
        className="size-72"
      />
      <span className="text-sm">Coba tanya rasikh</span>
    </div>
  );
};
