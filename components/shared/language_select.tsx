// components/shared/language_select.tsx
"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { useTranslateStore } from "@/lib/translations";
import { Language } from "@/lib/i18n";
import usFlag from "@/assets/images/united-states-of-america-flag-png-large.png";
import chFlag from "@/assets/images/flag-china.png";
import esFlag from "@/assets/images/spain-flag-png-large.png";
import frFlag from "@/assets/images/france-flag-png-large.png";
import ptFlag from "@/assets/images/portugal-flag-400.png";
import Image, { StaticImageData } from "next/image";
interface LanguageOption {
  code: Language;
  name: string;
  flag: StaticImageData;
};

// 3. Define the Array with the Interface type
const languages: LanguageOption[] = [
  { code: "en", name: "English", flag: usFlag },
  { code: "es", name: "Español", flag: esFlag },
  { code: "fr", name: "Français", flag: frFlag },
  { code: "pt", name: "Português", flag: ptFlag },
{ code: "zh", name: "中文", flag: chFlag },    
];

export function LanguageSelect() {
  const { language, setLanguage } = useTranslateStore();
  // 4. Find the object safely
  const currentLangObj =
    languages.find((l) => l.code === language) || languages[0];

  return (
    <div className="w-full fixed bottom-2 left-10">
      <div className="w-full">
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <div className="w-full py-2 flex justify-start gap-2 text-secondary-foreground hover:text-primary hover:bg-transparent p-0 h-auto text-[17px] md:text-[19px]">
              {/* <Globe className="w-4 h-4" /> */}
              <span className="flex w-full items-center gap-2">
                <Image
                  src={currentLangObj.flag}
                  alt={currentLangObj.name}
                  className="w-5  h-5"
                />{" "}
                <span></span> {currentLangObj.name}
              </span>
              <ChevronDown className="w-4 h-4 opacity-50 ml-auto" />
            </div>
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
                  {/* <span className="text-lg">{lang.flag}</span> */}
                  <Image
                    src={lang.flag}
                    alt={lang.name}
                    className="w-5  h-5"
                  />{" "}
                  <span></span>
                  <span className="flex-1 text-left">{lang.name}</span>
                  {language === lang.code && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>
    </div>
  );
}
