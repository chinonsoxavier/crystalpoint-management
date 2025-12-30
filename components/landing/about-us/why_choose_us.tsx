// components/landing/about/why_choose_us.tsx
"use client";

import { ArrowUp } from "lucide-react";
import bgImage from "@/assets/images/in-content-10-image.png";
import Animate from "@/components/animation/animate";
import {
  faBriefcase,
  faHome,
  faKey,
  faLock,
  faMicrophone,
  faServer,
  faShield,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslate } from "@/hooks/use_translate";

export default function WhyChooseUs() {
  const { t } = useTranslate();

  const features = [
    {
      icon: faHome,
      title: t.landing.whyChooseUs.features.legalCompany.title,
      description: t.landing.whyChooseUs.features.legalCompany.description,
      cta: t.landing.whyChooseUs.features.legalCompany.cta,
    },
    {
      icon: faKey,
      title: t.landing.whyChooseUs.features.highReliability.title,
      description: t.landing.whyChooseUs.features.highReliability.description,
      cta: t.landing.whyChooseUs.features.highReliability.cta,
    },
    {
      icon: faBriefcase,
      title: t.landing.whyChooseUs.features.quickWithdrawal.title,
      description: t.landing.whyChooseUs.features.quickWithdrawal.description,
      cta: t.landing.whyChooseUs.features.quickWithdrawal.cta,
    },
    {
      icon: faUser,
      title: t.landing.whyChooseUs.features.referralProgram.title,
      description: t.landing.whyChooseUs.features.referralProgram.description,
      cta: t.landing.whyChooseUs.features.referralProgram.cta,
    },
    {
      icon: faMicrophone,
      title: t.landing.whyChooseUs.features.support247.title,
      description: t.landing.whyChooseUs.features.support247.description,
      cta: t.landing.whyChooseUs.features.support247.cta,
    },
    {
      icon: faServer,
      title: t.landing.whyChooseUs.features.dedicatedServer.title,
      description: t.landing.whyChooseUs.features.dedicatedServer.description,
      cta: t.landing.whyChooseUs.features.dedicatedServer.cta,
    },
    {
      icon: faLock,
      title: t.landing.whyChooseUs.features.sslSecured.title,
      description: t.landing.whyChooseUs.features.sslSecured.description,
      cta: t.landing.whyChooseUs.features.sslSecured.cta,
    },
    {
      icon: faShield,
      title: t.landing.whyChooseUs.features.ddosProtection.title,
      description: t.landing.whyChooseUs.features.ddosProtection.description,
      cta: t.landing.whyChooseUs.features.ddosProtection.cta,
    },
  ];

  return (
    <div className="w-full py-20">
      {/* Features Section */}
      <section className="bg-[linear-gradient(0deg,#373737_0%,#181818_90%,#181818_100%)] py-9 sm:py-16">
        <div className="max_width">
          {/* Header Button */}
          <Animate className="text-center center mb-12 relative">
            <div
              style={{
                backgroundImage: `url(${bgImage.src})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPositionY: "100%",
              }}
              className="inline-block text-center relative center h-full bg-primary w-full rounded-md py-7 shadow-lg"
            >
              <h2 className="text-white text-2xl sm:text-[35px] text-center font-bold">
                {t.landing.whyChooseUs.title}
              </h2>
            </div>
          </Animate>
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Animate
                  key={index}
                  className="pl-6 xs:py-4 flex flex-col xs:flex-row flex-wrap border-r border-[#5c5c5c] pr-5 gap-2"
                >
                  <div className="flex-1 xs:min-w-xs space-y-2">
                    <h3 className="text-white text-2xl font-semibold border-l-8 border-l- pl-2">
                      {feature.title}
                    </h3>
                    <p className="text-[17px] text-[rgba(255,255,255,.7)] xs:leading-relaxed">
                      {feature.description}
                    </p>
                    <button className="group w-min whitespace-nowrap flex items-center gap-2 text-white">
                      {feature.cta}
                      <div className="center bg-white w-4.5 h-4.5 rounded-full">
                        <ArrowUp className="text-black group-hover:rotate-90 rotate-45 duration-500 mx-auto" />
                      </div>
                    </button>
                  </div>
                  <FontAwesomeIcon
                    icon={Icon}
                    className="size-13 text-[#5c5c5c]"
                  />
                </Animate>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
