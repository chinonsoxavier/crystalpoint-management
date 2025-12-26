import { create } from "zustand";
import { Language } from "@/lib/i18n";

interface TranslateState {
  language: Language;
  setLanguage: (lang: Language) => void;
  hydrate: () => void;
}

export const useTranslateStore = create<TranslateState>((set) => ({
  language: "en", // default fallback

  setLanguage: (lang) => {
    // persist
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-language", lang);
    }
    set({ language: lang });
  },

  hydrate: () => {
    if (typeof window === "undefined") return;
    
    const stored = localStorage.getItem(
      "preferred-language"
    ) as Language | null;
    
    const browserLang = navigator.language.split("-")[0] as Language;
const supported = ["en", "es", "fr", "pt", "zh"];

if (!stored && supported.includes(browserLang)) {
  set({ language: browserLang });
}
    if (stored) {
      set({ language: stored });
    }
  },
}));
