import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./daylight.css";

document.documentElement.dataset.build = "2026-09-15-daylight";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
