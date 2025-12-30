// components/landing/learn_more_about_us.tsx
"use client";
import {
  faAddressCard,
  faComment,
  faPlay,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import aboutUImage from "@/assets/images/in-equity-16-image.jpg";
import { Button } from "@/components/ui/button";
import HoverArrow from "@/components/ui/hover_arrow";
import Animate from "@/components/animation/animate";
import Link from "next/link";
import { useTranslate } from "@/hooks/use_translate";

const LearnMoreAboutUs = () => {
  const { t } = useTranslate();

  return (
    <div className="wrapper py-20 bg-white">
      <div className="max_width">
        <Animate>
          <h2 className="text-[#333] text-center text-[1.8rem] Archivo font-semibold md:text-[2.625rem]">
            {t.landing.learnMoreAboutUs.title.before}
            <span className="underline">
              {" "}
              {t.landing.learnMoreAboutUs.title.highlight}{" "}
            </span>
          </h2>
        </Animate>

        <Animate>
          <p className="text-[#999] text-center mt-3 md:text-[1.25rem]">
            {t.landing.learnMoreAboutUs.subtitle}
          </p>
        </Animate>
      </div>

      <div className="flex items-center flex-wrap justify-center gap-10 mt-15 w-full max_width">
        <Animate className="border center min-w-[270px] flex-col md:pb-10 pb-6 flex-1 hover:border-primary border-secondary-foreground rounded-lg hover:shadow duration-500">
          <div className="center bg-white w-20 h-20 -mt-10">
            <FontAwesomeIcon
              size="3x"
              className="txt-[40px] text-primary size-16"
              icon={faAddressCard}
            />
          </div>

          <h3 className="text-primary-foreground font-bold text-lg">
            {t.landing.learnMoreAboutUs.cards.aboutUs.label}
          </h3>

          <p className="text-secondary-foreground">
            {t.landing.learnMoreAboutUs.cards.aboutUs.desc}
          </p>
        </Animate>

        <Animate className="border center min-w-[270px] flex-col md:pb-10 pb-6 flex-1 hover:border-primary border-secondary-foreground rounded-lg hover:shadow duration-500">
          <div className="center bg-white w-20 h-20 -mt-10">
            <FontAwesomeIcon
              size="3x"
              className="txt-[40px] text-primary size-16"
              icon={faWrench}
            />
          </div>

          <h3 className="text-primary-foreground font-bold text-lg">
            {t.landing.learnMoreAboutUs.cards.ourServices.label}
          </h3>

          <p className="text-secondary-foreground">
            {t.landing.learnMoreAboutUs.cards.ourServices.desc}
          </p>
        </Animate>

        <Animate className="border center min-w-[270px] flex-col md:pb-10 pb-6 flex-1 hover:border-primary border-secondary-foreground rounded-lg hover:shadow duration-500">
          <div className="center bg-white w-20 h-20 -mt-10">
            <FontAwesomeIcon
              size="3x"
              className="txt-[40px] text-primary size-16"
              icon={faComment}
            />
          </div>

          <h3 className="text-primary-foreground font-bold text-lg">
            {t.landing.learnMoreAboutUs.cards.contactUs.label}
          </h3>

          <p className="text-secondary-foreground">
            {t.landing.learnMoreAboutUs.cards.contactUs.desc}
          </p>
        </Animate>
      </div>

      <div className="wrapper max_width pt-30">
        <div className="flex items-center medium:flex-row flex-col justify-between w-full gap-12 xlarge:gap-20">
          <Animate
            type="fadeInLeft"
            className="relative medium:min-w-[520px] z-10 w-full group center flex-1 aboutUs_left_container"
          >
            <div className="rounded-full cursor-pointer absolute center animate-pulsing z-10 bg-white w-12 h-12 md:w-19 md:h-19">
              <FontAwesomeIcon icon={faPlay} className="text-primary size-8" />
            </div>
            <Image
              src={aboutUImage}
              alt="about us image"
              className="rounded-[10px] w-full brightness-100 duration-700 group-hover:brightness-65"
            />
          </Animate>

          <Animate
            type="fadeInRight"
            className="flex-1 w-full medium:max-w-[480px] space-y-8"
          >
            <h2 className="text-primary-foreground font-semibold text-2xl md:text-3xl">
              {t.landing.learnMoreAboutUs.aboutSection.title}
            </h2>

            <p className="text-secondary-foreground text-lg md:text-2xl tracking-wide">
              {t.landing.learnMoreAboutUs.aboutSection.description}
            </p>

            <Link href="/about-us">
              <Button variant="dark" className="text-white bg-primary">
                {t.landing.learnMoreAboutUs.aboutSection.button}{" "}
                <HoverArrow className="" variant="dark" />
              </Button>
            </Link>
          </Animate>
        </div>
      </div>
    </div>
  );
};

export default LearnMoreAboutUs;
