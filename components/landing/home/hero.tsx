'use client';
import Animate from "@/components/animation/animate";
import { Button } from "@/components/ui/button";
import HoverArrow from "@/components/ui/hover_arrow";
import Link from "next/link";
import bgImage from "@/assets/images/crystalpoint-video-placeholder.png";
import { useEffect, useState } from "react";

const Hero = () => {

    const [currentSlide,setCurrentSlide] = useState(0);


    useEffect(() => {

        const resetSlide = ()=>{
            setCurrentSlide(0)
        }
    const timeout =  setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        console.log(currentSlide);
      }, 5000);
      if(currentSlide>=slides.length){
        clearTimeout(timeout);
        resetSlide();
      }
    }, [currentSlide])
    

 

    const slides = [
      {
        linkLabel: "About Visional Wellington",
        label: (
          <h1 className="md:text-[3.5rem] text-[2.2rem] leading-12 md:leading-[68px] max-w-[540px] font-bold">
            We are experts in financial
            <span className="underline"> financial </span> services
          </h1>
        ),
        desc: "Our mission is to create wealth for our clients irrespective of market flow.",
        button: (
          <div className="space-x-3 space-y-3">
            <Button variant="secondary">
              Login <HoverArrow variant="secondary" />
            </Button>
            <Button>
              Create Account <HoverArrow />
            </Button>
          </div>
        ),
      },
      {
        linkLabel: "Our Serivices",
        label: (
          <h1 className="md:text-[3.5rem] text-[2.2rem] md:whitespace-nowrap leading-12 md:leading-[68px] max-w-[540px] font-bold">
            Investors` <span className="underline"> #1 Choice</span>
          </h1>
        ),
        desc: "Get the most out of Forex, Oil and Gas, Real estate and more.",
        button: (
          <Button>
            Our Services <HoverArrow />
          </Button>
        ),
      },

      {
        linkLabel: "Stock and Shares",
        label: (
          <h1 className="md:text-[3.5rem] text-[2.2rem] leading-12 md:leading-[68px] max-w-[540px] font-bold">
            Invest In
            <span className="underline"> Stocks and Shares </span>
          </h1>
        ),

        button: (
          <div className="space-x-3 space-y-3">
            <Button variant="secondary">
              Login <HoverArrow variant="secondary" />
            </Button>
            <Button>
              Create Account <HoverArrow />
            </Button>
          </div>
        ),
      },
    ];

  return (
    <div className="relative w-scren">
      <div className="flex animate-translateX overflow-x-clip w-full items-center ovrflow-x-scroll  md:justify-start h-full relative z-10 min-h-screen">
        {slides.map((slide, index) => (
          <Animate
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            key={index}
            className="items-start duration-700 min-w-dvw h-min mb-50 justify-start flex flex-col"
          >
            <div className="max_width space-y-5  md:space-y-8 text-white">
              <div className="flex items-center justify-between w-min bg-[rgba(255,255,255,.2)] rounded-[7px] text-[#cacdd1] py-1.5 gap-6 px-4">
                <div className="bg-[#0A8A9F] text-sm md:text-base text-white whitespace-nowrap px-3">
                  Learn More
                </div>
                <Link href="/">
                  <p className="text whitespace-nowrap text-sm md:text-base cursor-pointer hover:underline">
                    {slide.linkLabel}
                  </p>
                </Link>
              </div>

              {slide.label}
              <p className="text-[1.5rem] text-[rgba(255,255,255,.7)] max-w-[540px]">
                {slide.desc}
              </p>

              {slide.button}
            </div>
          </Animate>
        ))}
      </div>
      <div className="absolute inset-0 w-full h-full hero" >
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
