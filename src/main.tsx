import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import FeedBackApp from "./FeedbackApp.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FeedBackApp />
  </StrictMode>
);
