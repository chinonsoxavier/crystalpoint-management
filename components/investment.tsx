// components/landing/services/sinvestment.tsx
"use client";

import Animate from "@/components/animation/animate";
import { Button } from "@/components/ui/button";
import HoverArrow from "@/components/ui/hover_arrow";
import Link from "next/link";
import { useTranslate } from "@/hooks/use_translate";

const Investment = () => {
  const { t } = useTranslate();

  return (
    <div className="wrapper py-12 md:py-20">
      <div className="max_width flex items-center justify-between flex-wrap gap-12 md:gap-20">
        <Animate type="fadeInLeft" className="flex-1 space-y-3 md:space-y-5">
          <h1 className="text-primary-foreground font-semibold text-3xl md:text-5xl">
            <span className="underline pr-2">
              {t.landing.sinvestment.title.highlight}
            </span>
            {t.landing.sinvestment.title.before}
            {t.landing.sinvestment.title.after}
          </h1>

          <p className="text-secondary-foreground md:text-xl">
            {t.landing.sinvestment.subtitle}
          </p>
        </Animate>

        <Animate
          type="fadeInRight"
          className="bg-white flex-1 flex-col market-card gap-4 py-8 px-10 rounded flex max-w-[450px]"
        >
          <p className="text-primary-foreground text-lg md:text-xl">
            {t.landing.sinvestment.card.title}
          </p>

          <p className="text-secondary-foreground">
            {t.landing.sinvestment.card.description}
          </p>
          <Link href="/sign-up">
            <Button className="w-min whitespace-nowrap group hover:text-white duration-300 text-white">
              {t.landing.sinvestment.card.button}
              <HoverArrow
                variant="custom"
                className="bg-white text-primary-foreground group-hover:bg-white duration-500"
              />
            </Button>
          </Link>
        </Animate>
      </div>
    </div>
  );
};

export default Investment;
