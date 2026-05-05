"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "../locales/en.json";
import es from "../locales/es.json";
import fr from "../locales/fr.json";
import it from "../locales/it.json";

export type Language = "en" | "es" | "fr" | "it";

type Translations = any;
const translations: Record<Language, Translations> = { en, es, fr, it };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("luxury_access_lang") as Language;
    if (saved && ["en", "es", "fr", "it"].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("luxury_access_lang", lang);
  };

  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = translations[language];
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // Fallback to English
        let fallback: any = translations["en"];
        for (const fk of keys) {
          if (fallback && fallback[fk]) {
            fallback = fallback[fk];
          } else {
            return key;
          }
        }
        return fallback;
      }
    }
    return typeof value === "string" ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
