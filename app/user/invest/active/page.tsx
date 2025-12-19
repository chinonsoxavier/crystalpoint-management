"use client";

import LedgerBalance from "@/components/shared/ledger_balance";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import useInvestStore from "../_invest_store";
import Link from "next/link";
import { Package, ArrowRight } from "lucide-react";

const Page = () => {
  const { activeInvestment, fetchActiveInvestments } = useInvestStore();

  useEffect(() => {
    fetchActiveInvestments();
  }, [fetchActiveInvestments]);

  return (
    <div className="bg-accent p-4 md:p-6 text-white min-h-screen">
      <LedgerBalance />

      {/* Main Content */}
      <div className="mt-8">
        {/* Header */}
        <div className="text-center my-10 md:my-12 px-3">
          <h1 className="text-4xl md:text-5xl text-accent-text font-semibold">
            Active Investments
          </h1>
          <p className="text-accent-text/70 mt-3 text-lg">
            View and manage your currently running investment plans
          </p>
        </div>

        {/* Conditional Rendering */}
        {activeInvestment.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="bg-accent-foreground/50 rounded-full p-8 mb-8">
              <Package className="h-20 w-20 text-accent-text/50" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-accent-text mb-4">
              No Active Investments Yet
            </h2>

            <p className="text-xl text-accent-text/70 max-w-2xl mb-10">
              You haven`t activated any investment plans yet. Start growing your
              wealth today by choosing a plan that suits you.
            </p>

            <Link href="/user/invest/list">
              <Button size="lg" className="px-8 py-6 text-lg font-semibold">
                Browse Investment Plans
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
        ) : (
          /* Active Investments Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-5">
            {activeInvestment.map((plan) => (
              <div
                key={plan._id}
                className="group p-4 min-h-[450px] md:p-6 relative overflow-hidden rounded-2xl
                           transition-all duration-500 bg-accent-foreground hover:shadow-2xl 
                           border border-accent-border hover:border-primary"
              >
                <div className="relative z-10 flex flex-col justify-between h-full gap-6">
                  {/* Plan Name */}
                  <div className="text-center md:space-y-4 space-y-2">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-accent-text">
                      {plan.name}
                    </h3>
                    <p className="text-sm md:text-base text-accent-text leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Investment Range */}
                  <div className="border-b border-gray-800/50 pb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-accent-text text-sm font-medium">
                        Max Investment
                      </span>
                      <span className="text-xl font-bold text-white">
                        ${plan.maxAmount?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Duration + ROI */}
                  <div className="bg-gradient-to-r from-emerald-600/10 to-blue-600/10 rounded-2xl p-4 md:p-6 text-center border border-emerald-500/20">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-accent-text text-xs uppercase tracking-wider">
                          Duration
                        </p>
                        <p className="md:text-3xl text-2xl font-extrabold text-emerald-400 mt-2">
                          {plan.durationDays} days
                        </p>
                      </div>
                      <div>
                        <p className="text-accent-text text-xs uppercase tracking-wider">
                          Total ROI
                        </p>
                        <p className="md:text-3xl text-2xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                          {plan.roiPercentage}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Select Button */}
                  <Link
                    href={`/user/invest/select-plan/${plan.name
                      .split(" ")[0]
                      .toLowerCase()}/${plan._id}`}
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full">
                      View {plan.name.split(" ").slice(1).join(" ")} Details
                      <svg
                        className="w-6 h-6 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Button>
                  </Link>

                  {/* Trust Badge */}
                  <div className="flex items-center justify-center gap-2 text-xs text-accent-text pt-4 border-t border-gray-800/50">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      100% Capital Protection • Daily Profit • Instant
                      Withdrawals
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
