"use client";

import { useState, useEffect } from "react";
import { ChevronDown, LogIn, X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslate } from "@/hooks/use_translate";
import useLandingStore from "@/app/(landing)/landing_store";

export default function Sidemenu() {
  const { t } = useTranslate();
  const [companyOpen, setCompanyOpen] = useState(true);
  const { toggleSideMenuOpen, sideMenuOpen } = useLandingStore();
  const pathname = usePathname();

  // Check if link is active - same logic as Header
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // Close menu whenever route changes
  useEffect(() => {
    if (sideMenuOpen) {
      toggleSideMenuOpen();
    }
  }, [pathname]);

  return (
    <div
      className={`overflow-clip medium:hidden bg-black flex items-center duration-500 fixed z-50 inset-0 justify-center ${sideMenuOpen ? "w-dvw h-dvh" : "p-0 w-dvw h-0"
        }`}
    >
      {/* Close Button */}
      <button
        onClick={() => toggleSideMenuOpen()}
        className="absolute top-6 right-10 w-12 h-12 rounded-lg border-2 border-white hover:text-primary cursor-pointer transition-colors flex items-center justify-center text-white"
      >
        <X size={24} />
      </button>

      <div className="w-full px-5 pr-8 mx-auto max-w-md">
        <nav className="space-y-8">
          {/* Company Section */}
          <div>
            <button
              onClick={() => setCompanyOpen(!companyOpen)}
              className="flex items-center justify-between w-full mb-4 group"
            >
              <h2
                className={`text-xl font-bold transition-colors duration-300 ${isActiveLink("/about-us") ||
                  isActiveLink("/faqs") ||
                  isActiveLink("/contact-us")
                  ? "text-[#1a365d]"
                  : "text-primary"
                  }`}
              >
                {t?.admin?.sidemenu.aboutUs}
              </h2>
              <ChevronDown
                size={24}
                className={`duration-500 transition-transform ${companyOpen ? "rotate-0" : "rotate-90"
                  } ${isActiveLink("/about-us") ||
                    isActiveLink("/faqs") ||
                    isActiveLink("/contact-us")
                    ? "text-[#1a365d]"
                    : "text-primary"
                  }`}
              />
            </button>
            <div
              className={`space-y-3 overflow-clip flex items-start justify-center flex-col duration-500 ml-4 ${companyOpen ? "h-[15vh]" : "h-0"
                }`}
            >
              <Link
                href="/about-us"
                onClick={() => toggleSideMenuOpen()}
                className={`block text-lg transition-colors duration-300 ${isActiveLink("/about-us")
                  ? "text-[#1a365d] font-semibold"
                  : "text-gray-300 hover:text-gray-100"
                  }`}
              >
                {t?.admin?.sidemenu?.aboutUs}
              </Link>
              <Link
                href="/faqs"
                onClick={() => toggleSideMenuOpen()}
                className={`block text-lg transition-colors duration-300 ${isActiveLink("/faqs")
                  ? "text-[#1a365d] font-semibold"
                  : "text-gray-300 hover:text-gray-100"
                  }`}
              >
                {t?.admin?.sidemenu?.faqs}
              </Link>
              <Link
                href="/contact-us"
                onClick={() => toggleSideMenuOpen()}
                className={`block text-lg transition-colors duration-300 ${isActiveLink("/contact-us")
                  ? "text-[#1a365d] font-semibold"
                  : "text-gray-300 hover:text-gray-100"
                  }`}
              >
                {t?.admin?.sidemenu?.contactUs}
              </Link>
            </div>
          </div>

          <div>
            <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${isActiveLink("/markets")
              ? "text-[#1a365d]"
              : "text-white"
              }`}>
              <Link
                href="/markets"
                onClick={() => toggleSideMenuOpen()}
                className={isActiveLink("/markets") ? "text-[#1a365d]" : ""}
              >
                {t?.admin?.sidemenu?.markets}
              </Link>
            </h3>
          </div>

          <div>
            <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${isActiveLink("/plans")
              ? "text-[#1a365d]"
              : "text-white"
              }`}>
              <Link
                href="/plans"
                onClick={() => toggleSideMenuOpen()}
                className={isActiveLink("/plans") ? "text-[#1a365d]" : ""}
              >
                {t?.admin?.sidemenu?.plans}
              </Link>
            </h3>
          </div>

          <div>
            <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${isActiveLink("/services")
              ? "text-[#1a365d]"
              : "text-white"
              }`}>
              <Link
                href="/services"
                onClick={() => toggleSideMenuOpen()}
                className={isActiveLink("/services") ? "text-[#1a365d]" : ""}
              >
                {t?.admin?.sidemenu?.ourServices}
              </Link>
            </h3>
          </div>
        </nav>

        <Link href="/sign-in" onClick={() => toggleSideMenuOpen()}>
          <Button
            className={`w-full duration-500 min-w-0 mt-12 transition-all flex items-center justify-center gap-2 text-lg ${isActiveLink("/sign-in")
              ? "bg-[#1a365d] text-white hover:bg-[#1a365d]/90"
              : "hover:text-primary hover:bg-white text-white"
              }`}
          >
            {t?.admin?.sidemenu?.login}
            <LogIn size={20} />
          </Button>
        </Link>
      </div>
    </div>
  );
}