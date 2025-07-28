import React, { createContext, useContext, useEffect, useState } from "react";
import { Toast } from "../components/ui/Toast";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (data) => setToast(data);
  const closeToast = () => setToast(null);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div className="relative overflow-hidden">
        {toast && <Toast {...toast} onClose={closeToast} />}
        {children}
      </div>
    </ToastContext.Provider>
  );
};
