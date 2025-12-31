import RetirementImage from "@/assets/images/1.jpg";
import Animate from "@/components/animation/animate";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useTranslate } from "@/hooks/use_translate";

const RetirementPlanning = () => {
  const { t } = useTranslate();
  const { retirementPlanning } = t.landing;

  return (
    <div className="wrapper py-12 md:py-20">
      <div className="max_width py-10 md:px-10">
        <Animate>
          <Animate>
            <h2 className="text-3xl md:text-4xl text-center font-bold text-primary-foreground mb-3 md:mb-5">
              <span className="underline">{retirementPlanning.title}</span>
            </h2>
          </Animate>

          <div className=" flex justify-start max-w-4xl mx-auto">
            <Animate className="justify-start my-6 overflow-hidden rounded-xl">
              <Image
                src={RetirementImage}
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
                <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                  {retirementPlanning.workforceOptimization.title}
                </h3>
                <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                  {retirementPlanning.workforceOptimization.description}
                </p>
              </div>
            </Animate>

            <Animate className="flex gap-4 mt-5 mx-auto max-w-4xl justify-center sm:gap-6">
              <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
                <FontAwesomeIcon
                  className="text-white size-8.5"
                  icon={faList}
                />
              </div>
              <div className="flex-1 space-y-5">
                <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                  {retirementPlanning.quadrupleRetirement.title}
                </h3>
                <p className="text-secondary-foreground text-[16px] md:text-lg tracking-wide">
                  {retirementPlanning.quadrupleRetirement.description}
                </p>
              </div>
            </Animate>
          </div>
        </Animate>
      </div>
    </div>
  );
};

export default RetirementPlanning;
