"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

import { languages, type Language } from "@/lib/i18n";
import { useTranslateStore } from "@/lib/translations";

export function LanguageSelect() {
  const { language, setLanguage } = useTranslateStore();

  return (
    <div className="fixed bottom-0 left-20 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 bg-white">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">{languages[language]}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          <DropdownMenuContent align="end" sideOffset={8} className="z-50">
            {(Object.keys(languages) as Language[]).map((lang) => (
              <DropdownMenuItem
                key={lang}
                onClick={() => setLanguage(lang)}
                className={language === lang ? "bg-accent" : ""}
              >
                {languages[lang]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  );
}
