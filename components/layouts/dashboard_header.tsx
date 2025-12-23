"use client";
import useUserStore from "@/app/user/user_store";
import {
  faArrowRight,
  faEye,
  faEyeSlash,
  faMoon,
  faSun,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Gem, Search } from "lucide-react";
// import { useTheme } from "next-themes";
import { useTheme } from "../theme_provider";
import Link from "next/link";

const DashboardHeader = () => {
  const { user } = useUserStore();
  const { theme, toggleTheme } = useTheme();

  const { showBalance, toggleShowBalance, toggleSideMenuOpen, sideMenuOpen } =
    useUserStore();

  return (
    <div
      className={`bg-accent-foreground roboto text-accent-text w-full h-20 flex items-center justify-between md:px-6 px-4`}
    >
      <div
        className={`flex items-center max-w-20 large:max-w-70 duration-500 md:pr-6 pr-4 gap-5 ${
          sideMenuOpen ? "w-70 justify-start" : "w-20 justify-center"
        } transition-opacity duration-300`}
      >
        {/* <div className="roboto">   <Gem
                      className={`w-7 h-7 transition-colors duration-300 text-[#0A8A9F]"
                      }`}
                    /></div> */}
        <div className="flex relative z-10 bg-accent-foreground items-center gap-3">
          <div className="relative">
            <Gem
              className={`w-8 h-8 transition-colors duration-300 text-[#0A8A9F]`}
            />
            <div className="absolute inset-0 bg-[#0A8A9F]/20 rounded-full blur-sm group-hover:bg-[#0A8A9F]/30 transition-all duration-300"></div>
          </div>
          <div
            className={`md:flex flex-col hidden ${
              !sideMenuOpen ? "w-0" : "w-full"
            } overflow-hidden`}
          >
            <p
              className={`text-[15px] font-bold transition-all duration-500 text-[#0A8A9F]"
                          
                        }`}
            >
              CristalPoint
            </p>
            <p className="text-[10px] text-gray-400 font-medium tracking-widest whitespace-nowrap group-hover:text-gray-300 transition-colors duration-300">
              INVESTMENT MANAGEMENT
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <div
          onClick={() => toggleSideMenuOpen()}
          className="flex z-0 relative items-center justify-start gap-7"
        >
          {sideMenuOpen ? (
            <div className="space-y-1.5 group cursor-pointer">
              <div className="bg-[#b3b3b3] w-6.5 h-[3px] rounded-[0.1875rem]"></div>
              <div className="bg-[#b3b3b3] w-6.5 h-[3px] rounded-[0.1875rem]"></div>
              <div className="bg-[#b3b3b3] w-3.5 h-[3px] rounded-[0.1875rem] duration-300 group-hover:w-6.5"></div>
            </div>
          ) : (
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-[rgba(30,170,231)] text-xl cursor-pointer"
            />
          )}

          <div className="flex-1 bg-accent hidden smedium:flex max-w-md items-center gap-2 rounded-lg px-4 py-2">
            <Search size={18} className="text-accent-text" />
            <input
              type="text"
              placeholder="Search here..."
              className="bg-accent outline-none text-accent-text placeholder:text-accent-text w-full"
            />
          </div>
        </div>

        <div className="flex smedium:gap-15 gap-5">
          <div className="flex items-center gap-3 smedium:gap-6 justify-evenly">
          

            <div
              onClick={() => toggleShowBalance()}
              className="rounded-full bg-accent flex cursor-pointer items-center justify-center h-11.5 w-11.5"
            >
              {showBalance ? (
                <FontAwesomeIcon
                  icon={faEye}
                  className="smedium:text-[22px] text-lg"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="smedium:text-[22px] text-lg"
                />
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <p className="font-medium text-lg hidden md:block">
              Hello,
              <span>
                {" "}
                <b className="text-xl">{user?.username}</b>
              </span>
            </p>
            <Link
              href="/user/settings"
              className="bg-accent rounded-full center h-11.5 w-11.5"
            >
              <FontAwesomeIcon
                className="smedium:text-[22px] text-lg"
                icon={faUser}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
