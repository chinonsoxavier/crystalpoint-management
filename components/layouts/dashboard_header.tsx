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
import { Search } from "lucide-react";
// import { useTheme } from "next-themes";
import { useTheme } from "../theme_provider";

const DashboardHeader = () => {
  const {user}=  useUserStore();
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
        <div className="text-xs roboto text-">Logo</div>
        {sideMenuOpen && (
          <div className="text-2xl hidden large:block">Logo</div>
        )}
      </div>

      <div className="flex items-center justify-between w-full">
        <div
          onClick={() => toggleSideMenuOpen()}
          className="flex items-center justify-start gap-7"
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
            <div onClick={toggleTheme} className="rounded-full bg-accent cursor-pointer center h-11.5 w-11.5">
              {theme === "light" ? (
                <FontAwesomeIcon
                  icon={faMoon}
                  className="smedium:text-[22px] text-lg"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faSun}
                  className="smedium:text-[22px] text-lg"
                />
              )}
            </div>

            <div
              onClick={() => toggleShowBalance()}
              className="rounded-full bg-accent hidden md:flex cursor-pointer items-center justify-center h-11.5 w-11.5"
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
            <p className="font-medium hidden md:block">
              Hello,
              <span>
                {" "}
                <b>{user?.username}</b>
              </span>
            </p>
            <FontAwesomeIcon
              className="size-20 w-20 h-20 text-xl"
              icon={faUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
