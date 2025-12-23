"use client";

import { ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

// Import your store
import { useTranslateStore } from "@/lib/translations";
import { LanguageCode } from "@/lib/types";

// Define languages with flags here (moved from Footer)
const languages: { code: LanguageCode; name: string, flag: string }[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
];

export function LanguageSelect() {
  const { language, setLanguage } = useTranslateStore();

  // Find the full object for the current language to display flag/name correctly
  const currentLangObj =
    languages.find((l) => l.code === language) || languages[0];

  return (
    <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-secondary-foreground hover:text-primary hover:bg-transparent p-0 h-auto text-[17px] md:text-[19px]"
          >
            <Globe className="w-4 h-4" />
            <span className="flex items-center gap-2">
              {currentLangObj.flag} {currentLangObj.name} hvgh
            </span>
            <ChevronDown className="w-4 h-4 opacity-50 ml-auto" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          <DropdownMenuContent
            align="start"
            sideOffset={8}
            className="min-w-[200px] p-1"
          >
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-md ${
                  language === lang.code
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="flex-1 text-left">{lang.name}</span>
                {/* Active indicator dot */}
                {language === lang.code && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  );
}
