import Link from "next/link";
import Animate from "../animation/animate";

const InvestorsChoice = () => {
  return (
    <div className="w-full md:py-16 py-10 flex items-cener bg-primary/50">
      <div className="max_width_sm flex-wrap gap-12 flex items-center justify-between">
        <Animate
          type="fadeInLeft"
          className="bg-[rgba(255,255,255,0.3)] border border-[#eee] ml-10 md:ml-0 md:pt-3 pt-3 pr-6 md:pr-8 pb-3 md:pb-9 pl-16 md:pl-24 rounded-r-xl md:rounded-xl w-fit"
        >
          <h2 className="md:text-4xl text-xl font-semibold text-primary-foreground">
            Investors #1 Chice
          </h2>

          <p className="text-primary-foreground text-lg md:text-[24px] tracking-wider">
            cristalpoint-management
          </p>
        </Animate>

        <Animate type="fadeInRight">
          <Link href="/sign-up">
            <button className="bg-primary text-white md:py-4 py-2.5 px-5 md:px-8 text-base md:text-lg rounded-md cursor-pointer">
              Open your account
            </button>
          </Link>
        </Animate>
      </div>
    </div>
  );
};

export default InvestorsChoice;
