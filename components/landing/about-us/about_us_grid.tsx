import gridImage1 from "@/assets/images/in-gallery-image-1.jpg";
import gridImage2 from "@/assets/images/in-gallery-image-2.jpg";
import gridImage3 from "@/assets/images/in-gallery-image-3.jpg";
import gridImage4 from "@/assets/images/in-gallery-image-4.jpg";
import gridImage5 from "@/assets/images/in-gallery-image-5.jpg";
import gridImage6 from "@/assets/images/in-gallery-image-6.jpg";
import Animate from "@/components/animation/animate";
import Image from "next/image";

const AboutUsGrid = () => {
  return (
    <div className="sm:grid grid-rows-4 grid-cols-3 gap-4 flex flex-col sm:max-h-[500px] w-full h-full max_width">
      <Animate
        className="row-start-1 relative rounded-2xl center row-end-4 col-start-1 col-end-2 bg-green-400/50"
      >
        <p
          className="absolute  rotate-30
           text-white p-2 px-3 text-base font-bold
            z-20 rounded pointer-events-none uppercase"
        >
          CrystalPoint <br/> Management <br/> Property
        </p>
        <Image className="object-cover w-full h-full rounded-2xl" alt="gallery image 1" src={gridImage1} />
      </Animate>

      <Animate
        className="row-start-4 relative rounded-2xl center row-end-5 col-start-1 col-end-2 bg-lime-300/50"
      >
        <p
          className="absolute  rotate-30
           text-white p-2 px-3 text-base font-bold
            z-20 rounded pointer-events-none uppercase"
        >
          CrystalPoint <br/> Management <br/> Property
        </p>
        <Image className="object-cover w-full h-full rounded-2xl" alt="gallery image 1" src={gridImage4} />
      </Animate>

      <Animate
        className="row-start-1 relative rounded-2xl center row-end-3 col-start-2 col-end-3 bg-red-500/50"
      >
        <p
          className="absolute  rotate-30
           text-white p-2 px-3 text-base font-bold
            z-20 rounded pointer-events-none uppercase"
        >
          CrystalPoint <br/> Management <br/> Property
        </p>
        <Image className="object-cover w-full h-full rounded-2xl" alt="gallery image 1" src={gridImage2} />
      </Animate>

      <Animate
        className="row-start-3 relative rounded-2xl center row-end-5 col-start-2 col-end-3 bg-lime-500/50"
      >
        <p
          className="absolute  rotate-30
           text-white p-2 px-3 text-base font-bold
            z-20 rounded pointer-events-none uppercase"
        >
          CrystalPoint <br/> Management <br/> Property
        </p>
        <Image className="object-cover w-full h-full rounded-2xl" alt="gallery image 1" src={gridImage5} />
      </Animate>

      <Animate
        className="row-start-1 relative rounded-2xl center row-end-2 col-start-3 col-end-4 bg-lime-200/50"
      >
        <p
          className="absolute  rotate-30
           text-white p-2 px-3 text-base font-bold
            z-20 rounded pointer-events-none uppercase"
        >
          CrystalPoint <br/> Management <br/> Property
        </p>
        <Image className="object-cover w-full h-full rounded-2xl" alt="gallery image 1" src={gridImage3} />
      </Animate>

      <Animate
        className="row-start-2 relative rounded-2xl center row-end-5 col-start-3 col-end-4 bg-cyan-700/50"
      >
        <p
          className="absolute  rotate-30
           text-white p-2 px-3 text-base font-bold
            z-20 rounded pointer-events-none uppercase"
        >
          CrystalPoint <br/> Management <br/> Property
        </p>
        <Image className="object-cover w-full h-full rounded-2xl" alt="gallery image 1" src={gridImage6} />
      </Animate>
    </div>
  );
}

export default AboutUsGrid