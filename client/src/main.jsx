import React from "react";

// For rendering to DOM
import ReactDOM from "react-dom/client";
// Buat routing
import { BrowserRouter } from "react-router-dom";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// State management with redux
import { Provider } from "react-redux";
import { store } from "./store/store.js";

import App from "./App.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Untuk access redux state secara global */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
