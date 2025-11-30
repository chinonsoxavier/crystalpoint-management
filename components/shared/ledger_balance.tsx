"use client";
import useUserStore from "@/app/user/user_store";
import { WalletMinimal } from "lucide-react";

const LedgerBalance = () => {
const {showBalance,toggleShowBalance} =  useUserStore();
  return (
    <div className="w-full">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-accent-text mb-6 tracking-tight">
        My Wallet
      </h1>

      {/* Balance Card */}
      <div
        className="relative overflow-hidden rounded-xl bg-accent-foreground
                      border border-white/10 p-6 md:p-8 lg:p-10 
                      transition-all duration-500"
      >

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4.5 md:gap-8">
          {/* Left: Balance Section */}
          <div className="flex items-center gap-5">
            {/* Icon with glow effect */}
            <div className="icon-container relative">
              <div className="absolute inset-0 rounded-full scale-150 -z-10 animate-pulse" />
              <div className="bg-primary/20 backdrop-blur-sm p-4 rounded-2xl border border-primary/30">
                <WalletMinimal className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-accent-text/70 uppercase tracking-wider mb-1">
                Ledger Balance
              </p>

              {/* Balance with toggle */}
              <div className="flex items-center gap-3">
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-text tabular-nums">
                  {showBalance ? (
                    <span>$12,450.80</span>
                  ) : (
                    <span className="tracking-widest">••••••</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Account Holder */}
          <div className="text-right lg:text-left">
            <p className="text-xs md:text-sm font-medium text-accent-text/60 uppercase tracking-wider">
              Account Holder
            </p>
            <p className="text-xl md:text-2xl font-semibold text-accent-text mt-1">
              Chinonso
            </p>
          </div>
        </div>

    
      </div>
      
    </div>
  );
};

export default LedgerBalance;
