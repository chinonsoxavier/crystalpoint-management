import { header as enHeader } from "./en/header";
import { header as esHeader } from "./es/header";
import { header as frHeader } from "./fr/header";
import { header as deHeader } from "./de/header";
//import { header as zhHeader } from "./zh/header";

export type Language = "en" | "es" | "fr" | "de" | "ar";

export const translations = {
  en: { header: enHeader },
  es: { header: esHeader },
  fr: { header: frHeader },
  de: { header: deHeader },
  //zh: { header: zhHeader },
  ar: { header: enHeader },
};


export const languages: Record<Language, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
 // zh: "中文",
  ar: "العربية",
};