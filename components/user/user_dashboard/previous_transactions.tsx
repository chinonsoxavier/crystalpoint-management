"use client";

import DepositLogs from "@/app/user/transactions/deposit-transactions/deposit_logs";
import InvestMentLogs from "@/app/user/transactions/investment-logs/investment_logs";
import WithdrawalsTable from "@/app/user/transactions/withdrawal-logs/withdrawal_logs";
import { useState } from "react";

const PreviousTransactions = () => {
  const [activeTab, setActiveTab] = useState<
    "deposit" | "withdrawals" | "investments"
  >("deposit");

  return (
    <div className="flex flex-col">
      <div className="my-7 md:p-6 p-4 flex-wrap gap-7 bg-[#1e2746] flex items-center justify-between rounded-xl py-8 px-5">
        <p className="text-xl">Previous Transactions</p>

        <div className="center">
          <button
            className={`${
              activeTab === "deposit"
                ? "bg-primary text-white"
                : "text-[#7e7e7e]"
            }  py-1 px-3 text-sm rounded-full`}
            onClick={() => setActiveTab("deposit")}
          >
            Deposit
          </button>

          <button
            className={`${
              activeTab === "investments"
                ? "bg-primary text-white"
                : "text-[#7e7e7e]"
            }  py-1 px-3 text-sm rounded-full`}
            onClick={() => setActiveTab("investments")}
          >
            Investments
          </button>

          <button
            className={`${
              activeTab === "withdrawals"
                ? "bg-primary text-white"
                : "text-[#7e7e7e]"
            }  py-1 px-3 text-sm rounded-full`}
            onClick={() => setActiveTab("withdrawals")}
          >
            Withdrawals
          </button>
        </div>
      </div>
      <div>
        {activeTab === "deposit" ? (
          <DepositLogs />
        ) : activeTab === "withdrawals" ? (
          <WithdrawalsTable />
        ) : (
          <InvestMentLogs />
        )}
      </div>
    </div>
  );
};

export default PreviousTransactions;
