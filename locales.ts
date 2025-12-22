// export const locales = ['en', 'es', 'fr', 'de', 'ar'] as const;
// export type Locale = (typeof locales)[number];

export const locales = ["en", "es", "fr", "de", "zh"] as const;

export const localeNames: Record<(typeof locales)[number], string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  zh: "中文",
};
