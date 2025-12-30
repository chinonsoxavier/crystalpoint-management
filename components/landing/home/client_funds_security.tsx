"use client";
// components/landing/home/client_fund_security.tsx
import Image from "next/image";
import BgShapeImage from "@/assets/images/in-equity-15-bg.png";
import { Button } from "@/components/ui/button";
import HoverArrow from "@/components/ui/hover_arrow";
import Animate from "@/components/animation/animate";
import Link from "next/link";
import { useTranslate } from "@/hooks/use_translate";

const ClientFundSecurity = () => {
  const { t } = useTranslate();

  return (
    <div className="center bg-primary/50">
      <div className="max_width relative overflow-hidden">
        <Image
          className="absolute top-0 right-0 bottom-0 w-fll object-contain"
          src={BgShapeImage}
          alt="background shape"
        />

        {/* Content */}
        <div className="relative z-10 py-10 md:py-20">
          {/* Header */}
          <Animate>
            <h1 className="sm:text-3xl text-2xl sm:text-[40px] font-bold text-slate-900 text-balance">
              {t.landing.clientFundSecurity.title}
            </h1>
            <p className="text-xl sm:text-2xl my-3 text-white max-w-2xl">
              {t.landing.clientFundSecurity.subtitle}
            </p>
          </Animate>

          {/* Trust Features Grid */}
          <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-10 sm:gap-16 max-w-4xl">
            <Animate
              type="fadeInRight"
              className="flex flex-col items-center justify-center"
            >
              <p className="sm:text-xl text-2xl max-w-[290px] text-primary-foreground font-medium">
                {t.landing.clientFundSecurity.features.regulated}
              </p>
            </Animate>
            <Animate
              type="fadeInLeft"
              className="flex flex-col items-center justify-center"
            >
              <p className="sm:text-xl text-2xl max-w-[290px] text-primary-foreground font-medium">
                {t.landing.clientFundSecurity.features.negativeBalance}
              </p>
            </Animate>
            <Animate
              type="fadeInRight"
              className="flex flex-col items-center justify-center"
            >
              <p className="sm:text-xl text-2xl max-w-[290px] text-primary-foreground font-medium">
                {t.landing.clientFundSecurity.features.financialCommission}
              </p>
            </Animate>
            <Animate
              type="fadeInLeft"
              className="flex flex-col items-center justify-center"
            >
              <p className="sm:text-xl text-2xl max-w-[290px] text-primary-foreground font-medium">
                {t.landing.clientFundSecurity.features.executionQuality}
              </p>
            </Animate>
          </div>

          {/* Divider */}
          <div className="border-t border-white opacity-40 my-10 md:my-16 max-w-4xl"></div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <Animate type="fadeInLeft" className="text-center md:text-left">
              <span className="text-lg text-center font-bold text-primary-foreground">
                {t.landing.clientFundSecurity.cta.ready}
              </span>
            </Animate>
            <Animate type="fadeInRight" className="flex gap-1 md:gap-4">
              <Link href="/sign-in">
                <Button variant="secondary" className="text-sm md:text-base">
                  {t.landing.clientFundSecurity.cta.login}
                  <HoverArrow variant="light" className="" />
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button
                  variant="dark"
                  className="text-sm md:text-base text-white bg-primary"
                >
                  {t.landing.clientFundSecurity.cta.createAccount}
                  <HoverArrow variant="secondary" />
                </Button>
              </Link>
            </Animate>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientFundSecurity;
