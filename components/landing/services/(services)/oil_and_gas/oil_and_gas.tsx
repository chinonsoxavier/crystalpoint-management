// components/landing/services/(services)/oil_and_gas/oil_and_gas.tsx
"use client";
import OilImage from "@/assets/images/6.jpg";
import Animate from "@/components/animation/animate";
import { faCheck, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useTranslate } from "@/hooks/use_translate";

const OilAndGas = () => {
  const { t } = useTranslate();
  const { oilAndGas } = t.landing;

  return (
    <div className="wrapper py-12 md:py-20">
      <div className="max_width md:px-10">
        <Animate>
          <Animate>
            <h2 className="text-3xl md:text-4xl text-center font-bold text-primary-foreground mb-3 md:mb-5">
              <span className="underline">{oilAndGas.title}</span>
            </h2>
          </Animate>

          <div className="max-w-4xl mx-auto flex justify-start">
            <Animate className="justify-start my-6 overflow-hidden rounded-xl">
              <Image
                src={OilImage}
                className=" duration-500 hover:scale-105 h-full rounded-xl"
                alt="oil image"
              />
            </Animate>
          </div>

          <div>
            {/* oil trading with cfd */}
            <Animate className="flex gap-4 mt-5 mx-auto max-w-4xl justify-center sm:gap-6">
              <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
                <FontAwesomeIcon
                  className="text-white size-8.5"
                  icon={faList}
                />
              </div>
              <div className="flex-1 space-y-5">
                <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                  {oilAndGas.sections.oilTradingWithCFD.title}
                </h3>
                <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                  {oilAndGas.sections.oilTradingWithCFD.description}
                </p>
              </div>
            </Animate>

            {/* CFDs for investing in oil */}
            <Animate className="flex gap-4 mt-5 mx-auto max-w-4xl justify-center sm:gap-6">
              <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
                <FontAwesomeIcon
                  className="text-white size-8.5"
                  icon={faList}
                />
              </div>
              <div className="flex-1 space-y-5">
                <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                  {oilAndGas.sections.cfdsForInvesting.title}
                </h3>
                <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                  {oilAndGas.sections.cfdsForInvesting.description}
                </p>
              </div>
            </Animate>

            {/* Benefits of investing in oil */}
            <Animate className="flex gap-4 mt-5 mx-auto max-w-4xl justify-center sm:gap-6">
              <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
                <FontAwesomeIcon
                  className="text-white size-8.5"
                  icon={faList}
                />
              </div>
              <div className="flex-1 space-y-5">
                <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                  {oilAndGas.sections.benefitsOfInvesting.title}
                </h3>
                <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                  {oilAndGas.sections.benefitsOfInvesting.description}
                </p>
              </div>
            </Animate>

            {/* easy with cristal point */}
            <Animate className="flex gap-4 mt-5 mx-auto max-w-4xl justify-center sm:gap-6">
              <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
                <FontAwesomeIcon
                  className="text-white size-8.5"
                  icon={faList}
                />
              </div>
              <div className="flex-1 space-y-5">
                <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                  {oilAndGas.sections.easyWithCristalPoint.title}
                </h3>
                <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                  {oilAndGas.sections.easyWithCristalPoint.description}
                </p>
              </div>
            </Animate>

            {/* speculating online */}
            <Animate className="flex gap-4 mt-5 mx-auto max-w-4xl justify-center sm:gap-6">
              <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
                <FontAwesomeIcon
                  className="text-white size-8.5"
                  icon={faList}
                />
              </div>
              <div className="flex-1 space-y-5">
                <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                  {oilAndGas.sections.speculatingOnline.title}
                </h3>
                <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                  {oilAndGas.sections.speculatingOnline.description}
                </p>
              </div>
            </Animate>

            {/* know oil market well */}
            <Animate className="flex gap-4 mt-5 mx-auto max-w-4xl justify-center sm:gap-6">
              <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
                <FontAwesomeIcon
                  className="text-white size-8.5"
                  icon={faList}
                />
              </div>
              <div className="flex-1 space-y-5">
                <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                  {oilAndGas.sections.knowOilMarketWell.title}
                </h3>
                <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                  {oilAndGas.sections.knowOilMarketWell.description}
                </p>
              </div>
            </Animate>

            {/* Let us take a simple example */}
            <Animate className="flex gap-4 mt-5 mx-auto max-w-4xl justify-center sm:gap-6">
              <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
                <FontAwesomeIcon
                  className="text-white size-8.5"
                  icon={faList}
                />
              </div>
              <div className="flex-1 space-y-5">
                <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                  {oilAndGas.sections.simpleExample.title}
                </h3>
                <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                  {oilAndGas.sections.simpleExample.description}
                </p>
              </div>
            </Animate>

            {/* How to choose your trading platform */}
            <Animate className="flex gap-4 mt-5 mx-auto max-w-4xl justify-center sm:gap-6">
              <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
                <FontAwesomeIcon
                  className="text-white size-8.5"
                  icon={faList}
                />
              </div>
              <div className="flex-1 space-y-5">
                <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                  {oilAndGas.sections.chooseTradingPlatform.title}
                </h3>
                <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                  {oilAndGas.sections.chooseTradingPlatform.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="center bg-primary rounded-full h-4.5 w-4.5">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-white size-3.5 m-1"
                      />
                    </div>
                    <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                      {
                        oilAndGas.sections.chooseTradingPlatform.features
                          .spreads
                      }
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
                      {
                        oilAndGas.sections.chooseTradingPlatform.features
                          .leverage
                      }
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
                      {oilAndGas.sections.chooseTradingPlatform.features.tools}
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
                      {
                        oilAndGas.sections.chooseTradingPlatform.features
                          .quality
                      }
                    </p>
                  </div>
                </div>
              </div>
            </Animate>

            {/* Oil: An asset with a future */}
            <Animate className="flex gap-4 mt-5 mx-auto max-w-4xl justify-center sm:gap-6">
              <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
                <FontAwesomeIcon
                  className="text-white size-8.5"
                  icon={faList}
                />
              </div>
              <div className="flex-1 space-y-5">
                <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                  {oilAndGas.sections.assetWithFuture.title}
                </h3>
                <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                  {oilAndGas.sections.assetWithFuture.description}
                </p>
              </div>
            </Animate>

            {/* invest in oil for long term */}
            <Animate className="flex gap-4 mt-5 mx-auto max-w-4xl justify-center sm:gap-6">
              <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
                <FontAwesomeIcon
                  className="text-white size-8.5"
                  icon={faList}
                />
              </div>
              <div className="flex-1 space-y-5">
                <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                  {oilAndGas.sections.investLongTerm.title}
                </h3>
                <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                  {oilAndGas.sections.investLongTerm.description}
                </p>
              </div>
            </Animate>

            {/* how to cover lomgtime investment in oil */}
            <Animate className="flex gap-4 mt-5 mx-auto max-w-4xl justify-center sm:gap-6">
              <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
                <FontAwesomeIcon
                  className="text-white size-8.5"
                  icon={faList}
                />
              </div>
              <div className="flex-1 space-y-5">
                <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                  {oilAndGas.sections.coverLongTermInvestment.title}
                </h3>
                <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                  {oilAndGas.sections.coverLongTermInvestment.description}
                </p>
              </div>
            </Animate>

            {/* trading indicators */}
            <Animate className="flex gap-4 mt-5 mx-auto max-w-4xl justify-center sm:gap-6">
              <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
                <FontAwesomeIcon
                  className="text-white size-8.5"
                  icon={faList}
                />
              </div>
              <div className="flex-1 space-y-5">
                <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                  {oilAndGas.sections.tradingIndicators.title}
                </h3>
                <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                  {oilAndGas.sections.tradingIndicators.description}
                </p>
              </div>
            </Animate>
          </div>
        </Animate>
      </div>
    </div>
  );
};

export default OilAndGas;
