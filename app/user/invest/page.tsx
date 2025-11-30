"use client";

import LedgerBalance from "@/components/shared/ledger_balance";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PromoModal } from "@/components/user/user_dashboard/promo_modal";

const Page = () => {
  const [showPromoModal, setShowPromoModal] = useState(false);

  const investmentPlans = [
    {
      id: 1,
      name: "Beginners Package",
      description: "Perfect for new investors starting their journey",
      minInvestment: 100,
      maxInvestment: 2000,
      dailyInterest: "5.8%",
      totalROI: "40.6%",
      duration: "7 Days",
      referralCommission: "10%",
      risk: "Low",
    },
    {
      id: 2,
      name: "Extra Package",
      description: "Accelerated returns for growing portfolios",
      minInvestment: 550,
      maxInvestment: 10000,
      dailyInterest: "8%",
      totalROI: "48%",
      duration: "6 Days",
      referralCommission: "10%",
      risk: "Low",
    },
    {
      id: 3,
      name: "Super Package",
      description: "High-yield opportunity for serious investors",
      minInvestment: 1500,
      maxInvestment: 100000,
      dailyInterest: "10%",
      totalROI: "140%",
      duration: "14 Days",
      referralCommission: "10%",
      risk: "Medium",
    },
    {
      id: 4,
      name: "Monthly Package",
      description: "Maximum monthly returns with extended duration",
      minInvestment: 2100,
      maxInvestment: 1000000,
      dailyInterest: "10.3%",
      totalROI: "309%",
      duration: "30 Days",
      referralCommission: "10%",
      risk: "Medium",
    },
    {
      id: 5,
      name: "Family Package",
      description: "Long-term wealth building with capital protection",
      minInvestment: 1000,
      maxInvestment: 100000,
      dailyInterest: "4%",
      totalROI: "720%",
      duration: "180 Days",
      referralCommission: "10%",
      risk: "Low",
    },
  ];

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
        <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-8">
          {investmentPlans.map((plan) => (
            <div
              key={plan.id}
              className="group p-4 md:p-6 relative overflow-hidden rounded-2xl 
                         transition-all duration-500 bg-accent-foreground hover:shadow-2xl border border-accent-border hover:border-primary"
            >
              <div className="relative md:space-y-4 space-y-2">
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
                <div className=" border-b border-gray-800/50">
                  <div className="flex justify-between items-center">
                    <span className="text-accent-text text-sm font-medium">
                      Investment Range
                    </span>
                    <span className="text-xl font-bold text-white">
                      ${plan.maxInvestment.toLocaleString()}`
                    </span>
                  </div>
                </div>

                {/* Daily Profit + Total ROI */}
                <div className="bg-linear-to-r from-emerald-600/10 to-blue-600/10 rounded-2xl p-4 md:p-6 text-center border border-emerald-500/20">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-accent-text text-xs uppercase tracking-wider">
                        Daily Profit
                      </p>
                      <p className="md:text-3xl text-2xl font-extrabold text-emerald-400 mt-2">
                        {plan.dailyInterest}
                      </p>
                    </div>
                    <div>
                      <p className="text-accent-text text-xs uppercase tracking-wider">
                        Total ROI
                      </p>
                      <p className="md:text-3xl text-2xl font-extrabold bg-linear-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                        {plan.totalROI}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Duration & Referral */}
                <div className="grid grid-cols-2 gap-4 py-2 md:py-4">
                  <div className="bg-accent/50 rounded-xl p-2 md:p-4 text-center border border-gray-700/50">
                    <p className="text-accent-text font-semibold text-sm">
                      Duration
                    </p>
                    <p className="font-bold text-accent-text dark:text-white md:text-lg mt-1">
                      {plan.duration}
                    </p>
                  </div>
                  <div className="bg-accent/50 rounded-xl p-4 text-center border border-gray-700/50">
                    <p className="text-accent-text font-semibold text-sm">
                      Referral Bonus
                    </p>
                    <p className="font-bold bg-linear-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent md:text-lg mt-1">
                      {plan.referralCommission}
                    </p>
                  </div>
                </div>

                {/* Risk Level */}
                <div className="text-center">
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                      plan.risk === "Low"
                        ? "bg-emerald-400/10 text-emerald-400 border border-emerald-500/40"
                        : "bg-amber-400/10 text-amber-500 border border-amber-500/40"
                    }`}
                  >
                    {plan.risk} Risk
                  </span>
                </div>

                {/* Invest Button */}
                <Button
                  onClick={() => setShowPromoModal(true)}
                  className="w-full h-14 md:text-lg mt-2 md:mt-4 font-bold rounded-xl
                             "
                >
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
                    100% Capital Protection • Daily Profit • Instant Withdrawals
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Modal */}
      <PromoModal
        isOpen={showPromoModal}
        onClose={() => setShowPromoModal(false)}
      />
    </div>
  );
};

export default Page;
