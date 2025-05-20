import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global-styles.css";
import QRGenerator from "./components/QRGenerator/";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QRGenerator />
  </StrictMode>
);
