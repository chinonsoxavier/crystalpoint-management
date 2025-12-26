// translations/index.ts

import { landing as enLanding } from "./en/landing";
import { landing as esLanding } from "./es/landing";
import { landing as frLanding } from "./fr/landing";
import { landing as ptLanding } from "./pt/landing";
import { landing as zhLanding } from "./zh/landing";

// Remove 'de' if you don't have German translations yet
// import { landing as deLanding } from "./de/landing";

export type Language = "en" | "es" | "fr" | "pt" | "zh";

export interface LandingTranslation {
  header: {
    company: string;
    aboutUs: string;
    faqs: string;
    contactUs: string;
    markets: string;
    plans: string;
    services: string;
    login: string;
    signup: string;
    investment: string;
    // Add more sections here as you expand (hero, footer, etc.)
  };
  // hero?: { ... }
  // about?: { ... }
  // Add other page sections here
}

// export const translations: Record<Language, LandingTranslation> = {
//   en: { header: enLanding },
//   es: { header: esLanding },
//   fr: { header: frLanding },
//   pt: { header: ptLanding }, // Fixed: now correctly maps to Portuguese
//   zh: { header: zhLanding },
// };

export const languages: Record<Language, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  pt: "Português",
  zh: "中文",
};
