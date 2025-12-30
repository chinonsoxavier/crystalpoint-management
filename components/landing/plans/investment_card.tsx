// components/landing/plans/investment_card.tsx
"use client";

import { faServer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Animate from "../../animation/animate";
import HoverArrow from "../../ui/hover_arrow";
import { useRouter } from "next/navigation";
import { useTranslate } from "@/hooks/use_translate";

interface InvestmentPlan {
  id: string;
  name: string;
  icon: string;
  min: number | null;
  max: number | null;
  return: string;
  frequency: string;
  duration: string;
  referralBonus: string;
  welcomeBonus: string;
}

interface InvestmentCardProps {
  plan: InvestmentPlan;
}

export default function InvestmentCard({ plan }: InvestmentCardProps) {
  const router = useRouter();
  const { t } = useTranslate();

  const handleGetStarted = () => {
    router.push("/sign-up");
  };

  return (
    <Animate className="bg-gray-900 overflow-x-clip rounded-2xl p-8 text-white flex flex-col h-full hover:shadow-2xl transition-shadow">
      {/* Header with Icon */}
      <Animate type="fadeInLeft" className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-lg">
          <FontAwesomeIcon icon={faServer} className="" />
        </div>
        <h2 className="text-xl font-bold">{plan.name}</h2>
      </Animate>

      {/* Plan Details */}
      <div className="space-y-4 grow">
        <Animate type="fadeInLeft" className="flex items-start gap-2">
          <span className="text-gray-400 mt-0.5">•</span>
          <div>
            <span className="text-gray-300">
              {t.landing.investmentCard.minimum}:
            </span>
            <span className="ml-2 font-semibold">
              {plan.min
                ? `$${plan.min.toLocaleString()}`
                : t.landing.investmentCard.unlimited}
            </span>
          </div>
        </Animate>

        <Animate type="fadeInLeft" className="flex items-start gap-2">
          <span className="text-gray-400 mt-0.5">•</span>
          <div>
            <span className="text-gray-300">
              {t.landing.investmentCard.maximum}:
            </span>
            <span className="ml-2 font-semibold">
              {plan.max
                ? `$${plan.max.toLocaleString()}`
                : t.landing.investmentCard.unlimited}
            </span>
          </div>
        </Animate>

        <Animate type="fadeInLeft" className="flex items-start gap-2">
          <span className="text-gray-400 mt-0.5">•</span>
          <div>
            <span className="text-gray-300">
              {t.landing.investmentCard.return}:
            </span>
            <span className="ml-2 font-semibold">{plan.return}</span>
          </div>
        </Animate>
        <Animate type="fadeInLeft" className="flex items-start gap-2">
          <span className="text-gray-400 mt-0.5">•</span>
          <div>
            <span className="text-gray-300">
              {t.landing.investmentCard.frequency}:
            </span>
            <span className="ml-2 font-semibold">{plan.frequency}</span>
          </div>
        </Animate>

        <Animate
          type="fadeInLeft"
          className="flex delay-[125] items-start gap-2"
        >
          <span className="text-gray-400 mt-0.5">•</span>
          <div>
            <span className="text-gray-300">
              {t.landing.investmentCard.duration}:
            </span>
            <span className="ml-2 font-semibold">{plan.duration}</span>
          </div>
        </Animate>

        <Animate
          type="fadeInLeft"
          className="flex items-start delay-[150] gap-2"
        >
          <span className="text-gray-400 mt-0.5">•</span>
          <div>
            <span className="text-gray-300">
              {t.landing.investmentCard.welcomeBonus}:
            </span>
            <span className="ml-2 font-semibold">{plan.welcomeBonus}</span>
          </div>
        </Animate>

        <Animate
          type="fadeInLeft"
          className="flex items-start delay-[150] gap-2"
        >
          <span className="text-gray-400 mt-0.5">•</span>
          <div>
            <span className="text-gray-300">
              {t.landing.investmentCard.referralBonus}:
            </span>
            <span className="ml-2 font-semibold">{plan.referralBonus}</span>
          </div>
        </Animate>

        <Animate
          type="fadeInLeft"
          className="flex items-start delay-[175] gap-3 pt-2"
        >
          <span className="text-gray-300">
            {t.landing.investmentCard.support}:
          </span>
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            24/7 Live Support
          </span>
        </Animate>
      </div>

      {/* Get Started Button */}
      <div className="flex delay-200 item-center justify-end">
        <button
          onClick={handleGetStarted}
          className="mt-8 flex items-center group justify-center gap-2 text-white cursor-pointer font-semibold text-lg transition-colors"
        >
          {t.landing.investmentCard.getStarted}
          <HoverArrow
            variant="custom"
            className="group-hover:rotate-0 duration-500 bg-white text-primary-foreground"
          />
        </button>
      </div>
    </Animate>
  );
}
