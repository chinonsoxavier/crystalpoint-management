"use client";
import { ArrowUp, ChevronDown, Gem, Menu } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import {  useState } from "react";
import landingStore from "@/app/(landing)/landing_store";
import Animate from "../animation/animate";
import { usePathname } from "next/navigation";
const Header = () => {
  const { toggleSideMenuOpen } = landingStore();
  const [hovered, setHovered] = useState(false);
  const pathname = usePathname();

  // Check if link is active
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };
  return (
    <Animate
      duration={0.2}
      type="fadeInDown"
      className="flex-col center text-white w-full border-b bg-[#181818] h-20 md:h-23"
    >
      <div className="max_width h-full justify-between w-full flex items-center">
        <div className="flex items-center gap-10 h-full text-[#a9afba] flex-1 justify-start">
          <div className="flex-1">
            <Link href="/" className="group">
              <div className="w-min whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Gem
                      className={`w-8 h-8 transition-colors duration-300 ${
                        isActiveLink("/")
                          ? "text-[#0A8A9F]"
                          : "text-gray-400 group-hover:text-[#0A8A9F]"
                      }`}
                    />
                    <div className="absolute inset-0 bg-[#0A8A9F]/20 rounded-full blur-sm group-hover:bg-[#0A8A9F]/30 transition-all duration-300"></div>
                  </div>
                  <div className="flex flex-col">
                    <p
                      className={`text-xl font-bold transition-all duration-500 ${
                        isActiveLink("/")
                          ? "text-[#0A8A9F]"
                          : "text-white group-hover:text-[#0A8A9F]"
                      }`}
                    >
                      CrystalPoint
                    </p>
                    <p className="text-xs text-gray-400 font-medium tracking-widest group-hover:text-gray-300 transition-colors duration-300">
                      INVESTMENT MANAGEMENT
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <nav className="h-full hidden medium:block">
            <ul className="flex items-center whitespace-nowrap flex-2 gap-10 h-full justify-center">
              <li
                className="relative h-full"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <Link
                  href="#"
                  className={`flex gap-1 center h-full transition-colors duration-300 ${
                    isActiveLink("#")
                      ? "text-[#0A8A9F]"
                      : "text-white hover:text-[#0A8A9F]"
                  }`}
                >
                  Company <ChevronDown className="w-4 mt-px" />
                </Link>

                <div
                  className={`bg-white absolute z-50 top-25 left-0 rounded-xl duration-300 overflow-hidden w-full min-w-[190px] right-0 ${
                    hovered ? "p-5" : "p-0 h-0"
                  }`}
                >
                  <ul className="space-y-2">
                    <li className="text-primary-foreground duration-500 hover:text-[#0A8A9F]">
                      <Link
                        href="/about-us"
                        className={
                          isActiveLink("/about-us") ? "text-[#0A8A9F]" : ""
                        }
                      >
                        About Us
                      </Link>
                    </li>
                    <li className="text-primary-foreground duration-500 hover:text-[#0A8A9F]">
                      <Link
                        href="/faqs"
                        className={
                          isActiveLink("/faqs") ? "text-[#0A8A9F]" : ""
                        }
                      >
                        FAQ`s
                      </Link>
                    </li>
                    <li className="text-primary-foreground duration-500 hover:text-[#0A8A9F]">
                      <Link
                        href="/contact-us"
                        className={
                          isActiveLink("/contact-us") ? "text-[#0A8A9F]" : ""
                        }
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link
                  href="/markets"
                  className={`transition-colors duration-300 ${
                    isActiveLink("/markets")
                      ? "text-[#0A8A9F]"
                      : "text-white hover:text-[#0A8A9F]"
                  }`}
                >
                  Markets
                </Link>
              </li>
              <li>
                <Link
                  href="/plans"
                  className={`transition-colors duration-300 ${
                    isActiveLink("/plans")
                      ? "text-[#0A8A9F]"
                      : "text-white hover:text-[#0A8A9F]"
                  }`}
                >
                  Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className={`transition-colors duration-300 ${
                    isActiveLink("/services")
                      ? "text-[#0A8A9F]"
                      : "text-white hover:text-[#0A8A9F]"
                  }`}
                >
                  Our Services
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="items-center flex-1 hidden medium:flex gap-5 justify-end">
          <Link href="/sign-in">
            <Button
              variant="ghost"
              className={`group transition-all duration-300 ${
                isActiveLink("/sign-in")
                  ? "text-[#0A8A9F] border-[#0A8A9F]"
                  : "hover:text-black text-white"
              }`}
            >
              Log In
              <div
                className={`center rounded-full transition-all duration-500 ${
                  isActiveLink("/sign-in")
                    ? "bg-[#0A8A9F]"
                    : "bg-white group-hover:bg-black"
                } w-4.5 h-4.5`}
              >
                <ArrowUp
                  className={`transition-all duration-500 mx-auto ${
                    isActiveLink("/sign-in")
                      ? "text-white"
                      : "text-black group-hover:text-white group-hover:rotate-90 rotate-45"
                  }`}
                />
              </div>
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button
              className={`leading-[42px] duration-700 group transition-all ${
                isActiveLink("/sign-up")
                  ? "bg-[#0A8A9F] text-white hover:bg-[#0A8A9F]/90"
                  : "hover:text-white text-[#2c2d32] bg-white hover:bg-[#0A8A9F]"
              }`}
            >
              Sign Up
              <div
                className={`center delay-200 rounded-full w-4.5 h-4.5 transition-all duration-500 ${
                  isActiveLink("/sign-up")
                    ? "bg-white"
                    : "bg-[#2c2d32] group-hover:bg-white"
                }`}
              >
                <ArrowUp
                  className={`delay-200 transition-all duration-500 mx-auto ${
                    isActiveLink("/sign-up")
                      ? "text-[#0A8A9F]"
                      : "text-primary group-hover:rotate-90 rotate-45 group-hover:text-[#0A8A9F]"
                  }`}
                />
              </div>
            </Button>
          </Link>
        </div>
        <Menu
          onClick={() => {
            toggleSideMenuOpen();
          }}
          className="text-white medium:hidden h-10 w-10 cursor-pointer hover:text-[#0A8A9F] transition-colors duration-300"
        />
      </div>
    </Animate>
  );
};

export default Header;
