"use client";

import Animate from "@/components/animation/animate";
import stockImage from "@/assets/images/stock-2.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faList } from "@fortawesome/free-solid-svg-icons";
import { useTranslate } from "@/hooks/use_translate";

const StockInvestment = () => {
  const { t } = useTranslate();
  const { stockInvestment } = t.landing;

  return (
    <div className="wrapper md:py20 py-12">
      <div className="max_width">
        <Animate>
          <h2 className="text-3xl md:text-4xl text-center font-bold text-primary-foreground mb-3 md:mb-5">
            <span className="underline">{stockInvestment.title}</span>
          </h2>
        </Animate>

        <div className="max-w-4xl mx-auto flex justify-start">
          <Animate className="justify-start my-6 overflow-hidden rounded-xl">
            <Image
              src={stockImage}
              className=" duration-500 hover:scale-105 h-full rounded-xl"
              alt="stock image"
            />
          </Animate>
        </div>

        <div>
          <Animate className="flex gap-4 mt-5 mx-auto max-w-4xl justify-center sm:gap-6">
            <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
              <FontAwesomeIcon className="text-white size-8.5" icon={faList} />
            </div>
            <div className="flex-1 space-y-5">
              <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                {stockInvestment.tradingStockOrShare.title}
              </h3>
              <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                {stockInvestment.tradingStockOrShare.description}
              </p>

              <div className="space-y-2">
                <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                  {stockInvestment.investInStocks.title}
                </h3>

                <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                  {stockInvestment.investInStocks.description}
                </p>
                <div className="flex items-center gap-2">
                  <div className="center bg-primary rounded-full h-4.5 w-4.5">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-white size-3.5 m-1"
                    />
                  </div>
                  <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                    {stockInvestment.investInStocks.features.createAccount}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="center bg-primary rounded-full h-4.5 w-4.5">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-white size-3.5 m-1"
                    />
                  </div>
                  <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                    {stockInvestment.investInStocks.features.choosePlan}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="center bg-primary rounded-full h-4.5 w-4.5">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-white size-3.5 m-1"
                    />
                  </div>
                  <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                    {stockInvestment.investInStocks.features.makeDeposit}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="center bg-primary rounded-full h-4.5 w-4.5">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-white size-3.5 m-1"
                    />
                  </div>
                  <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                    {stockInvestment.investInStocks.features.getROI}
                  </p>
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </div>
    </div>
  );
};

export default StockInvestment;
