"use client";

import LedgerBalance from "@/components/shared/ledger_balance";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import useInvestStore from "./_invest_store";
import Link from "next/link";

const Page = () => {
  const { fetchInvestPlans, investPlans, isFetchingInvestPlans } =
    useInvestStore();

  useEffect(() => {
    fetchInvestPlans();
  }, []);

  return (
    <div className="bg-accent p-4 md:p-6 text-white">
      <LedgerBalance />

      {/* Main Content */}
      <div className="">
        {/* Header */}
        <div className="text-center my-15 md:my-7 px-3">
          <h1 className="text-4xl md:text-5xl text-accent-text font-semibold">
            Our Investment Plans
          </h1>
        </div>

        {/* Investment Plans Grid */}
        <div className="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-3 md:gap-8 sm:gap-5 gap-3">
          {isFetchingInvestPlans ? (
            <div className="col-span-3 flex justify-center items-center">
              <p className="text-accent-text text-lg">Loading plans...</p>
            </div>
          ) : (
            <>
              {investPlans.map((plan, index) => (
                <div
                  key={index}
                  className="group p-4 smedium:p-6 relative overflow-hidden rounded-2xl 
                         transition-all duration-500 bg-accent-foreground hover:shadow-2xl border border-accent-border hover:border-primary"
                >
                  <div className="relative space-y-5 md:space-y-8 z-10 flex flex-col justify-between h-full">
                    {/* Plan Name */}
                    <div className="text-center">
                      <h3 className="text-2xl smedium:text-3xl font-extrabold text-accent-text">
                        {plan.name}
                      </h3>
                      <p className="text-sm smedium:text-base text-accent-text leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    <div className="">
                      {/* Invest Button */}
                      <Link
                        href={`/user/deposit`}
                        className="w-full"
                      >
                        <Button variant="outline" className="w-full">
                          Select {plan.name.split(" ")[1]} Package
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
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
