"use client";
import useDepositStore from "../../deposit/_deposit_store";
import DepositLogs from "./deposit_logs";
import LedgerBalance from "@/components/shared/ledger_balance";
export type Transactions = {
  id: string;
  method: string;
  amount: number;
  transactionHarsh: string;
  status: "pending" | "processing" | "success" | "failed";
  walletAddress: string;
};


const Page = () => {
  const { approvedDeposits,pendingDeposits } = useDepositStore();
   const approvedDepositsTotal = approvedDeposits.reduce(
      (total, deposit) => total + deposit,
      0
    );

    const pendingDepositsTotal = pendingDeposits.reduce(
      (total, deposit) => total + deposit,
      0
    );


  return (
    <div className="bg-accent space-y-4 md:space-y-6 md:p-6 p-4" >  
    <LedgerBalance/>
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <div className="rounded-lg border bg-accent-foreground text-card-foreground shadow-sm p-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <p className="text-sm font-medium text-muted-foreground">
              Approved
            </p>
          </div>
          <p className="text-2xl font-bold">$ {approvedDepositsTotal}</p>
        </div>
        <div className="rounded-lg border bg-accent-foreground text-card-foreground shadow-sm p-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <p className="text-sm font-medium text-muted-foreground">Pending</p>
          </div>
          <p className="text-2xl font-bold">$ {pendingDepositsTotal}</p>
        </div>
      </div>
      <DepositLogs  />
    </div>
  );
};

export default Page;
