import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import "./style/globals.css";
import "./style/GlobalSections.css";
import "./style/GlobalCardsPages.css";

const [navigation] = performance.getEntriesByType("navigation");

if (navigation && navigation.type === "reload") {
  window.scrollTo(0, 0);
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
