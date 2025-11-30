"use client";

import { useState, useEffect } from "react";
import { ChevronDown, LogIn, X } from "lucide-react";
import useLandingStore from "@/app/(landing)/landing_store";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ← Add this

export default function Sidemenu() {
  const [companyOpen, setCompanyOpen] = useState(true);
  const { toggleSideMenuOpen, sideMenuOpen } = useLandingStore();

  const pathname = usePathname(); // ← Track current route

  // Close menu whenever route changes
  useEffect(() => {
    if (sideMenuOpen) {
      toggleSideMenuOpen(); // This sets sideMenuOpen = false
    }
  }, [pathname]);

  return (
    <div
      className={`overflow-clip medium:hidden bg-black flex items-center duration-500 fixed z-50 inset-0 justify-center ${
        sideMenuOpen ? "w-dvw h-dvh" : "p-0 w-dvw h-0"
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
              <h2 className="text-xl font-bold text-primary">Company</h2>
              <ChevronDown
                size={24}
                className={`text-primary duration-500 transition-transform ${
                  companyOpen ? "rotate-0" : "rotate-90"
                }`}
              />
            </button>
            <div
              className={`space-y-3 overflow-clip flex items-start justify-center flex-col duration-500 ml-4 ${
                companyOpen ? "h-[15vh]" : "h-0"
              }`}
            >
              <Link
                href="/about-us"
                onClick={() => toggleSideMenuOpen()} // ← Also close on click
                className="block text-lg text-gray-300 hover:text-gray-100 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/faqs"
                onClick={() => toggleSideMenuOpen()}
                className="block text-lg text-gray-300 hover:text-gray-100 transition-colors"
              >
                FAQ`s
              </Link>
              <Link
                href="/contact-us"
                onClick={() => toggleSideMenuOpen()}
                className="block text-lg text-gray-300 hover:text-gray-100 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              <Link href="/markets" onClick={() => toggleSideMenuOpen()}>
                Markets
              </Link>
            </h3>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              <Link href="/plans" onClick={() => toggleSideMenuOpen()}>
                Plans
              </Link>
            </h3>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              <Link href="/services" onClick={() => toggleSideMenuOpen()}>
                Our Services
              </Link>
            </h3>
          </div>
        </nav>

        <Link href="/sign-in" onClick={() => toggleSideMenuOpen()}>
          <Button className="w-full duration-500 hover:text-white min-w-0 mt-12 transition-colors flex items-center justify-center gap-2 text-lg">
            Log in
            <LogIn size={20} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
