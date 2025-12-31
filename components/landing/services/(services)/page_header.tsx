import bgImage from "@/assets/svg/in-equity-decor-1.svg";
import Animate from "@/components/animation/animate";
import { useTranslate } from "@/hooks/use_translate";

type IPageHeader = {
  label?: string; // Optional override
  desc?: string; // Optional override
};

const PageHeader = ({ label, desc }: IPageHeader) => {
  const { t } = useTranslate();
  const { pageHeader } = t.landing;

  // Use provided props or fall back to translations
  const title = label || pageHeader.services;
  const description = desc || pageHeader.services;

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
          <h1 className="text-xl sm:text-4xl font-bold mb-4">{title}</h1>
          <p className="text-[#999] sm:text-[19px]">{description}</p>
        </Animate>
      </header>
    </div>
  );
};

export default PageHeader;
