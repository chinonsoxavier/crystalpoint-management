import FinancialImage from "@/assets/images/1.jpg";
import Animate from "@/components/animation/animate";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
const FinancialPlanning = () => {
  return (
    <div className="wrapper py-12 md:py-20">
      <div className="max_width py-10 md:px-10">
        <Animate>
          <Animate>
            <h2 className="text-3xl md:text-4xl text-center font-bold text-primary-foreground mb-3 md:mb-5">
              <span className="underline">Financial Planning</span>
            </h2>
          </Animate>

          <div className=" flex justify-start max-w-4xl mx-auto">
            <Animate className="justify-start my-6 overflow-hidden rounded-xl bg-[red]">
              <Image
                src={FinancialImage}
                className=" duration-500 hover:scale-105 h-full rounded-xl"
                alt="retirement image"
              />
            </Animate>
          </div>

          <div>
            <Animate className="flex gap-4 mt-5 mx-auto max-w-4xl justify-center sm:gap-6">
              <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
                <FontAwesomeIcon
                  className="text-white size-8.5"
                  icon={faList}
                />
              </div>
              <div className="flex-1 space-y-5">
                <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                  Saving for retirement can be a daunting task, but with a sound
                  strategy, it’s well within reach. Cristalpoint investment
                  management is here to bring clarity to retirement planning and
                  set you on your path to success. Here you’ll better understand
                  your options and find the right investment. If you had the
                  chance to double—or even quadruple—your retirement savings,
                  you’d probably jump at that opportunity, right? Well, there’s
                  one simple change you can make today that’s sure to boost your
                  retirement savings.
                </p>
              </div>
            </Animate>
          </div>
        </Animate>
      </div>
    </div>
  );
};

export default FinancialPlanning;
