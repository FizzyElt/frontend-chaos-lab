import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "jotai";
import App from "./App";
import { jotaiStore } from "./jotai-store";

document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={jotaiStore}>
      <App />
    </Provider>
  </StrictMode>,
);
