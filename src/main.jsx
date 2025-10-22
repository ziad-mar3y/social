import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import CounterContextProvider from "./Contexts/CounterContext.jsx";
import AuthContextProvider from "./Contexts/AuthContextProvider.jsx";
import ThemeContextProvider from "./Contexts/ThemeContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider/>
      <CounterContextProvider>
        <AuthContextProvider>
          <ThemeContextProvider>
            <App />
          </ThemeContextProvider>
        </AuthContextProvider>
      </CounterContextProvider>
    </HeroUIProvider>
  </StrictMode>
);
