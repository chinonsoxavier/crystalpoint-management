// components/landing/faqs/faqs_header.tsx
"use client";

import Animate from "@/components/animation/animate";
import { useTranslate } from "@/hooks/use_translate";

const FaqsHeader = () => {
  const { t } = useTranslate();

  return (
    <div className=" bg-[#252526] wrapper">
      <header className="max_width text-white py-10 md:py-16 px-4 sm:px-6 lg:px-8">
        <Animate type="fadeInLeft" className="">
          <h1 className="text-xl sm:text-3xl font-bold mb-4">
            {t.landing.faqsHeader.title}
          </h1>
          <p className="text-[#999] sm:text-lg">
            {t.landing.faqsHeader.subtitle}
          </p>
        </Animate>
      </header>
    </div>
  );
};

export default FaqsHeader;
