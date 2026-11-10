import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Language } from "../types";

type LanguageContextValue = {
  language: Language;
  direction: "rtl" | "ltr";
  toggleLanguage: () => void;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("murshid_language");
    return saved === "en" ? "en" : "ar";
  });

  const direction: "rtl" | "ltr" = language === "ar" ? "rtl" : "ltr";

  function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage);
    localStorage.setItem("murshid_language", nextLanguage);
  }

  function toggleLanguage() {
    setLanguage(language === "ar" ? "en" : "ar");
  }

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  const value = useMemo(
    () => ({
      language,
      direction,
      toggleLanguage,
      setLanguage,
    }),
    [language, direction]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}