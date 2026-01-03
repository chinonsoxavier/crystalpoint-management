// app/user/transactions/investment-logs/page.tsx
"use client";
import { useEffect } from "react";
import InvestMentLogs from "./investment_logs";
import useInvestStore from "../../invest/_invest_store";
import LedgerBalance from "@/components/shared/ledger_balance";
import { useTranslate } from "@/hooks/use_translate";

const Page = () => {
  const { fetchInvestHistory, investmentStats, fetchInvestStats } =
    useInvestStore();
  const { t } = useTranslate();

  useEffect(() => {
    fetchInvestHistory(1);
    fetchInvestStats();
  }, []);
  return (
    <div className="bg-accent space-y-4 md:space-y-6 md:p-6 p-4">
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
    </div>
  );
};

export default Page;
