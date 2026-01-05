"use client";
import Animate from "@/components/animation/animate";
import { Button } from "@/components/ui/button";
import HoverArrow from "@/components/ui/hover_arrow";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslate } from "@/hooks/use_translate";

interface SlideButtons {
  login?: string;
  signup?: string;
  services?: string;
}

const Hero = () => {
  const { t } = useTranslate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 5000);

    if (currentSlide >= t.landing.hero.slides.length - 1) {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [currentSlide, t.landing.hero.slides.length]);

  const renderSlideButtons = (buttons: {
    login?: string | undefined;
    signup?: string | undefined;
    services?: string | undefined;
  }) => {
    if (buttons.login && buttons.signup) {
      return (
        <div className="space-x-3 space-y-3">
          <Link href="/sign-in">
            <Button variant="secondary">
              {buttons.login} <HoverArrow variant="secondary" />
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="text-white">
              {buttons.signup} <HoverArrow />
            </Button>
          </Link>
        </div>
      );
    }

    if (buttons.services) {
      return (
        <Link href="/services">
          <Button>
            {buttons.services} <HoverArrow />
          </Button>
        </Link>
      );
    }

    return null;
  };

  return (
    <div className="relative z w-scren">
      <div className="flex animate-translateX overflow-x-clip w-full items-center ovrflow-x-scroll  md:justify-start h-full relative z-10 min-h-screen">
        {t.landing.hero.slides.map((slide, index) => (
          <Animate
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            key={index}
            className="items-start duration-700 min-w-dvw h-min mb-50 justify-start flex flex-col"
          >
            <div className="max_width space-y-5  md:space-y-8 text-white">
              <div className="flex items-center justify-between w-min bg-[rgba(255,255,255,.2)] rounded-[7px] text-[#cacdd1] py-1.5 gap-6 px-4">
                <div className="bg-[#1a365d] text-sm md:text-base text-white whitespace-nowrap px-3">
                  {slide.badge}
                </div>
                <Link href="/">
                  <p className="text whitespace-nowrap text-sm md:text-base cursor-pointer hover:underline">
                    {slide.linkLabel}
                  </p>
                </Link>
              </div>

              <h1 className="md:text-[3.5rem] text-[2.2rem] leading-12 md:leading-[68px] max-w-[540px] font-bold">
                {slide.title.before}
                <span className="underline"> {slide.title.highlight} </span>
                {slide.title.after}
              </h1>

              <p className="text-[1.5rem] text-[rgba(255,255,255,.7)] max-w-[540px]">
                {slide.description}
              </p>

              {renderSlideButtons(slide.buttons)}
            </div>
          </Animate>
        ))}
      </div>
      <div className="absolute inset-0 w-full h-full hero">
        <div className="absolute  inset-0 bg-[rgba(0,0,0,0.3)] w-full h-ull"></div>

        <video
          src="/videos/hero_bg.mp4"
          className="w-full object-cover h-full"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </div>
  );
};

export default Hero;
