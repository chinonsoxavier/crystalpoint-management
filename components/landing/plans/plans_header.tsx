import Animate from "@/components/animation/animate";
const PlansHeader = () => {
  return (
    <div className=" bg-[#252526] wrapper">
      <header className="max_width text-white py-10 md:py-16 px-4 sm:px-6 lg:px-8">
        <Animate type="fadeInLeft" className="">
          <h1 className="text-xl sm:text-3xl font-bold mb-4">Plans</h1>
          <p className="text-[#999] sm:text-lg">
            CristalPoint Investment Plans
          </p>
        </Animate>
      </header>
    </div>
  );
};

export default PlansHeader;
