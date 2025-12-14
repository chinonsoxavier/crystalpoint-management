import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faDonate,
  faDoorOpen,
  faGear,
  faHeadphones,
  faMoneyCheckDollar,
  faPerson,
  faShield,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import useAdminStore from "@/app/admin/_admin_store";


const AdminSidemenu = () => {
  const router = useRouter();
  const { sideMenuOpen, closeSideMenu } = useAdminStore();
  const pathname = usePathname(); // ← Track current route

  // Close menu whenever route changes
  useEffect(() => {
    if (sideMenuOpen && window.innerWidth <= 768) {
      closeSideMenu();
    }
  }, [pathname]);

  const navItems = [
    { label: "Dashboard", icon: faDashboard, link: "/admin" },
    { label: "Admin Management", icon: faShield, link: "/admin/management" },
    { label: "Users", icon: faPerson, link: "/admin/users" },
    { label: "Deposit", icon: faWallet, link: "/admin/deposits" },
    { label: "Withdraw", icon: faMoneyCheckDollar, link: "/admin/withdraw" },
    { label: "Help & Support", icon: faHeadphones, link: "/admin/support" },
    { label: "Logout", icon: faDoorOpen },
  ];

  return (
    <div className="relative z-20">
      <div
        className={`${
          sideMenuOpen
            ? "w-dvw h-dvh md:w-0 md:bg-transparent bg-[rgba(0,0,0,0.6)]"
            : "w-0 h-0"
        } absolute inset-0`}
        onClick={() => {
          closeSideMenu();
        }}
      />
      <div
        className={`bg-accent-foreground hidden-foreground scrollbar_hidden overflow-y-auto overflow-x-clip h-[calc(100dvh-80px)] dark:shadow md:border border-none z-20 max-w-70 duration-500 ${
          sideMenuOpen
            ? "w-70 fixed md:relative left-0 border-r md:border-r-transparent"
            : "md:w-20 fixed md:relative w-70 -translate-x-full md:translate-x-0 border-none"
        } duration-300 flex flex-col`}
      >
        <nav className="flex-1 p-1 text-white space-y-">
          {navItems.map((item) => {
            const isActive = item.link && pathname === item.link;
            return (
              <div key={item.label}>
                <Link
                  href={item.link || "/admin"}
                  className={`w-full cursor-pointer flex items-center justify-between md:justify-between large:justify-start gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-transparent flex items-center justify-start w-full text-black dark:text-white"
                      : "text-accent-text hover:text-[#0A8A9F]"
                  } ${!sideMenuOpen && "center"}`}
                >
                  <div className="flex items-center gap-3 justify-start">
                    <div
                      className={`${
                        isActive && "bg-primary"
                      } center rounded-full min-w-10 h-10`}
                    >
                      <FontAwesomeIcon icon={item.icon} />
                    </div>
                    <span
                      className={`${
                        sideMenuOpen ? "flex" : "flex md:hidden"
                      } text-[15px] whitespace-nowrap`}
                    >
                      {item.label}
                    </span>
                  </div>{" "}
                </Link>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default AdminSidemenu;
