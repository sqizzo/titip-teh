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
import Profile from "./pages/Profile";
import AdminRoute from "./routes/AdminRoute";
import Admin from "./pages/admin/Admin";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <ToastProvider>
      <Routes>
        {/* Public Pages */}
        <Route element={<MainLayout />}>
          {/* Login */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />

          {/* Welcome */}
          <Route
            path="/welcome"
            element={
              <GuestRoute>
                <Welcome />
              </GuestRoute>
            }
          />

          {/* Protected Pages */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            {/* Home */}
            {/* Orders */}
            <Route path="/orders" element={<>orders</>}></Route>
            {/* Profile */}
            <Route path="/profile" element={<Profile />}></Route>
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Route>

          {/* Not Found (404) */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
};

export default App;
