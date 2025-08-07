import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

console.log("main.tsx is loading...");

const root = document.getElementById("root");
if (!root) {
  console.error("Root element not found!");
} else {
  console.log("Root element found, creating React root...");
  try {
    const reactRoot = createRoot(root);
    console.log("React root created, now rendering App...");
    reactRoot.render(<App />);
    console.log("App render call completed!");
    
    // Force check what's in the root after render
    setTimeout(() => {
      console.log("Root innerHTML after render:", root.innerHTML);
      console.log("Root children count:", root.children.length);
    }, 100);
  } catch (error) {
    console.error("Error during React rendering:", error);
  }
}
