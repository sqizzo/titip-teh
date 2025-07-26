import React from "react";
import { Routes, Route } from "react-router-dom";

// Import Pages
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import MainLayout from "./components/layout/MainLayout";
import { useSelector } from "react-redux";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={isLoggedIn ? <div>Logged In</div> : <Welcome />}
        />
      </Route>
    </Routes>
  );
};

export default App;
