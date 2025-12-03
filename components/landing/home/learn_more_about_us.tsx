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
const LearnMoreAboutUs = () => {
  const data = [
    {
      icon: faAddressCard,
      label: "About Us",
      desc: "Experts in financial services",
    },
    {
      icon: faWrench,
      label: "Our Services",
      desc: "Our awesome services",
    },
    {
      icon: faComment,
      label: "Contact Us",
      desc: "Any questions?Write us",
    },
  ];

  return (
    <div className="wrapper py-20 bg-white">
      <div className="max_width" >
        <Animate>
          <h2 className="text-[#333] text-center text-[1.8rem] Archivo font-semibold md:text-[2.625rem]">
            Learn more about
            <span className="underline"> CrystalPoint Management </span>
          </h2>
        </Animate>

        <Animate>
          <p className="text-[#999] text-center mt-3 md:text-[1.25rem]">
            Your Number One Provider of Profitable Investment
          </p>
        </Animate>
      </div>

      <div className="flex items-center flex-wrap justify-center gap-10 mt-15 w-full max_width">
        {data.map((aboutUs, index) => (
          <Animate
            key={index}
            className="border center min-w-[270px] flex-col md:pb-10 pb-6 flex-1 hover:border-primary border-secondary-foreground rounded-lg hover:shadow duration-500"
          >
            <div className="center bg-white w-20 h-20 -mt-10">
              <FontAwesomeIcon
                size="3x"
                className="txt-[40px] text-primary size-16"
                icon={aboutUs.icon}
              />
            </div>

            <h3 className="text-primary-foreground font-bold text-lg">
              {aboutUs.label}
            </h3>

            <p className="text-secondary-foreground">{aboutUs.desc}</p>
          </Animate>
        ))}
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
              TRUST, EXPERIENCE, EXPERTISE AND KNOWLEDGE
            </h2>

            <p className="text-secondary-foreground text-lg md:text-2xl tracking-wide">
              We are an international financial company engaged in investment
              activities, which are related to trading on financial markets and
              cryptocurrency exchanges performed by qualified professional
              traders.
            </p>

            <Button variant="dark" className="text-white bg-primary">
              Learn More <HoverArrow className="" variant="dark" />
            </Button>
          </Animate>
        </div>
      </div>
    </div>
  );
};

export default LearnMoreAboutUs;
