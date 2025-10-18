import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { HeroUIProvider } from "@heroui/react";
import CounterContextProvider from "./Contexts/CounterContext.jsx";
import AuthContextProvider from "./Contexts/AuthContextProvider.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <CounterContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </CounterContextProvider>
    </HeroUIProvider>
  </StrictMode>
);
