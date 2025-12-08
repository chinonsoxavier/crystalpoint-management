"use client";
import { useEffect } from "react";
import InvestMentLogs from "./investment_logs";
import useInvestStore from "../../invest/_invest_store";
import LedgerBalance from "@/components/shared/ledger_balance";


const Page = () => {
  const { fetchInvestHistory, investHistory,activeInvestment,completedInvestment } = useInvestStore();
  const completedInvestmentTotal = completedInvestment.reduce(
    (total, withdrawal) => total + withdrawal,
    0
  );

  const activeInvestmentTotal = activeInvestment.reduce(
    (total, withdrawal) => total + withdrawal,
    0
  );

  useEffect(() => {
    fetchInvestHistory(1);
  }, []);
  return(
       <div className="bg-accent space-y-4 md:space-y-6 md:p-6 p-4" >  
    <LedgerBalance/>
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <div className="rounded-lg border bg-accent-foreground text-card-foreground shadow-sm p-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <p className="text-sm font-medium text-muted-foreground">
              Completed
            </p>
          </div>
          <p className="text-2xl font-bold">$ {completedInvestmentTotal}</p>
        </div>
        <div className="rounded-lg border bg-accent-foreground text-card-foreground shadow-sm p-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <p className="text-sm font-medium text-muted-foreground">Active</p>
          </div>
          <p className="text-2xl font-bold">$ ${activeInvestmentTotal}</p>
        </div>
      </div>
    <InvestMentLogs />
    </div>
  );
};

export default Page;
