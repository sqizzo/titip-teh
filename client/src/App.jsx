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
import Register from "./pages/Register";
import Users from "./pages/admin/Users";
import AddRestaurant from "./pages/admin/restaurants/AddRestaurant";
import Restaurants from "./pages/admin/restaurants/Restaurants";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
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

        {/* Register */}
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
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
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/restaurants" element={<Restaurants />} />
            <Route path="/admin/restaurants/add" element={<AddRestaurant />} />
          </Route>
        </Route>

        {/* Not Found (404) */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
