import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Debug logging to see what's happening
console.log("main.tsx is loading...");

const root = document.getElementById("root");
if (!root) {
  console.error("Root element not found!");
} else {
  console.log("Root element found, mounting React app...");
  createRoot(root).render(<App />);
  console.log("React app mounted successfully!");
}
