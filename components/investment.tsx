import Animate from "@/components/animation/animate";
import { Button } from "@/components/ui/button";
import HoverArrow from "@/components/ui/hover_arrow";

const Investment = () => {
  return (
    <div className="wrapper py-12 md:py-20">
      <div className="max_width flex items-center jusstify-between flex-wrap gap-12 md:gap-20">
        <Animate type="fadeInLeft" className="flex-1 space-y-3 md:space-y-5">
          <h1 className="text-primary-foreground font-semibold text-3xl md:text-5xl">
            <span className="underline pr-2">Knowledge</span>is a wise
            investment
          </h1>

          <p className="text-secondary-foreground md:text-xl">
            By combining easy-to-understand information with actionable
            insights, Our company helps make the market seem less daunting—and
            more approachable.
          </p>
        </Animate>

        <Animate type="fadeInRight" className="bg-white flex-1 flex-col market-card gap-4 py-8 px-10 rounded flex max-w-[450px]">
          <p className="text-primary-foreground text-lg md:text-xl">
            Investors #1 Choice
          </p>

          <p className="text-secondary-foreground">
            We pride ourself as the prime of finance management and investment.
          </p>

          <Button className="w-min whitespace-nowrap group hover:text-white duration-300" >
            Start Investing
            <HoverArrow variant="custom" className="text-primary bg-primary-foreground group-hover:bg-white duration-500" />
          </Button>
        </Animate>
      </div>
    </div>
  );
};

export default Investment;
