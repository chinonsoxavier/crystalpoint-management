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
  faCreditCard,
  faTrophy,
  faHistory,
  faEye,
  faChartLine,
  faListAlt,
  faPlayCircle,
  faClock,
  faArrowUpRightDots,
  faArrowDown,
  faFileInvoiceDollar,
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
  const pathname = usePathname();

  const handleLogout = async () => {
    const res = await logout();
    if (res === "success") {
      router.push("/");
    }
  };

  useEffect(() => {
    if (sideMenuOpen && window.innerWidth <= 768) {
      closeSideMenu();
    }
  }, [pathname]);

  const [promoModalOpen, setPromoModalOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState<string>("");
  const [cardsDropdownOpen, setCardsDropdownOpen] = useState(false);

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
      icon: faArrowDown,
    },
    {
      label: "Investment Logs",
      link: "/user/transactions/investment-logs",
      icon: faFileInvoiceDollar,
    },
    {
      label: "Withdrawal Logs",
      link: "/user/transactions/withdrawal-logs",
      icon: faArrowUpRightDots,
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

  const investmentLinks = [
    { name: "Stats", link: "/user/invest/stats", icon: faChartLine },
    { name: "Investments", link: "/user/invest/list", icon: faListAlt },
    {
      name: "Active Investments",
      link: "/user/invest/active",
      icon: faPlayCircle,
    },
    { name: "History", link: "/user/transactions/investment-logs", icon: faClock },
  ];

  const navItems = [
    { label: "Dashboard", icon: faDashboard, link: "/user" },
    { label: "Deposit", icon: faWallet, link: "/user/deposit" },
    { label: "Withdraw", icon: faMoneyCheckDollar, link: "/user/withdraw" },
    {
      label: "Invest",
      icon: faDonate,
      showDropDown: true,
      eventHandler: () =>
        setDropDownOpen(dropDownOpen === "Invest" ? "" : "Invest"),
      dropDown: (
        <div className="pl-8 space-y-2 py-2">
          {investmentLinks.map((link) => {
            const isActive = pathname === link.link;
            return (
              <Link key={link.name} href={link.link}>
                <button
                  className={`w-full flex gap-2 items-center text-left text-sm px-4 py-2 rounded transition-colors ${
                    isActive
                      ? "text-[#0A8A9F]"
                      : "text-accent-text hover:text-[#0A8A9F]"
                  }`}
                >
                  <FontAwesomeIcon icon={link.icon!} className="text-xs" />
                  {link.name}
                </button>
              </Link>
            );
          })}
        </div>
      ),
    },
    {
      label: "Membership",
      icon: faBank,
      showDropDown: true,
      eventHandler: () =>
        setDropDownOpen(dropDownOpen === "Membership" ? "" : "Membership"),
      dropDown: isMembershipAvailable && (
        <div className="pl-8 space-y-2 py-2">
          <Link href="/user/membership/overview">
            <button
              className={`w-full flex gap-2 items-center text-left text-sm px-4 py-2 rounded transition-colors ${
                pathname === "/user/membership/overview"
                  ? "text-[#0A8A9F]"
                  : "text-accent-text hover:text-[#0A8A9F]"
              }`}
            >
              <FontAwesomeIcon icon={faEye} className="text-xs" />
              Overview
            </button>
          </Link>

          <div>
            <button
              onClick={() => setCardsDropdownOpen(!cardsDropdownOpen)}
              className="w-full flex items-center justify-between text-left text-sm px-4 py-2 rounded transition-colors text-accent-text hover:text-[#0A8A9F]"
            >
              <div className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faCreditCard} className="text-xs" />
                Cards
              </div>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`text-xs transition-transform ${
                  cardsDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {cardsDropdownOpen && (
              <div className="pl-6 space-y-1 mt-1">
                {membershipCards.map((card) => {
                  const isActive =
                    pathname === `/user/membership/cards/${card.cardType}`;
                  return (
                    <Link
                      key={card.cardType}
                      href={`/user/membership/cards/${card.cardType}`}
                    >
                      <button
                        className={`w-full flex gap-2 items-center text-left text-xs px-4 py-1.5 rounded transition-colors ${
                          isActive
                            ? "text-[#0A8A9F]"
                            : "text-accent-text/80 hover:text-[#0A8A9F]"
                        }`}
                      >
                        <div className={`${card.color} rounded-full w-2 h-2`} />
                        {card.name}
                      </button>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link href="/user/membership/benefits">
            <button
              className={`w-full flex gap-2 items-center text-left text-sm px-4 py-2 rounded transition-colors ${
                pathname === "/user/membership/benefits"
                  ? "text-[#0A8A9F]"
                  : "text-accent-text hover:text-[#0A8A9F]"
              }`}
            >
              <FontAwesomeIcon icon={faTrophy} className="text-xs" />
              Benefits
            </button>
          </Link>

          <Link href="/user/membership/history">
            <button
              className={`w-full flex gap-2 items-center text-left text-sm px-4 py-2 rounded transition-colors ${
                pathname === "/user/membership/history"
                  ? "text-[#0A8A9F]"
                  : "text-accent-text hover:text-[#0A8A9F]"
              }`}
            >
              <FontAwesomeIcon icon={faHistory} className="text-xs" />
              History
            </button>
          </Link>
        </div>
      ),
    },
    {
      label: "Transactions",
      icon: faMoneyBill1,
      showDropDown: true,
      eventHandler: () =>
        setDropDownOpen(dropDownOpen === "Transactions" ? "" : "Transactions"),
      dropDown: (
        <div className="pl-8 space-y-2 py-2">
          {transactionsLinks.map((link) => {
            const isActive = pathname === link.link;
            return (
              <Link key={link.label} href={link.link}>
                <button
                  className={`w-full flex gap-2 items-center text-left text-sm px-4 py-2 rounded transition-colors ${
                    isActive
                      ? "text-[#0A8A9F]"
                      : "text-accent-text hover:text-[#0A8A9F]"
                  }`}
                >
                  <FontAwesomeIcon icon={link.icon!} className="text-xs" />
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
      eventHandler: () =>
        setDropDownOpen(dropDownOpen === "Tier2" ? "" : "Tier2"),
      dropDown: (
        <div className="overflow-hidden transition-all duration-300 ease-in-out">
          {sideMenuOpen && isTier2Available ? (
            <div className="relative pl-8 py-3">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-full"></div>
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
                    <span className="text-xs text-white">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="pl-8 py-3">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-3 border border-blue-500/30">
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
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
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
      eventHandler: () =>
        setDropDownOpen(dropDownOpen === "Tier3" ? "" : "Tier3"),
      dropDown: (
        <div className="overflow-hidden transition-all duration-300 ease-in-out">
          {sideMenuOpen && isTier3Available ? (
            <div className="relative pl-8 py-3">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-purple-600 rounded-r-full"></div>
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
                    <span className="text-xs text-white">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="pl-8 py-3">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-3 border border-purple-500/30">
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
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
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
    // {
    //   label: "Promotional Bonus",
    //   icon: faGift,
    //   eventHandler: () => setPromoModalOpen(true),
    // },
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
        onClick={closeSideMenu}
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
            const linkContent = (
              <>
                <div className="flex items-center gap-3 justify-start">
                  <div
                    className={`${
                      isActive ? "bg-primary" : ""
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
                      item.label === dropDownOpen ? "rotate-180" : ""
                    } duration-500`}
                    icon={faChevronDown}
                  />
                )}
              </>
            );

            return (
              <div key={item.label}>
                {item.link && !item.showDropDown ? (
                  <Link
                    href={item.link}
                    className={`w-full cursor-pointer flex items-center justify-between gap-3 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-transparent hover:text-black hover:dark:text-white text-black dark:text-white"
                        : "text-accent-text hover:text-[#0A8A9F]"
                    } ${!sideMenuOpen && "center"}`}
                  >
                    {linkContent}
                  </Link>
                ) : (
                  <button
                    onClick={item.eventHandler}
                    className={`w-full cursor-pointer flex items-center justify-between gap-3 px-4 py-2 rounded-lg transition-colors text-accent-text hover:text-[#0A8A9F] ${
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

        <PromoModal
          isOpen={promoModalOpen}
          onClose={() => setPromoModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default DashboardSidemenu;
