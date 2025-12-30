// components/landing/services/services_header.tsx
"use client";

import bgImage from "@/assets/svg/in-equity-decor-1.svg";
import Animate from "@/components/animation/animate";
import { useTranslate } from "@/hooks/use_translate";

const ServicesHeader = () => {
  const { t } = useTranslate();

  return (
    <div
      className=" bg-[#252526] wrapper"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <header className="max_width text-white py-10 md:py-16 px-4 sm:px-6 lg:px-8">
        <Animate type="fadeInLeft" className="">
          <h1 className="text-xl sm:text-3xl font-bold mb-2 md:mb-4">
            {t.landing.servicesHeader.title}
          </h1>
          <p className="text-[#999] sm:text-lg">
            {t.landing.servicesHeader.subtitle}
          </p>
        </Animate>
      </header>
    </div>
  );
};

export default ServicesHeader;
