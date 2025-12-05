import { Check } from "lucide-react";
import Image from "next/image";
import aboutUImage from "@/assets/images/in-equity-16-image.jpg";
import investmentImage from "@/assets/images/in-equity-11-bg.png";
import { Button } from "@/components/ui/button";
import HoverArrow from "@/components/ui/hover_arrow";
import Animate from "@/components/animation/animate";
import Link from "next/link";
const Investment = () => {
  return (
    <div className="wrapper flex-col flex-wrap flex items-stretch justify-center overflow-clip bg-[#f5f7f9] md:pb-20 pb-10">
      <div className="flex py-10 md:py-20 medium:flex-row flex-col items-stretch justify-between w-full max_width gap-12 medium:gap-20">
        <Animate
          type="fadeInLeft"
          className="flex flex-col xlarge:shrink-0 items-start justify-between md:max-w-[430px]"
        >
          <div
            className="space-y-4
            "
          >
            <h2 className="md:text-5xl text-4xl font-semibold text-primary-foreground">
              Investment that`s <span className="underline"> suitable </span>
              for you
            </h2>

            <p className="text-primary text-2xl md:text-3xl font-semibold">
              Your financial freedom is our success
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-start gap-3">
              <div className="center rounded-full w-4 h-4 bg-primary">
                <Check className="text-white" />
              </div>

              <p className="text-secondary-foreground text-base md:text-lg font-semibold">
                We are Innovative
              </p>
            </div>
            <div className="flex items-center justify-start gap-3">
              <div className="center rounded-full w-4 h-4 bg-primary">
                <Check className="text-white" />
              </div>

              <p className="text-secondary-foreground md:text-lg font-semibold">
                We are Innovative
              </p>
            </div>
            <div className="flex items-center justify-start gap-3">
              <div className="center rounded-full w-4 h-4 bg-primary">
                <Check className="text-white" />
              </div>

              <p className="text-secondary-foreground md:text-lg font-semibold">
                We are Innovative
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
            Crystalpoint investment management offer Card to investors on
            Crystalpoint Super plan
          </h2>

          <p className="text-secondary-foreground md:text-lg">
            The partnership aims to fill a gap in the traditional financial
            system that has left many without access to essential banking
            products. According to a 2024 survey by the FDIC, 25 percent of U.S.
            households are unbanked or underbanked, while global numbers have
            reached a staggering 1.7 billion, according to data released by the
            World Bank. Through BlockCard, Crystalpoint investors can have a
            virtual card issued to them while a physical card is mailed to them.
            The card has a minimum of $1000 balance needed. It can be used at
            over 45 million merchants and ATMs – anywhere in the world where
            major credit cards are accepted.
          </p>

          <Link href="/plans">
            <Button variant="dark" className="bg-primary text-white">
              Learn More <HoverArrow variant="dark" />
            </Button>
          </Link>
        </Animate>
      </div>
    </div>
  );
};

export default Investment;
