import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "../i18n/LanguageContext";
import AppRoutes from "./routes";

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LanguageProvider>
  );
}