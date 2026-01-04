// components/landing/plans/investment_card.tsx
"use client";
import HoverArrow from "../../ui/hover_arrow";
import { useRouter } from "next/navigation";
import { useTranslate } from "@/hooks/use_translate";
import { Button } from "@/components/ui/button";

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
  theme?: string;
}

export default function InvestmentCard2({
  plan,
  theme = "dark",
}: InvestmentCardProps) {
  const router = useRouter();
  const { t } = useTranslate();

  const handleGetStarted = () => {
    router.push("/user/deposit");
  };

  return (
    <div
      className={`bg-gray-400 text-[#181f39] overflow-x-clip rounded-2xl p-8 e flex flex-col h-full hover:shadow-2xl transition-shadow`}
    >
      {/* Header with Icon */}
      <div  className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold">{plan.name}</h2>
      </div>

      {/* Plan Details */}
      <div className="space-y-4 grow">
        <div  className="flex items-start gap-2">
          <span className={`  mt-0.5`}>•</span>
          <div>
            <span className={` font-medium`}>
              {t.landing.investmentCard.minimum}:
            </span>
            <span className={`ml-2 font-semibold`}>
              {plan.min
                ? `$${plan.min.toLocaleString()}`
                : t.landing.investmentCard.unlimited}
            </span>
          </div>
        </div>

        <div  className="flex items-start gap-2">
          <span className="text-gray-400 mt-0.5">•</span>
          <div>
            <span className={`font-medium`}>
              {t.landing.investmentCard.maximum}:
            </span>
            <span
              className={`ml-2 font-semibold ${theme === "light" ? "" : ""}`}
            >
              {plan.max
                ? `$${plan.max.toLocaleString()}`
                : t.landing.investmentCard.unlimited}
            </span>
          </div>
        </div>

        <div  className="flex items-start gap-2">
          <span className="text-gray-400 mt-0.5">•</span>
          <div>
            <span className={`font-medium`}>
              {t.landing.investmentCard.return}:
            </span>
            <span className={`ml-2 font-semibold `}>{plan.return}</span>
          </div>
        </div>
        <div  className="flex items-start gap-2">
          <span className="text-gray-400 mt-0.5">•</span>
          <div>
            <span className={`font-medium`}>
              {t.landing.investmentCard.frequency}:
            </span>
            <span className={`ml-2 font-semibold`}>{plan.frequency}</span>
          </div>
        </div>

        <div
          
          className="flex delay-[125] items-start gap-2"
        >
          <span className="text-gray-400 mt-0.5">•</span>
          <div>
            <span className={`font-medium`}>
              {t.landing.investmentCard.duration}:
            </span>
            <span className={`ml-2 font-semibold`}>{plan.duration}</span>
          </div>
        </div>

        <div
          className="flex items-start delay-[150] gap-2"
        >
          <span className="text-gray-400 mt-0.5">•</span>
          <div>
            <span className={``}>{t.landing.investmentCard.welcomeBonus}:</span>
            <span className={`ml-2 font-semibold`}>{plan.welcomeBonus}</span>
          </div>
        </div>

        <div
          className="flex items-start delay-[150] gap-2"
        >
          <span className=" mt-0.5">•</span>
          <div>
            <span className={` font-medium`}>
              {t.landing.investmentCard.referralBonus}:
            </span>
            <span className={`ml-2 font-semibold `}>{plan.referralBonus}</span>
          </div>
        </div>

        <div
          
          className="flex items-start delay-[175] gap-3 pt-2"
        >
          <span className={`font-medium`}>
            {t.landing.investmentCard.support}:
          </span>
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            24/7 Live Support
          </span>
        </div>
      </div>

      {/* Get Started Button */}
      <div className="flex delay-200 item-center justify-end">
        <Button
          onClick={handleGetStarted}
          className="mt-8 flex items-center group justify-center gap-2 text-white cursor-pointer font-semibold text-lg transition-colors"
        >
          {t.landing.investmentCard.getStarted}
          <HoverArrow
            variant="custom"
            className="group-hover:rotate-0 duration-500 bg-white text-primary-foreground"
          />
        </Button>
      </div>
    </div>
  );
}
