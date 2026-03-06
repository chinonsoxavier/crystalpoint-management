// app/user/transactions/investment-logs/page.tsx
"use client";
import { useEffect } from "react";
import InvestMentLogs from "./investment_logs";
import useInvestStore from "../../invest/_invest_store";
import LedgerBalance from "@/components/shared/ledger_balance";
import { useTranslate } from "@/hooks/use_translate";
import useUserStore from "../../user_store";
import DeActivatedMessage from "@/components/shared/deactivated_message";

const Page = () => {
  const { fetchInvestHistory, investmentStats, fetchInvestStats } =
    useInvestStore();
  const { t } = useTranslate();
 const { user, authStatus } = useUserStore();
 
  useEffect(() => {
    fetchInvestHistory(1);
    fetchInvestStats();
  }, []);

  // Handle loading states
  if (authStatus === "checking" || authStatus === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[calc(100dvh-128px)] w-full">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Handle inactive account
  if (authStatus === "inactive" || user?.isActive === false) {
    return (
      <div className="overflow-y-auto bg-accent md:p-6 p-4 max-h-[calc(100dvh-128px)] w-full h-full text-white">
        <DeActivatedMessage />
      </div>
    );
  }

  return (
    <div className="bg-accent h-full space-y-4 md:space-y-6 md:p-6 p-4">

        <>
          <LedgerBalance />
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <div className="rounded-lg border bg-accent-foreground text-card-foreground shadow-sm p-6">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {t.admin.transactions.totalInvestments}
                </p>
              </div>
              <p className="text-2xl font-bold">
                $ {investmentStats.totalInvested ?? 0}
              </p>
            </div>
            <div className="rounded-lg border bg-accent-foreground text-card-foreground shadow-sm p-6">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {t.admin.transactions.totalProfit}
                </p>
              </div>
              <p className="text-2xl font-bold">
                $ {investmentStats.totalProfit ?? 0}
              </p>
            </div>
            <div className="rounded-lg border bg-accent-foreground text-card-foreground shadow-sm p-6">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {t.admin.transactions.completedInvestments}
                </p>
              </div>
              <p className="text-2xl font-bold">
                {investmentStats.completedCount ?? 0}
              </p>
            </div>
            <div className="rounded-lg border bg-accent-foreground text-card-foreground shadow-sm p-6">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {t.admin.transactions.activeInvestments}
                </p>
              </div>
              <p className="text-2xl font-bold">
                {investmentStats.activeCount ?? 0}
              </p>
            </div>
          </div>
          <InvestMentLogs />
        </>
    </div>
  );
};

export default Page;
