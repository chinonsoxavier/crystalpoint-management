"use client";

import { faServer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Animate from "../../animation/animate";
import HoverArrow from "../../ui/hover_arrow";
import { useRouter } from "next/navigation";

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
            <span className="text-gray-300">Minimum:</span>
            <span className="ml-2 font-semibold">
              {plan.min ? `$${plan.min.toLocaleString()}` : "Unlimited"}
            </span>
          </div>
        </Animate>

        <Animate type="fadeInLeft" className="flex items-start gap-2">
          <span className="text-gray-400 mt-0.5">•</span>
          <div>
            <span className="text-gray-300">Maximum:</span>
            <span className="ml-2 font-semibold">
             {plan.max ? `$${plan.max.toLocaleString()}` : "Unlimited"}
            </span>
          </div>
        </Animate>

        <Animate type="fadeInLeft" className="flex items-start gap-2">
          <span className="text-gray-400 mt-0.5">•</span>
          <div>
            <span className="text-gray-300">Return:</span>
            <span className="ml-2 font-semibold">{plan.return}</span>
          </div>
        </Animate>
        <Animate type="fadeInLeft" className="flex items-start gap-2">
          <span className="text-gray-400 mt-0.5">•</span>
          <div>
            <span className="text-gray-300">Frequency:</span>
            <span className="ml-2 font-semibold">{plan.frequency}</span>
          </div>
        </Animate>

        <Animate
          type="fadeInLeft"
          className="flex delay-[125] items-start gap-2"
        >
          <span className="text-gray-400 mt-0.5">•</span>
          <div>
            <span className="text-gray-300">Duration:</span>
            <span className="ml-2 font-semibold">{plan.duration}</span>
          </div>
        </Animate>

         <Animate
          type="fadeInLeft"
          className="flex items-start delay-[150] gap-2"
        >
          <span className="text-gray-400 mt-0.5">•</span>
          <div>
            <span className="text-gray-300">Welcome Bonus:</span>
            <span className="ml-2 font-semibold">{plan.welcomeBonus}</span>
          </div>
        </Animate>

        <Animate
          type="fadeInLeft"
          className="flex items-start delay-[150] gap-2"
        >
          <span className="text-gray-400 mt-0.5">•</span>
          <div>
            <span className="text-gray-300">Referral Bonus:</span>
            <span className="ml-2 font-semibold">{plan.referralBonus}</span>
          </div>
        </Animate>

        <Animate
          type="fadeInLeft"
          className="flex items-center delay-[175] gap-3 pt-2"
        >
          <span className="text-gray-300">Support:</span>
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
          Get Started
          <HoverArrow
            variant="custom"
            className="group-hover:rotate-0 duration-500 bg-white text-primary-foreground"
          />
        </button>
      </div>
    </Animate>
  );
}
