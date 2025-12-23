import { create } from "zustand";
import type { LanguageCode } from "./types";

type TranslateState = {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
};

export const useTranslateStore = create<TranslateState>((set) => ({
  language: "en",
  setLanguage: (lang) => set({ language: lang }),
}));
