// hooks/use_translate.ts
"use client";

import { useEffect } from "react";
import { useTranslateStore } from "@/lib/translations";
import { translations, type AllTranslations } from "@/lib/i18n";

export function useTranslate() {
  const language = useTranslateStore((state) => state.language);
  const hydrate = useTranslateStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return {
    language,
    t: translations[language] as AllTranslations,
  };
}
