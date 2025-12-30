"use client";
// components/landing/plans/investment_plans.tsx
import Animate from "../../animation/animate";
import InvestmentCard from "./investment_card";
import { useTranslate } from "@/hooks/use_translate";

export default function InvestmentPlans() {
  const { t } = useTranslate();

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Animate className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-2">
            {t.landing.investmentPlans.title.before}
            <span className="underline pl-2">
              {t.landing.investmentPlans.title.highlight}
            </span>
          </h1>
        </Animate>

        {/* Investment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InvestmentCard
            key="beginners"
            plan={{
              id: "beginners",
              name: t.landing.investmentPlans.plans.beginners.name,
              icon: "🛍",
              min: 50,
              max: 499,
              return: t.landing.investmentPlans.plans.beginners.return,
              frequency: t.landing.investmentPlans.plans.beginners.frequency,
              duration: t.landing.investmentPlans.plans.beginners.duration,
              referralBonus:
                t.landing.investmentPlans.plans.beginners.referralBonus,
              welcomeBonus:
                t.landing.investmentPlans.plans.beginners.welcomeBonus,
            }}
          />
          <InvestmentCard
            key="accessories"
            plan={{
              id: "accessories",
              name: t.landing.investmentPlans.plans.accessories.name,
              icon: "⚙",
              min: 500,
              max: 999,
              return: t.landing.investmentPlans.plans.accessories.return,
              frequency: t.landing.investmentPlans.plans.accessories.frequency,
              duration: t.landing.investmentPlans.plans.accessories.duration,
              referralBonus:
                t.landing.investmentPlans.plans.accessories.referralBonus,
              welcomeBonus:
                t.landing.investmentPlans.plans.accessories.welcomeBonus,
            }}
          />
          <InvestmentCard
            key="oil-gas"
            plan={{
              id: "oil-gas",
              name: t.landing.investmentPlans.plans.oilGas.name,
              icon: "🛢",
              min: 1000,
              max: 1999,
              return: t.landing.investmentPlans.plans.oilGas.return,
              frequency: t.landing.investmentPlans.plans.oilGas.frequency,
              duration: t.landing.investmentPlans.plans.oilGas.duration,
              referralBonus:
                t.landing.investmentPlans.plans.oilGas.referralBonus,
              welcomeBonus: t.landing.investmentPlans.plans.oilGas.welcomeBonus,
            }}
          />
          <InvestmentCard
            key="agriculture"
            plan={{
              id: "agriculture",
              name: t.landing.investmentPlans.plans.agriculture.name,
              icon: "🌾",
              min: 2000,
              max: 4999,
              return: t.landing.investmentPlans.plans.agriculture.return,
              frequency: t.landing.investmentPlans.plans.agriculture.frequency,
              duration: t.landing.investmentPlans.plans.agriculture.duration,
              referralBonus:
                t.landing.investmentPlans.plans.agriculture.referralBonus,
              welcomeBonus:
                t.landing.investmentPlans.plans.agriculture.welcomeBonus,
            }}
          />
          <InvestmentCard
            key="real-estate"
            plan={{
              id: "real-estate",
              name: t.landing.investmentPlans.plans.realEstate.name,
              icon: "🏢",
              min: 5000,
              max: 1000000,
              return: t.landing.investmentPlans.plans.realEstate.return,
              frequency: t.landing.investmentPlans.plans.realEstate.frequency,
              duration: t.landing.investmentPlans.plans.realEstate.duration,
              referralBonus:
                t.landing.investmentPlans.plans.realEstate.referralBonus,
              welcomeBonus:
                t.landing.investmentPlans.plans.realEstate.welcomeBonus,
            }}
          />
        </div>
      </div>
    </div>
  );
}
