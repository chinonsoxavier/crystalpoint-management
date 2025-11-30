import React from "react";
import { MarketIcon } from "./market_icon";
import Image from "next/image";
import Animate from "@/components/animation/animate";

interface MarketCardProps {
  market: {
    id: string;
    title: string;
    description: string;
    icon:string;
  };
}

export function MarketCard({ market }: MarketCardProps) {
  return (
    <Animate className="bg-[rgba(255,255,255,0.75)] market-card rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 sm:p-10 flex gap-4">
      <div className="shrink-0">
        <div className="sm:w-20 sm:h-20 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
          {/* <MarketIcon type={market.icon} /> */}
          <Image alt='market image' src={market.icon} />
          {/* {market.icon}  */}
        </div>
      </div>
      <div className="flex flex-col justify-center flex-1">
        <h3 className="sm:text-xl text-lg font-semibold text-primary-foreground mb-1">
          {market.title}
        </h3>
        <p className="text-secondary-foreground text-sm sm:text-sm">{market.description}</p>
      </div>
    </Animate>
  );
}
