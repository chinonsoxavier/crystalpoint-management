"use client";

import useDashboardStore from "@/app/user/(user)/_dashboard_store";
import { formatCurrency } from "@/utility/format_currency";

export interface BalanceCardsProps {
  showValues: boolean;
}

export function BalanceCards({ showValues }: BalanceCardsProps) {
  const { profile } = useDashboardStore();
  const cardConfigs = [
    {
      label: "TOTAL DEPOSIT",
      value: profile?.total_deposit,
      colorClass: "from-blue-500 to-blue-600",
    },
    {
      label: "PROFIT BALANCE",
      value: profile?.profit_balance,
      colorClass: "from-purple-500 to-purple-600",
    },
    {
      label: "TOTAL WITHDRAWALS",
      value: profile?.total_withdrawals,
      colorClass: "from-yellow-500 to-yellow-600",
    },
    {
      label: "ACTIVE DEPOSIT",
      value: profile?.active_deposit,
      colorClass: "from-green-500 to-green-600",
    },
    {
      label: "PENDING WITHDRAWAL",
      value: profile?.pending_withdrawals,
      colorClass: "from-red-500 to-red-600",
    },
    {
      label: "PROMOTIONAL BALANCE",
      value: profile?.promotional_balance,
      colorClass: "from-gray-400 to-gray-500",
    },
  ];
  const maskValue = "$" + "•".repeat(4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cardConfigs.map((card, idx) => (
        <div
          key={idx}
          className={`bg-linear-to-br rounded-2xl p-8 text-white relative overflow-hidden hover:shadow-xl transition-shadow`}
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
          <p className="text-sm font-semibold text-white/80 mb-3 relative z-10">
            {card.label}
          </p>
          <p className="text-4xl font-bold relative z-10">
            {showValues ? formatCurrency(card.value ?? 0) : maskValue}
          </p>
        </div>
      ))}
    </div>
  );
}
