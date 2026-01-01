"use client";

import useDashboardStore from "@/app/user/(user)/_dashboard_store";
import useUserStore from "@/app/user/user_store";
import { useTranslate } from "@/hooks/use_translate";
import { formatCurrency } from "@/utility/format_currency";
import { useEffect } from "react";

export interface BalanceCardsProps {
  showValues: boolean;
}

export function BalanceCards({ showValues }: BalanceCardsProps) {
  const { profile } = useDashboardStore();
  const { user, loadUser } = useUserStore();
const {t} = useTranslate();
  useEffect(() => {
    loadUser();
  }, []);
  // console.log()
  const cardConfigs = [
    {
      label: t.admin.overview.balanceCards.totalDeposit,
      value: profile?.total_deposit,
      colorClass: "from-blue-500 to-blue-600",
    },
    {
      label: t.admin.overview.balanceCards.profitBalance,
      value: user?.balance.profit,
      colorClass: "from-yellow-500 to-yellow-600",
    },
    {
      label: t.admin.overview.balanceCards.totalWithdrawals,
      value: user?.balance.totalWithdrawn,
      colorClass: "bg-white",
    },
    {
      label: t.admin.overview.balanceCards.activeDeposits,
      value: user?.balance.activeDeposit,
      colorClass: "from-green-500 to-green-600",
    },
    {
      label:t.admin.overview.balanceCards.pendingWithdrawals,
      value: user?.balance.pendingWithdrawals,
      colorClass: "from-red-500 to-red-600",
    },
    {
      label:t.admin.overview.balanceCards.promotionalBalance,
      value: profile?.promotional_balance,
      colorClass: "from-orange-400 to-orange-500",
    },
  ];
  const maskValue = "•".repeat(4);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {cardConfigs.map((card, idx) => (
        <div
          key={idx}
          className={`bg-[#1fabe8] border rounded-2xl p-5 text-white relative overflow-hidden hover:shadow-xl transition-shadow`}
        >
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${card.colorClass} bg-linear-to-bl`}></div>
            <p className="text-sm font-semibold text-white">
              {card.label}
            </p>
          </div>
          <p className="text-3xl font-bold relative z-10">
            $ {showValues ? formatCurrency(card.value ?? 0) : maskValue}
          </p>
        </div>
      ))}
    </div>
  );
}
