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
    <div className="bg-accent p-4 md:p-6 text-[#4b556d]">
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
        <div className="grid grid-cols-1 w-full medium:grid-cols-2 lg:grid-cols-3 md:gap-6 sm:gap-4 gap-3">
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
                         transition-all duration-500 bg-gray-400 hover:shadow-2xl border border-slate-700/50 hover:border-primary backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative space-y-5 md:space-y-8 z-10 flex flex-col justify-between h-full">
                    {/* Plan Name */}
                    <div className="text-center">
                      <h3 className="text-xl smedium:text-2xl font-extrabold text-black">
                        {plan.name}
                      </h3>
                      <p className="text-sm smedium:text-base text-[#181f39] leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    {/* Plan Details */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <span className="text-slate-400 mt-0.5">•</span>
                        <div>
                          <span className="text-[#181f39]">Minimum:</span>
                          <span className="ml-2 font-semibold text-[#4b556d]">
                            {plan.minAmount
                              ? `$${plan.minAmount.toLocaleString()}`
                              : "Unlimited"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="text-slate-400 mt-0.5">•</span>
                        <div>
                          <span className="text-[#181f39]">
                            Maximum Amount:
                          </span>
                          <span className="ml-2 font-semibold text-[#4b556d]">
                            {plan.maxAmount
                              ? `$${plan.maxAmount.toLocaleString()}`
                              : "Unlimited"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-slate-400 mt-0.5">•</span>
                        <div>
                          <span className="text-[#181f39]">
                            Return of investment:
                          </span>
                          <span className="ml-2 font-semibold text-[#4b556d]">
                            {plan.roiPercentage ? `${plan.roiPercentage}%` : ""}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="text-slate-400 mt-0.5">•</span>
                        <div>
                          <span className="text-[#181f39]">Duration Days:</span>
                          <span className="ml-2 font-semibold text-[#4b556d]">
                            {plan.durationDays
                              ? `${plan.durationDays} days`
                              : ""}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-slate-400 mt-0.5">•</span>
                        <div>
                          <span className="text-[#181f39]">
                            Referral Bonus:
                          </span>
                          <span className="ml-2 font-semibold text-[#4b556d]">
                            {plan.referralBonus ? `${plan.referralBonus}%` : ""}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-slate-400 mt-0.5">•</span>
                        <div>
                          <span className="text-[#181f39]">Welcome Bonus:</span>
                          <span className="ml-2 font-semibold text-[#4b556d]">
                            {plan.welcomeBonus ? `${plan.welcomeBonus}%` : ""}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      {/* Invest Button */}
                      <Link href={`/user/deposit`} className="w-full">
                        <Button
                          className="w-full text-white"
                        >
                          Select {plan.name.split(" ")[1]} Package
                        </Button>
                      </Link>

                      {/* Trust Badge */}
                      <div className="flex items-center justify-center gap-2 text-xs text-[#181f39] pt-4 border-t border-slate-700/50">
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
