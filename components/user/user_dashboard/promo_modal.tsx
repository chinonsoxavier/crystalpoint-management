"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Sparkles, TrendingUp, Crown, Zap, Building2 } from "lucide-react";
import { useTranslate } from "@/hooks/use_translate";

interface PromoModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

const promoPlans = [
  {
    name: "Accessories",
    icon: <Sparkles className="w-7 h-7 md:w-10 md:h-10" />,
    color: "from-purple-500 to-pink-500",
    maxInvestment: 10000,
    dailyInterest: "2.5%",
    totalROI: "75%",
    duration: "30 days",
    referralCommission: "5%",
    risk: "low",
  },
  {
    name: "Oil and Gas",
    icon: <Zap className="w-7 h-7 md:w-10 md:h-10" />,
    color: "from-amber-500 to-orange-600",
    maxInvestment: 25000,
    dailyInterest: "3.2%",
    totalROI: "96%",
    duration: "30 days",
    referralCommission: "7%",
    risk: "medium",
  },
  {
    name: "Agriculture",
    icon: <TrendingUp className="w-7 h-7 md:w-10 md:h-10" />,
    color: "from-emerald-500 to-teal-600",
    maxInvestment: 15000,
    dailyInterest: "2.8%",
    totalROI: "84%",
    duration: "30 days",
    referralCommission: "6%",
    risk: "low",
  },
  {
    name: "Real Estate",
    icon: <Building2 className="w-7 h-7 md:w-10 md:h-10" />,
    color: "from-blue-600 to-indigo-600",
    maxInvestment: 50000,
    dailyInterest: "3.5%",
    totalROI: "105%",
    duration: "30 days",
    referralCommission: "8%",
    risk: "medium",
  },
  {
    name: "VIP",
    icon: <Crown className="w-7 h-7 md:w-10 md:h-10" />,
    color: "from-yellow-500 via-amber-500 to-orange-500",
    maxInvestment: 100000,
    dailyInterest: "4.5%",
    totalROI: "135%",
    duration: "30 days",
    referralCommission: "10%",
    risk: "low",
    featured: true,
  },
];

export function PromoModal({ isOpen, onClose }: PromoModalProps) {
  const { t } = useTranslate();

  // Helper function to translate plan name
  const translatePlanName = (planName: string) => {
    const key = planName.toLowerCase().replace(/\s+/g, "");
    return t.admin.promoModal.plans[key as keyof typeof t.admin.promoModal.plans]?.name || planName;
  };

  // Helper function to translate plan description
  const translatePlanDescription = (planName: string) => {
    const key = planName.toLowerCase().replace(/\s+/g, "");
    return t.admin.promoModal.plans[key as keyof typeof t.admin.promoModal.plans]?.description || "";
  };

  // Helper function to translate risk level
  const translateRisk = (risk: string) => {
    return (
      t.admin.promoModal.risk[risk as keyof typeof t.admin.promoModal.risk] ||
      risk
    );
  };

  // Helper function to interpolate the select plan text
  const getSelectPlanText = (planName: string) => {
    if (planName === "VIP") {
      return t.admin.promoModal.selectVIPPlan;
    }
    return t.admin.promoModal.selectPlan.replace(
      "{planName}",
      translatePlanName(planName)
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" max-h-[77vh] md:max-h-[90vh] max-w-[90vw] bg-accent scrollbar_hidden overflow-y-auto p-0">
        {/* Header */}
        <DialogHeader className="sticky top-0 z-10 bg-accent border-b border-accent-border px-8 py-3.5 md:py-6">
          <DialogTitle className="text-2xl md:text-4xl text-center font-semibold text-accent-text">
            {t.admin.promoModal.title}
          </DialogTitle>
          <p className="text-center text-gray-400 mt-3 text-sm md:text-lg">
            {t.admin.promoModal.subtitle}
          </p>
        </DialogHeader>

        {/* Grid */}
        <div className="md:p-8 p-4.5">
          <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-2 gap-8">
            {promoPlans.map((plan) => (
              <div
                key={plan.name}
                className={`group relative overflow-hidden rounded-2xl 
                               transition-all duration-500 bg-accent-foreground hover:shadow-2xl border border-accent-border hover:border-primary`}
              >
                <div className="relative p-5 md:p-8 space-y-3.5 md:space-y-6">
                  {/* Plan Name */}
                  <div className="text-center">
                    <div className="flex justify-center mb-2.5 md:mb-4">
                      <div
                        className={`inline-flex p-3 md:p-5 rounded-2xl bg-linear-to-br ${plan.color} text-white shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                      >
                        {plan.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-accent-text">
                      {translatePlanName(plan.name)}
                    </h3>
                    <p className="mt-3 text-sm md:text-base text-accent-text leading-relaxed">
                      {translatePlanDescription(plan.name)}
                    </p>
                  </div>

                  <DialogClose
                    onClick={() => onClose(false)}
                    key={plan.name}
                    className={`w-full ${plan.color}`}
                  >
                    <Link
                      href="/user/deposit"
                      className={`w-full py-3 text-lg font-bold rounded-xl bg-linear-to-r ${plan.color}`}
                    >
                      <Button asChild className="bg-[] w-full py-2">
                        <div>{getSelectPlanText(plan.name)}</div>
                      </Button>
                    </Link>
                  </DialogClose>

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
                      {t.admin.promoModal.capitalProtection} •{" "}
                      {t.admin.promoModal.dailyProfit} •{" "}
                      {t.admin.promoModal.instantWithdrawals}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm">
              {t.admin.promoModal.limitedTimeBonus}
              <span className="text-blue-400 font-medium">
                {t.admin.promoModal.actFast}
              </span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
