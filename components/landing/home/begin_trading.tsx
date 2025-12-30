// components/landing/home/begin_trading.tsx
"use client";
import { Button } from "@/components/ui/button";
import BgImage from "@/assets/images/in-equity-12-bg.png";
import mockupsImage from "@/assets/images/in-equity-12-mockup.png";
import Image from "next/image";
import React from "react";
import Animate from "@/components/animation/animate";
import Link from "next/link";
import { useTranslate } from "@/hooks/use_translate";

export default function BeginTrading() {
  const { t } = useTranslate();
  const [hovered, setHovered] = React.useState(1);
  return (
    <div className="bg- text-white overflow-hidden bg-[#212224] relative">
      <Image
        src={BgImage}
        alt="Background Image"
        className="absolute w-full h-full"
      />

      {/* Content */}
      <div className="relative z-10 pt-14 max_width_xl">
        {/* Header with button */}
        <div className="flex gap-10 justify-center md:justify-between flex-wrap items-center mb-10">
          <Animate type="fadeInLeft">
            <h1 className="text-4xl font-bold text-center leading-tight max-w-2xl">
              {t.landing.beginTrading.title}
            </h1>
          </Animate>
          <Animate type="fadeInRight">
            <Link href="sign-in">
              <Button className="bg-white text-primary-foreground hover:bg-gray-100 rounded-lg px-6 py-2 font-medium">
                {t.landing.beginTrading.openAccount}
              </Button>
            </Link>
          </Animate>
        </div>

        {/* Main content grid */}
        <div className="grid md:grid-cols-5 gap-5 items-center">
          {/* Left column - Steps */}
          <div className="space-y-6 pb-16 col-span-2">
            {/* Step 1 */}
            <Animate>
              <div
                className={`${
                  hovered === 1 && "border-primary"
                } border group hover:border-primary rounded-2xl p-4 duration-500 transition-colors`}
                onMouseEnter={() => setHovered(1)}
                onTouchStart={() => setHovered(1)}
              >
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div
                      className={`flex ${
                        hovered === 1
                          ? "bg-primary text-[#212224]"
                          : "text-white"
                      } items-center justify-center w-10 h-10 sm:w-16 sm:h-16 rounded-full duration-500 group-hover:bg-primary bg-border text- group-hover:text-[#212224] font-bold text-2xl`}
                    >
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="sm:text-xl text-lg font-bold mb-2">
                      {t.landing.beginTrading.steps.register.title}
                    </h3>
                    <p className="text-[rgba(255, 255, 255, .7)] leading-relaxed md:text-base text-sm">
                      {t.landing.beginTrading.steps.register.description}
                    </p>
                  </div>
                </div>
              </div>
            </Animate>

            {/* Step 2 */}
            <Animate>
              <div
                className={`${
                  hovered === 2 && "border-primary"
                } border group hover:border-primary rounded-2xl p-4 duration-500 transition-colors`}
                onMouseEnter={() => setHovered(2)}
                onTouchStart={() => setHovered(2)}
                onTouchEnd={() => setHovered(1)}
                onMouseLeave={() => setHovered(1)}
              >
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div
                      className={`flex ${
                        hovered === 2
                          ? "bg-primary text-[#212224]"
                          : "text-white"
                      } items-center justify-center w-10 h-10 sm:w-16 sm:h-16 rounded-full duration-500 group-hover:bg-primary bg-border text- group-hover:text-[#212224] font-bold text-2xl`}
                    >
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="sm:text-xl text-lg font-bold mb-2">
                      {t.landing.beginTrading.steps.deposit.title}
                    </h3>
                    <p className="text-[rgba(255, 255, 255, .7)] leading-relaxed md:text-base text-sm">
                      {t.landing.beginTrading.steps.deposit.description}
                    </p>
                  </div>
                </div>
              </div>
            </Animate>

            {/* Step 3 */}
            <Animate>
              <div
                className={`${
                  hovered === 3 && "border-primary"
                } border group hover:border-primary rounded-2xl p-4 duration-500 transition-colors`}
                onMouseEnter={() => setHovered(3)}
                onTouchStart={() => setHovered(3)}
                onTouchEnd={() => setHovered(1)}
                onMouseLeave={() => setHovered(1)}
              >
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div
                      className={`flex ${
                        hovered === 3
                          ? "bg-primary text-[#212224]"
                          : "text-white"
                      } items-center justify-center w-10 h-10 sm:w-16 sm:h-16 rounded-full duration-500 group-hover:bg-primary bg-border text- group-hover:text-[#212224] font-bold text-2xl`}
                    >
                      3
                    </div>
                  </div>
                  <div className="flex-3">
                    <h3 className="sm:text-xl text-lg font-bold mb-2">
                      {t.landing.beginTrading.steps.withdraw.title}
                    </h3>
                    <p className="text-[rgba(255, 255, 255, .7)] leading-relaxed md:text-base text-sm">
                      {t.landing.beginTrading.steps.withdraw.description}
                    </p>
                  </div>
                </div>
              </div>
            </Animate>
          </div>

          {/* Right column */}
          <div className="relative h-full flex items-end col-span-3 justify-start">
            <Animate
              type="fadeInRight"
              className="relative w-full  max-w-[700px]"
            >
              <Image
                src={mockupsImage}
                className="w-full h-full max-w- object-contain"
                alt="mockup image"
              />
            </Animate>
          </div>
        </div>
      </div>
    </div>
  );
}
