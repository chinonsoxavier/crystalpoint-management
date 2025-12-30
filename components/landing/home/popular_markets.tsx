// components/landing/about/popular_markets.tsx
"use client";

import Image from "next/image";
import { MarketCard } from "./market_card";
import bgImage from "@/assets/images/in-equity-11-bg.png";
import forexImage from "@/assets/svg/in-equity-11-icon-1.svg";
import indicesImage from "@/assets/svg/in-equity-11-icon-2.svg";
import stocksImage from "@/assets/svg/in-equity-11-icon-3.svg";
import metalsImage from "@/assets/svg/in-equity-11-icon-4.svg";
import energiesImage from "@/assets/svg/in-equity-11-icon-6.svg";
import { useTranslate } from "@/hooks/use_translate";

const PopularMarkets = () => {
  const { t } = useTranslate();

  const markets = [
    {
      id: "forex",
      title: t.landing.popularMarkets.markets.forex.title,
      description: t.landing.popularMarkets.markets.forex.description,
      icon: forexImage,
    },
    {
      id: "indices",
      title: t.landing.popularMarkets.markets.indices.title,
      description: t.landing.popularMarkets.markets.indices.description,
      icon: indicesImage,
    },
    {
      id: "stocks",
      title: t.landing.popularMarkets.markets.stocks.title,
      description: t.landing.popularMarkets.markets.stocks.description,
      icon: stocksImage,
    },
    {
      id: "metals",
      title: t.landing.popularMarkets.markets.metals.title,
      description: t.landing.popularMarkets.markets.metals.description,
      icon: metalsImage,
    },
    {
      id: "energies",
      title: t.landing.popularMarkets.markets.energies.title,
      description: t.landing.popularMarkets.markets.energies.description,
      icon: energiesImage,
    },
  ];

  return (
    <section className=" bg-linear-to-r center from-white to-[rgba(255,255,255,0.8)] overflow-hidden">
      {/* Background image overlay */}
      <div className="relative z-10 container max_width px-6 py-20">
        <Image
          src={bgImage}
          alt="main in suit"
          className="absolute -z-10 h-full top-0 object-cover md:object-fit right-0 "
        />
        {/* Header */}
        <div className="space-y-3 text-center sm:text-left">
          <h1 className="md:text-[42px] text text-3xl font-bold text-primary-foreground ">
            {t.landing.popularMarkets.title.before}
            <span className="underline w-min ml-3">
              {t.landing.popularMarkets.title.highlight}
            </span>
          </h1>
          <p className="md:text-xl text-lg font-medium text-secondary-foreground">
            {t.landing.popularMarkets.subtitle}
          </p>
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-8 lg:grid-cols-3 gap-6">
          {markets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularMarkets;
