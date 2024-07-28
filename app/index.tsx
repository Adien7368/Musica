import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import "./main.css";
// wave.read_file("./index.html")
import { StrictMode } from "react";
let rootDom = document.getElementById("app");

if (rootDom) {
  const root = createRoot(rootDom);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
