// components/landing/services/our_services.tsx
"use client";

import service1 from "@/assets/images/1.jpg";
import service2 from "@/assets/images/2.jpg";
import service3 from "@/assets/images/stock.jpeg";
import service4 from "@/assets/images/4.jpg";
import service5 from "@/assets/images/5.jpg";
import service6 from "@/assets/images/6.jpg";
import service7 from "@/assets/images/7.jpg";
import service8 from "@/assets/images/8.jpg";
import service9 from "@/assets/images/9.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import HoverArrow from "@/components/ui/hover_arrow";
import Animate from "@/components/animation/animate";
import Link from "next/link";
import { useTranslate } from "@/hooks/use_translate";

const OurServices = () => {
  const { t } = useTranslate();

  const services = [
    {
      image: service5,
      label: t.landing.services.items.realEstate.label,
      desc: t.landing.services.items.realEstate.description,
      link: "/services/real-estate",
    },
    {
      image: service9,
      label: t.landing.services.items.goldInvestments.label,
      desc: t.landing.services.items.goldInvestments.description,
      link: "/services/gold",
    },
    {
      image: service1,
      label: t.landing.services.items.retirementPlanning.label,
      desc: t.landing.services.items.retirementPlanning.description,
      link: "/services/retirement-planning",
    },
    {
      image: service4,
      label: t.landing.services.items.financialPlanning.label,
      desc: t.landing.services.items.financialPlanning.description,
      link: "/services/financial-planning",
    },
    {
      image: service6,
      label: t.landing.services.items.oilAndGas.label,
      desc: t.landing.services.items.oilAndGas.description,
      link: "/services/oil-and-gas",
    },
    {
      image: service7,
      label: t.landing.services.items.loansAndGrants.label,
      desc: t.landing.services.items.loansAndGrants.description,
      link: "/services/loans-and-grants",
    },
    {
      image: service3,
      label: t.landing.services.items.stockInvestment.label,
      desc: t.landing.services.items.stockInvestment.description,
      link: "/services/stock-investment",
    },
  ];

  return (
    <div className="wrapper">
      <div className="max_width">
        <h1 className="text-3xl md:text-4xl text-primary-foreground font-medium">
          {t.landing.services.title} <span className="underline">Services</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 py-10 gap-10">
          {services.map((service, index) => (
            <Animate
              key={index}
              className="space-y-2 hover:shadow-xl rounded-md flex flex-col justify-between bg-white duration-500 hover:translate-y-1 hover:scale-3d"
            >
              <Image
                src={service.image}
                alt="service image"
                className="w-full -[350px] object-contain"
              />
              <div className="px-5 space-y-4 pb-8 h-full">
                <h3 className="text-lg md:text-2xl text-primary-foreground font-medium">
                  {service.label}
                </h3>

                <p className="text-secondary-foreground md:text-lg">
                  {service.desc}
                </p>

                <Link href={service.link}>
                  <Button className="w-min whitespace-nowrap group hover:text-white duration-300 text-white">
                    {t.landing.services.learnMore}
                    <HoverArrow
                      variant="custom"
                      className="text-primary bg-white group-hover:bg-white duration-500"
                    />
                  </Button>
                </Link>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
