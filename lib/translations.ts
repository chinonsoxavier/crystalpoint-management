import { create } from "zustand";
import { Language } from "./i18n";

interface TranslateStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useTranslateStore = create<TranslateStore>((set) => ({
  language: "en",
  setLanguage: (lang) => set({ language: lang }),
}));
