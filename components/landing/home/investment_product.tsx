import Image from "next/image";
import aboutUImage from "@/assets/images/in-equity-16-image.jpg";
import Animate from "@/components/animation/animate";
import Link from "next/link";
const InvestmentProduct = () => {
  return (
    <div className=" flex-col flex items-stretch justify-center oerflow-clip bg-[#f5f7f9] py-10">
      <div className="flex py-10 flex-col medium:flex-row md:py-20 gap-10 medium:gap-26 flex-wra items-stretch justify-between w-full max_width">
        <div className="flex flex-1 flex-col h srink-0 items-start justify-between medium:max-w-[400px]">
          <div
            className="space-y-4
            "
          >
            <Animate type="fadeInLeft">
              <h2 className="md:text-5xl text-4xl text-center sm:text-left md:leading-[57px] md:tracking-wide font-semibold text-primary-foreground">
                Choose an{" "}
                <span className="underline"> investment product </span>
                that is suitable for you
              </h2>
            </Animate>
            <Animate type="fadeInLeft">
              <p className="text-secondary-foreground text-lg md:text-xl font-semibold">
                Best market prices available so you can receive excellent
                conditions.
              </p>
            </Animate>
          </div>
        </div>

        <Animate
          type="fadeInRight"
          className="relative flex-1 investment_bg md:min-w-[450px]"
        >
          <div className="rounded-xl z-20 relative shadow-xl bg-white px-4 py-2">
            <Image
              src={aboutUImage}
              alt="investment image"
              className="w-full rounded-xl"
            />
          </div>
        </Animate>
      </div>

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
    </div>
  );
};

export default InvestmentProduct;
