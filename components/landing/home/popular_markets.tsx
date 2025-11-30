import Image from "next/image";
import { MarketCard } from "./market_card";
import bgImage from "@/assets/images/in-equity-11-bg.png";
import forexImage from "@/assets/svg/in-equity-11-icon-1.svg";
import indicesImage from "@/assets/svg/in-equity-11-icon-2.svg";
import stocksImage from "@/assets/svg/in-equity-11-icon-3.svg";
import metalsImage from "@/assets/svg/in-equity-11-icon-4.svg";
import energiesImage from "@/assets/svg/in-equity-11-icon-6.svg";

const markets = [
  {
    id: "forex",
    title: "Forex",
    description: "Trade 40+ major, minor, and exotic currency pairs",
    icon: forexImage,
  },
  {
    id: "indices",
    title: "Indices",
    description: "Trade 15 of the most famous global indices as CFDs",
    icon: indicesImage,
  },
  {
    id: "stocks",
    title: "Stocks",
    description: "Trade the most covered & highest-profile asset classes",
    icon: stocksImage,
  },
  {
    id: "metals",
    title: "Metals",
    description: "Trade metals including Gold and Silver",
    icon: metalsImage,
  },
  {
    id: "energies",
    title: "Energies",
    description: "Trade Brent Crude Oil, WTI, Natural Gas and Coal",
    icon: energiesImage,
  },
];

const PopularMarkets = () => {
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
            Trade the world`s most
            <span className="underline w-min ml-3">popular markets</span>
          </h1>
          <p className="md:text-xl text-lg font-medium text-secondary-foreground">
            Find your next trade with access to a wide range of markets.
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
