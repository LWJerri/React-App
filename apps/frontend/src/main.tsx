import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Toaster } from "./components/ui/toaster";
import "./index.css";

const container = document.getElementById("root");

if (!container) throw new Error("Root element not found.");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />

    <Toaster />
  </React.StrictMode>,
);
