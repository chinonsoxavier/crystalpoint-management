"use client";

import LedgerBalance from "@/components/shared/ledger_balance";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import useInvestStore from "./_invest_store";
import Link from "next/link";
import { useTranslate } from "@/hooks/use_translate";
import InvestmentCard from "@/components/landing/plans/investment_card";
import InvestmentCard2 from "@/components/landing/plans/investment_card_2";

const Page = () => {
  const { fetchInvestPlans, investPlans, isFetchingInvestPlans } =
    useInvestStore();
  const { t } = useTranslate();

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
        <div className=" grid-cols-1 w-full medium:grid-cols-2 lg:grid-cols-3 md:gap-6 sm:gap-4 gap-3">
          {isFetchingInvestPlans ? (
            <div className="col-span-3 flex justify-center items-center">
              <p className="text-accent-text text-lg">Loading plans...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                       <InvestmentCard2
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
                       <InvestmentCard2
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
                       <InvestmentCard2
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
                       <InvestmentCard2
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
                       <InvestmentCard2
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
