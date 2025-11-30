import { Bitcoin, TrendingUp, Share2, DollarSign, Globe, Gem } from "lucide-react";
import Link from "next/link";

const Footer=()=> {
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
                    <Gem className="w-8 h-8 text-[#0A8A9F] group-hover:text-[#0A8A9F] transition-colors duration-300" />
                    <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm group-hover:bg-cyan-300/30 transition-all duration-300"></div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xl font-bold bg-linear-to-r from-black to-cyan-[#0A8A9F] bg-clip-text text-transparent group-hover:from-cyan-200 group-hover:to-white transition-all duration-500">
                      CrystalPoint
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
                  Our Company
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/about-us"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      What We Offer
                    </a>
                  </li>
                  <li>
                    <a
                      href="/faqs"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      FAQ`s
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact-us"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              {/* Our Services */}
              <div>
                <h3 className="font-bold text-primary-foreground text-[17px] md:text-[19px] mb-4">
                  Our Services
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/services/real-estate"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      Real Estate
                    </a>
                  </li>

                  <li>
                    <a
                      href="/services/gold-investments"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      Gold Investments
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services/financial-planning"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      Retirement Planning
                    </a>
                  </li>
                </ul>
              </div>

              {/* More */}
              <div>
                <h3 className="font-bold text-primary-foreground text-[17px] md:text-[19px] mb-4">
                  More
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/services/oil-and-gas"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      Oil and Gas
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services/financial-planning"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      Financial Planning
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services/loans-and-grants"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      Loans and Grants
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services/stock-investment"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      Stock Investment
                    </a>
                  </li>
                </ul>
              </div>

              {/* Account */}
              <div>
                <h3 className="font-bold text-primary-foreground text-[17px] md:text-[19px] mb-4">
                  Account
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/sign-up"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      Create Account
                    </a>
                  </li>
                  <li>
                    <a
                      href="/sign-in"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      Login
                    </a>
                  </li>
                  <li>
                    <a
                      href="/forgot-password"
                      className="text-secondary-foreground hover:text-primary duration-300 text-[17px] md:text-[19px]"
                    >
                      Forgot Password?
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
                      href="/terms-of-use"
                      className="hover:text-primary-foreground"
                    >
                      Terms of Use
                    </a>
                    {/*divider  */}
                    <div className="border-r border-secondary-foreground  mx-2 h-4 w-1"></div>
                    <a
                      href="/privacy-policy"
                      className="hover:text-primary-foreground"
                    >
                      Privacy policy
                    </a>
                  </div>
                  <span className="text-base">
                    ©2019 - 2025
                    <span className="border-r border-secondary-foreground  mx-2 h-3 w-1"></span>
                    CrystalPoint Management. All Rights Reserved.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}


export default Footer;