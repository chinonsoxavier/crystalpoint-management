import useUserStore from "@/app/user/user_store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBank,
  faChevronDown,
  faDashboard,
  faDonate,
  faDoorOpen,
  faGear,
  faGift,
  faHeadphones,
  faMedal,
  faMoneyBill1,
  faMoneyCheckDollar,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { PromoModal } from "../user/user_dashboard/promo_modal";

interface IDashboardSidemenu {
  totalDeposit: number;
}

const DashboardSidemenu = ({ totalDeposit }: IDashboardSidemenu) => {
  const router = useRouter();
  const { sideMenuOpen, closeSideMenu, logout } = useUserStore();
  const pathname = usePathname(); // ← Track current route

  const handleLogout = async () => {
    // logout returns void (no result to check)
    const res = await logout();
    if (res === "success") {
      router.push("/");
    }
  };
  // Close menu whenever route changes
  useEffect(() => {
    if (sideMenuOpen && window.innerWidth <= 768) {
      closeSideMenu(); // This sets sideMenuOpen = false
    }
  }, [pathname]);

  const [promoModalOpen, setPromodalModalOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState("");
  const isTier2Available = totalDeposit >= 1000;
  const isTier3Available = totalDeposit >= 4000;
  const isMembershipAvailable = totalDeposit >= 0;

  const tier2Features = [
    "💰 Large Transaction Capacity",
    "🔒 Fast Security Attention",
    "⚡ Priority Account Support",
    "📊 Advanced Portfolio Tracking",
    "🌐 Access to Premium Investment Opportunities",
    "🧾 Flexible Reinvestment Options",
    "🎖 Investor Loyalty Rewards",
    "🕒 Accelerated Profit Processing",
    "📈 High-Yield Return Privileges",
  ];

  const tier3Features = ["Strong Security Track Record"];

  const transactionsLinks = [
    {
      label: "Deposit Transactions",
      link: "/user/transactions/deposit-transactions",
    },
    {
      label: "Investment Logs",
      link: "/user/transactions/investment-logs",
    },
    {
      label: "Withdrawal Logs",
      link: "/user/transactions/withdrawal-logs",
    },
  ];

  const membershipCards = [
    { name: "Gold Membership Card", color: "bg-yellow-400", cardType: "gold" },
    {
      name: "Silver Membership Insurance Card",
      color: "bg-gray-400",
      cardType: "silver",
    },
    {
      name: "Premium Membership Token Security Insurance Card",
      color: "bg-blue-400",
      cardType: "premium",
    },
  ];
  const navItems = [
    { label: "Dashboard", icon: faDashboard, link: "/user" },
    { label: "Deposit", icon: faWallet, link: "/user/deposit" },
    { label: "Invest", icon: faDonate, link: "/user/invest" },
    { label: "Withdraw", icon: faMoneyCheckDollar, link: "/user/withdraw" },
    {
      label: "Membership",
      icon: faBank,
      showDropDown: true,
      eventHandler: () => {
        if (isMembershipAvailable) {
          setDropDownOpen(dropDownOpen === "Membership" ? "" : "Membership");
          return;
        }
      },
      dropDown: (
        <div className="">
          {isMembershipAvailable && sideMenuOpen && (
            <div className="pl-8 space-y-2 py-2">
              {membershipCards.map((card) => {
                            const isActive = pathname === `/user/membership/${card.cardType}`;

                return (
                  <Link
                    key={card.name}
                    href={
                      isMembershipAvailable
                        ? `/user/membership/${card.cardType}`
                        : "/user/deposit"
                    }
                  >
                    <button
                      className={`${
                        isActive
                          ? "text-primary"
                          : "text-accent-text hover:text-primary"
                      } w-full flex gap-2 items-start text-left text-sm px-4 py-2 rounded cursor-pointer transition-colors`}
                    >
                      <div
                        className={`${card.color} mt-1 rounded-full min-w-3.5 min-h-3.5 h-2.5 w-3.5`}
                      ></div>
                      {card.name}
                    </button>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      ),
    },
    {
      label: "Transactions",
      icon: faMoneyBill1,
      showDropDown: true,
      eventHandler: () => {
        setDropDownOpen(dropDownOpen === "Transactions" ? "" : "Transactions");
      },
      dropDown: (
        <div className="pl-8 space-y-2 py-2">
          {transactionsLinks.map((link) => {
            const isActive = pathname === link.link;
            return (
              <Link key={link.label} href={`${link.link}`}>
                <button
                  className={`${
                    isActive
                      ? "text-primary"
                      : "text-accent-text hover:text-primary"
                  } w-full flex gap-2 items-start text-left text-sm px-4 py-2 rounded cursor-pointer  transition-colors`}
                >
                  <div
                    className={`mt-1 rounded-full min-w-3.5 min-h-3.5 h-2.5 w-3.5`}
                  ></div>
                  {link.label}
                </button>
              </Link>
            );
          })}
        </div>
      ),
    },
    {
      label: "Tier2",
      icon: faMedal,
      showDropDown: true,
      eventHandler: () => {
        setDropDownOpen(dropDownOpen === "Tier2" ? "" : "Tier2");
      },
      dropDown: (
        <div className="overflow-hidden transition-all duration-300 ease-in-out">
          {sideMenuOpen && isTier2Available ? (
            <div className="relative pl-8 py-3">
              {/* Left accent border with linear */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-blue-400 to-blue-600 rounded-r-full"></div>

              {/* Feature list with better styling */}
              <div className="space-y-2 ml-2">
                <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
                  Tier 2 Features
                </h4>
                {tier2Features.map((feature, index) => (
                  <div
                    key={feature}
                    className="flex items-start gap-2 px-3 py-2 rounded-md bg-sidebar-accent/20 hover:bg-sidebar-accent/30 transition-colors"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="w-4 h-4 hidden rounded-full bg-green-500/20 fex items-center justify-center">
                      <svg
                        className="w-2.5 h-2.5 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-xs dark:text-white text-black">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="pl-8 py-3">
              <div className="bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-3 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-4 h-4 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h4 className="text-xs font-semibold text-blue-400">
                    Unlock Tier 2
                  </h4>
                </div>
                <p className="text-xs text-gray-300 mb-3">
                  Get access to advanced features and tools
                </p>
                <Link href="/user/deposit">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full min-w-0 bg-blue-500 hover:bg-blue-600 text-white border-blue-500/30 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    Upgrade to Tier 2
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      label: "Tier3",
      icon: faMedal,
      showDropDown: true,
      eventHandler: () => {
        setDropDownOpen(dropDownOpen === "Tier3" ? "" : "Tier3");
      },
      dropDown: (
        <div className="overflow-hidden transition-all duration-300 ease-in-out">
          {sideMenuOpen && isTier3Available ? (
            <div className="relative pl-8 py-3">
              {/* Left accent border with linear */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-purple-400 to-purple-600 rounded-r-full"></div>

              {/* Feature list with better styling */}
              <div className="space-y-2 ml-2">
                <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
                  Tier 3 Features
                </h4>
                {tier3Features.map((feature, index) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-sidebar-accent/20 hover:bg-sidebar-accent/30 transition-colors"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <svg
                        className="w-2.5 h-2.5 text-purple-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-xs dark:text-white text-black">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="pl-8 py-3">
              <div className="bg-linear-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-3 border border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-4 h-4 text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <h4 className="text-xs font-semibold text-purple-400">
                    Unlock Premium Tier 3
                  </h4>
                </div>
                <p className="text-xs text-accent-text mb-3">
                  Get exclusive access to all premium features
                </p>
                <Link href="/user/deposit">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-purple-500/30 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/20"
                  >
                    Upgrade to Tier 3
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      ),
    },
    { label: "Settings", icon: faGear, link: "/user/settings" },
    {
      label: "Promotional Bonus",
      icon: faGift,
      eventHandler: () => setPromodalModalOpen(true),
    },
    { label: "Help & Support", icon: faHeadphones, link: "/user/support" },
    { label: "Logout", icon: faDoorOpen, eventHandler: handleLogout },
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
        className={`bg-accent-foreground hidden-foreground scrollbar_hidden overflow-y-auto overflow-x-clip h-[calc(100dvh-128px)] dark:shadow md:border border-none z-20 max-w-70 duration-500 ${
          sideMenuOpen
            ? "w-70 fixed md:relative left-0 border-r md:border-r-transparent"
            : "md:w-20 fixed md:relative w-70 -translate-x-full md:translate-x-0 border-none"
        } duration-300 flex flex-col`}
      >
        <nav className="flex-1 p-1 text-white space-y-">
          {navItems.map((item) => {
            const isActive = item.link && pathname === item.link;

            // This is the content that is shared between the Link and the Button
            const linkContent = (
              <>
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
                </div>

                {item.showDropDown && sideMenuOpen && (
                  <FontAwesomeIcon
                    className={`${
                      item.label === dropDownOpen && "rotate-180"
                    } duration-500`}
                    icon={faChevronDown}
                  />
                )}
              </>
            );

            return (
              <div key={item.label}>
                {item.link && !item.showDropDown ? (
                  // Render a Link for navigation items
                  <Link
                    href={item.link}
                    className={`w-full cursor-pointer flex items-center justify-between md:justify-between large:justify-start gap-3 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-transparent flex items-center justify-start w-full text-black dark:text-white"
                        : "text-accent-text hover:text-primary"
                    } ${!sideMenuOpen && "center"}`}
                  >
                    {linkContent}
                  </Link>
                ) : (
                  // Render a Button for action items (like dropdowns)
                  <button
                    onClick={item.eventHandler}
                    className={`w-full cursor-pointer flex items-center justify-between md:justify-between large:justify-start gap-3 px-4 py-2 rounded-lg transition-colors text-accent-text hover:text-primary ${
                      !sideMenuOpen && "center"
                    }`}
                  >
                    {linkContent}
                  </button>
                )}
                {item.label === dropDownOpen && item.dropDown}
              </div>
            );
          })}
        </nav>
        <PromoModal isOpen={promoModalOpen} onClose={setPromodalModalOpen} />
      </div>
    </div>
  );
};

export default DashboardSidemenu;
