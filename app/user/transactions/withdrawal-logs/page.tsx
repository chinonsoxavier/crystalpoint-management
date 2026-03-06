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
    fetchWithdrawalsApproved,
    fetchWithdrawalsPending,
    approvedWithdrawals,
    pendingWithdrawals,
  } = useWithdrawStore();
  const { t } = useTranslate();
 const { user, authStatus } = useUserStore();

 useEffect(() => {
    fetchWithdrawalsApproved();
    fetchWithdrawalsPending();
    fetchWithdrawalsHistory();
  }, []);
  const approvedWithdrawalTotal = approvedWithdrawals.reduce(
    (total, withdrawal) => total + withdrawal.amount,
    0
  );

  const pendingWithdrawalTotal = pendingWithdrawals.reduce<number>(
    (total, withdrawal) => total + withdrawal.amount,
    0
  );


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
    </div>
  );
};

export default Page;
