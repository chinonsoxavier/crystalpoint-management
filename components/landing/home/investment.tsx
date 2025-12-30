"use client";
// components/landing/home/investment.tsx
import { Check } from "lucide-react";
import Image from "next/image";
import aboutUImage from "@/assets/images/in-equity-16-image.jpg";
import investmentImage from "@/assets/images/in-equity-11-bg.png";
import { Button } from "@/components/ui/button";
import HoverArrow from "@/components/ui/hover_arrow";
import Animate from "@/components/animation/animate";
import Link from "next/link";
import { useTranslate } from "@/hooks/use_translate";

const Investment = () => {
  const { t } = useTranslate();

  return (
    <div className="wrapper flex-col flex-wrap flex items-stretch justify-center overflow-clip bg-[#f5f7f9] md:pb-20 pb-10">
      <div className="flex py-10 md:py-20 medium:flex-row flex-col items-stretch justify-between w-full max_width gap-12 medium:gap-20">
        <Animate
          type="fadeInLeft"
          className="flex flex-col xlarge:shrink-0 items-start justify-between md:max-w-[430px]"
        >
          <div className="space-y-4">
            <h2 className="md:text-5xl text-4xl font-semibold text-primary-foreground">
              {t.landing.investment.title.before}
              <span className="underline">
                {" "}
                {t.landing.investment.title.highlight}{" "}
              </span>
            </h2>

            <p className="text-primary text-2xl md:text-3xl font-semibold">
              {t.landing.investment.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-start gap-3">
              <div className="center rounded-full w-4 h-4 bg-primary">
                <Check className="text-white" />
              </div>

              <p className="text-secondary-foreground text-base md:text-lg font-semibold">
                {t.landing.investment.features.innovative}
              </p>
            </div>
            <div className="flex items-center justify-start gap-3">
              <div className="center rounded-full w-4 h-4 bg-primary">
                <Check className="text-white" />
              </div>

              <p className="text-secondary-foreground md:text-lg font-semibold">
                {t.landing.investment.features.innovative}
              </p>
            </div>
            <div className="flex items-center justify-start gap-3">
              <div className="center rounded-full w-4 h-4 bg-primary">
                <Check className="text-white" />
              </div>

              <p className="text-secondary-foreground md:text-lg font-semibold">
                {t.landing.investment.features.innovative}
              </p>
            </div>
          </div>
        </Animate>

        <Animate
          type="fadeInRight"
          className="relative medium:min-w-[520px] investment_bg"
        >
          <div className="rounded-xl z-20 relative shadow-xl bg-white px-2 py-3 md:px-4 md:py-6">
            <Image src={aboutUImage} alt="investment image" />
          </div>
        </Animate>
      </div>

      <div className="flex items-stretch xlarge:px-0 px-6 flex-col xlarge:flex-row flex-1 py-20 gap-10 justify-between w-full">
        <Animate type="fadeInLeft" className="flex-1  medium:min-w-[420px]">
          <Image src={investmentImage} alt="investment image" />
        </Animate>

        <Animate
          type="fadeInRight"
          className="flex space-y-4 items-start flex-col flex-1 justify-between"
        >
          <h2 className="md:text-3xl text-2xl font-semibold text-primary-foreground">
            {t.landing.investment.cardSection.title}
          </h2>

          <p className="text-secondary-foreground md:text-lg">
            {t.landing.investment.cardSection.description}
          </p>

          <Link href="/plans">
            <Button variant="dark" className="bg-primary text-white">
              {t.landing.investment.cardSection.button}{" "}
              <HoverArrow variant="dark" />
            </Button>
          </Link>
        </Animate>
      </div>
    </div>
  );
};

export default Investment;
