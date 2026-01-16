// app/user/transactions/deposit-transactions/page.tsx
"use client";
import { useEffect, useState } from "react";
import useDepositStore from "../../deposit/_deposit_store";
import DepositLogs from "./deposit_logs";
import LedgerBalance from "@/components/shared/ledger_balance";
import { useTranslate } from "@/hooks/use_translate";
import useUserStore from "../../user_store";
import DeActivatedMessage from "@/components/shared/deactivated_message";

export type Transactions = {
  _id: string;
  method: string;
  amount: number;
  transactionHarsh: string;
  status: "awaiting_payment" | "pending" | "confirmed" | "failed" | "cancelled";
  walletAddress: string;
};

const Page = () => {
  const { depositHistory } = useDepositStore();
  const [pendingDepositsTotal, setPendingDepositsTotal] = useState(0);
  const [approvedDepositsTotal, setApprovedDepositsTotal] = useState(0);
  const { t } = useTranslate();
  const { user } = useUserStore();
  useEffect(() => {

    setApprovedDepositsTotal(
      depositHistory
        .filter((w) => w.status === "confirmed")
        .reduce((total, w) => total + w.amount, 0)
    );

      setPendingDepositsTotal(
        depositHistory
          .filter((w) => w.status === "pending")
          .reduce((total, w) => total + w.amount, 0)
      );

;


  }, []);

  return (
    <div className="bg-accent h-full space-y-4 md:space-y-6 md:p-6 p-4">
      {!user?.isActive ? (
        <DeActivatedMessage />
      ) : (
        <>
          <LedgerBalance />
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <div className="rounded-lg border bg-accent-foreground text-card-foreground shadow-sm p-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t.admin.transactions.confirmed}
                </p>
              </div>
              <p className="text-2xl font-bold">$ {approvedDepositsTotal}</p>
            </div>
            <div className="rounded-lg border bg-accent-foreground text-card-foreground shadow-sm p-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t.admin.transactions.pending}
                </p>
              </div>
              <p className="text-2xl font-bold">$ {pendingDepositsTotal}</p>
            </div>
          </div>
          <DepositLogs />
        </>
      )}
    </div>
  );
};

export default Page;
