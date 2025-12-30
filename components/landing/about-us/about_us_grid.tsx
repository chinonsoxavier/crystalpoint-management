// components/landing/about/about_us_grid.tsx
"use client";

import gridImage1 from "@/assets/images/in-gallery-image-1.jpg";
import gridImage2 from "@/assets/images/in-gallery-image-2.jpg";
import gridImage3 from "@/assets/images/in-gallery-image-3.jpg";
import gridImage4 from "@/assets/images/in-gallery-image-4.jpg";
import gridImage5 from "@/assets/images/in-gallery-image-5.jpg";
import gridImage6 from "@/assets/images/in-gallery-image-6.jpg";
import gridImage7 from "@/assets/images/cert.jpg";
import Animate from "@/components/animation/animate";
import Image from "next/image";
import { useTranslate } from "@/hooks/use_translate";

const AboutUsGrid = () => {
  const { t } = useTranslate();

  return (
    <div className="sm:grid grid-rows-5 grid-cols-3 gap-4 flex flex-col sm:max-h-[600px] w-full h-full max_width">
      {/* First Column - Shifted up */}
      <Animate className="row-start-1 relative rounded-2xl center row-end-3 col-start-1 col-end-2 bg-green-400/50">
        <Image
          className="object-cover w-full h-full rounded-2xl"
          alt="gallery image 1"
          src={gridImage1}
        />
      </Animate>

      <Animate className="row-start-3 relative rounded-2xl center row-end-5 col-start-1 col-end-2 bg-lime-300/50">
        <Image
          className="object-cover w-full h-full rounded-2xl"
          alt="gallery image 4"
          src={gridImage4}
        />
      </Animate>

      {/* Second Column - Center with Unique Cert */}
      <Animate className="row-start-1 relative rounded-2xl center row-end-2 col-start-2 col-end-3 bg-red-500/50">
        <Image
          className="object-cover w-full h-full rounded-2xl"
          alt="gallery image 2"
          src={gridImage2}
        />
      </Animate>

      {/* CERTIFICATE - CENTER STAGE */}
      <Animate
        className="row-start-2 relative rounded-2xl center row-end-4 col-start-2 col-end-3 
               overflow-visible group"
      >
        {/* Golden frame effect */}
        <div className="absolute -inset-3 bg-linear-to-r from-yellow-400 via-amber-400 to-yellow-400 rounded-3xl blur-sm group-hover:blur-md transition-all duration-300 opacity-70"></div>
        <div className="absolute -inset-1 bg-linear-to-r from-yellow-500 via-amber-500 to-yellow-500 rounded-2xl z-0"></div>

        {/* Certificate content */}
        <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden">
          <Image
            className="object-cover w-full h-full rounded-xl transform group-hover:scale-105 transition-transform duration-500"
            alt="Official Certificate"
            src={gridImage7}
          />
        </div>
      </Animate>

      <Animate className="row-start-4 relative rounded-2xl center row-end-5 col-start-2 col-end-3 bg-lime-500/50">
        <Image
          className="object-cover w-full h-full rounded-2xl"
          alt="gallery image 5"
          src={gridImage5}
        />
      </Animate>

      {/* Third Column - Shifted up */}
      <Animate className="row-start-1 relative rounded-2xl center row-end-3 col-start-3 col-end-4 bg-lime-200/50">
        <Image
          className="object-cover w-full h-full rounded-2xl"
          alt="gallery image 3"
          src={gridImage3}
        />
      </Animate>

      <Animate className="row-start-3 relative rounded-2xl center row-end-5 col-start-3 col-end-4 bg-cyan-700/50">
        <Image
          className="object-cover w-full h-full rounded-2xl"
          alt="gallery image 6"
          src={gridImage6}
        />
      </Animate>
    </div>
  );
};

export default AboutUsGrid;
