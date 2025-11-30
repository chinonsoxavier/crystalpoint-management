import bgImage from "@/assets/svg/in-equity-decor-1.svg";
import Animate from "@/components/animation/animate";
const MarketHeader = () => {
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
          <h1 className="text-2xl sm:text-5xl font-bold mb-2 md:mb-4">Global Market</h1>
          <p className="text-[#999] sm:text-2xl max-w-3xltext-xl">
            The pricing is for indicative purposes only. Please go to individual
            instrument specifications to see the trading conditions.
          </p>
        </Animate>
      </header>
    </div>
  );
};

export default MarketHeader;
