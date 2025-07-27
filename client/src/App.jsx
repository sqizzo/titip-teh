import React from "react";
import { Routes, Route } from "react-router-dom";

// Import Pages
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import MainLayout from "./components/layout/MainLayout";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import GuestRoute from "./routes/GuestRoute";
import { ToastProvider } from "./context/ToastContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import { NotFound } from "./pages/NotFound";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <ToastProvider>
      <Routes>
        {/* Public Pages */}
        <Route element={<MainLayout />}>
          {/* Home */}
          <Route path="/" element={isLoggedIn ? <Home /> : <Welcome />} />

          {/* Login */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />

          {/* Protected Pages */}
          <Route element={<ProtectedRoute />}>
            {/* Orders */}
            <Route path="/orders" element={<>orders</>}></Route>
            {/* Profile */}
            <Route path="/profile" element={<>profile</>}></Route>
          </Route>

          {/* Not Found (404) */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
};

export default App;
