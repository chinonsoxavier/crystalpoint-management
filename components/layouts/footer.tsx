// footer.tsx
"use client";

import {  Gem } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslate } from "@/hooks/use_translate";

const Footer = () => {
  const { t } = useTranslate();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="wrapper">
      <div className="max_width_md">
        {/* Logo Section */}
        <div className="py-12 px-4 md:px-8">
          <div className="flex-1">
            <Link href="/" className="group">
              <div className="w-min whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Gem className="w-8 h-8 text-[#1a365d] group-hover:text-[#1a365d] transition-colors duration-300" />
                    <div className="absolute inset-0 bg-primary-400/20 rounded-full blur-sm group-hover:bg-primary-300/30 transition-all duration-300"></div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xl font-bold bg-linear-to-r from-black to-cyan-[#1a365d] bg-clip-text text-transparent group-hover:from-primary-200 group-hover:to-white transition-all duration-500">
                      CristalPoint
                    </p>
                    <p className="text-xs text-gray-800 font-medium tracking-widest group-hover:text-gray-300 transition-colors duration-300">
                      INVESTMENT MANAGEMENT
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer Navigation */}
        <footer className="px-4 md:px-8 py-16">
          <div className="">
            {/* Navigation Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {/* Our Company */}
              <div>
                <h3 className="font-bold text-primary-foreground text-[17px] md:text-[19px] mb-4">
                  {t.landing.footer.company.title}
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/about-us"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      {t.landing.footer.company.aboutUs}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      {t.landing.footer.company.whatWeOffer}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/faqs"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      {t.landing.footer.company.faqs}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact-us"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      {t.landing.footer.company.contactUs}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Our Services */}
              <div>
                <h3 className="font-bold text-primary-foreground text-[17px] md:text-[19px] mb-4">
                  {t.landing.footer.services.title}
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/services/real-estate"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      {t.landing.footer.services.realEstate}
                    </a>
                  </li>

                  <li>
                    <a
                      href="/services/gold-investments"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      {t.landing.footer.services.goldInvestments}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services/financial-planning"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      {t.landing.footer.services.retirementPlanning}
                    </a>
                  </li>
                </ul>
              </div>

              {/* More */}
              <div>
                <h3 className="font-bold text-primary-foreground text-[17px] md:text-[19px] mb-4">
                  {t.landing.footer.more.title}
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/services/oil-and-gas"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      {t.landing.footer.more.oilAndGas}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services/financial-planning"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      {t.landing.footer.more.financialPlanning}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services/loans-and-grants"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      {t.landing.footer.more.loansAndGrants}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services/stock-investment"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      {t.landing.footer.more.stockInvestment}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Account */}
              <div>
                <h3 className="font-bold text-primary-foreground text-[17px] md:text-[19px] mb-4">
                  {t.landing.footer.account.title}
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/sign-up"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      {t.landing.footer.account.createAccount}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/sign-in"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      {t.landing.footer.account.login}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/forgot-password"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      {t.landing.footer.account.forgotPassword}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Center - Links & Copyright */}
                <div className="flex flex-col md:items-center gap-4 text-[17px] text-secondary-foreground">
                  <div className="flex justify-start text-sm items-center w-full">
                    <a
                      href="/terms-of-service"
                      className="hover:text-primary-foreground"
                    >
                      {t.landing.footer.legal.termsOfUse}
                    </a>
                    {/*divider  */}
                    <div className="border-r border-secondary-foreground  mx-2 h-4 w-1"></div>
                    <a
                      href="/privacy-policy"
                      className="hover:text-primary-foreground"
                    >
                      {t.landing.footer.legal.privacyPolicy}
                    </a>
                  </div>
                  <span className="text-base">
                    ©2019 - 2025
                    <span className="border-r border-secondary-foreground  mx-2 h-3 w-1"></span>
                    {t.landing.footer.copyright}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
