import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

export const Toast = ({
  title,
  message,
  type = "fail",
  onClose,
  duration = 3000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const typeColor = {
    normal: "border-slate-400 bg-slate-300/50 text-slate-700",
    fail: "border-red-400 bg-red-300/50 text-red-700",
    success: "border-green-400 bg-green-300/50 text-green-700",
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <span
      className={`fixed right-4 top-4 px-4 py-2 text-xs rounded-md border-1 w-70 ${typeColor[type]} flex transition-all z-100`}
    >
      <div className="flex flex-col grow">
        {title && <h3 className="font-bold">{title}</h3>}
        <p>{message ?? "toast message"}</p>
      </div>
      <button onClick={handleClose}>
        <X size={16} className="cursor-pointer" />
      </button>
    </span>
  );
};
