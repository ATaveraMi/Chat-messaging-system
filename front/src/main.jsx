import { H } from "highlight.run";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// Initialize Highlight
H.init(import.meta.env.VITE_HIGHLIGHT_PROJECT_ID, {
  serviceName: "frontend-app",
  environment: import.meta.env.MODE,
  enableStrictPrivacy: false, // Set to true if you want to mask all text by default
  networkRecording: {
    enabled: true,
    recordHeadersAndBody: true,
    urlBlocklist: [
      // Add URLs you don't want to record
      "localhost:3000/api/sensitive-route",
    ],
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
