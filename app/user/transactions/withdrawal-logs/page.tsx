// app/user/transactions/withdrawal-logs/page.tsx
"use client";
import WithdrawalsTable from "./withdrawal_logs";
import LedgerBalance from "@/components/shared/ledger_balance";
import useWithdrawStore from "../../withdraw/_withdraw_store";
import { useEffect } from "react";
import { useTranslate } from "@/hooks/use_translate";
import useUserStore from "../../user_store";
import DeActivatedMessage from "@/components/shared/deactivated_message";

const Page = () => {
  const {
    fetchWithdrawalsHistory,
    withdrawalHistory,
    approvedWithdrawals,
    pendingWithdrawals,
  } = useWithdrawStore();
  const { t } = useTranslate();
  const { user } = useUserStore();
  const approvedWithdrawalTotal = approvedWithdrawals.reduce(
    (total, withdrawal) => total + withdrawal,
    0
  );

  const pendingWithdrawalTotal = pendingWithdrawals.reduce<number>(
    (total, withdrawal) => total + withdrawal.amount,
    0
  );
  useEffect(() => {
    fetchWithdrawalsHistory();
  }, []);

  return (
    <div className="bg-accent h-full space-y-4 md:space-y-6 md:p-6 p-4">
      {user && !user?.isActive ? (
        <DeActivatedMessage />
      ) : (
        <>
          <LedgerBalance />
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <div className="rounded-lg border bg-accent-foreground text-card-foreground shadow-sm p-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t.admin.transactions.approved}
                </p>
              </div>
              <p className="text-2xl font-bold">$ {approvedWithdrawalTotal}</p>
            </div>
            <div className="rounded-lg border bg-accent-foreground text-card-foreground shadow-sm p-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t.admin.transactions.pending}
                </p>
              </div>
              <p className="text-2xl font-bold">$ {pendingWithdrawalTotal}</p>
            </div>
          </div>
          <WithdrawalsTable />
        </>
      )}
    </div>
  );
};

export default Page;
