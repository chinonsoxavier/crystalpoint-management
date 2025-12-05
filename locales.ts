export const locales = ['en', 'es', 'fr', 'de', 'ar'] as const;
export type Locale = (typeof locales)[number];