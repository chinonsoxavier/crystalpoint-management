// components/landing/home/about_and_question_sections.tsx
import Animate from "@/components/animation/animate";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslate } from "@/hooks/use_translate";
import buildingImage from "@/assets/images/in-card-background-1.jpg"; // Update with correct path

const AboutAndQuestionSections = () => {
  const { t } = useTranslate();

  return (
    <>
      {/* about us */}
      <Animate className="center max_width_xl py-10 md:py-20">
        <div className="border-primary border p-10 rounded-md max_width flex-col xs:flex-row gap-10 flex-wrap flex items-start justify-between xs:items-center">
          <p className="font-bold text-base md:text-lg text-primary-foreground text-left">
            {t.landing.aboutUsSection.description}
          </p>
          <Link href="/about-us">
            <Button className="text-white">
              {t.landing.aboutUsSection.learnMore}
            </Button>
          </Link>
        </div>
      </Animate>

      {/* ask a question */}
      <Animate className="center py-10">
        <div className="max_width center text-white">
          <div className="md:p-10 p-6 flex-col relative w-full flex rounded-xl items-start justify-start">
            <Image
              src={buildingImage}
              className="absolute inset-0 w-full h-full rounded-xl  -z-10"
              alt="building image"
            />

            <div className="space-y-4">
              <h2 className="sm:text-4xl text-3xl font-bold">
                {t.landing.askQuestionSection.title}
              </h2>
              <p className="sm:text-xl text-lg">
                {t.landing.askQuestionSection.description}
              </p>
              <Link href="/contact-us">
                <Button className="bg-white text-primary-foreground hover:bg-gray-100 rounded-lg px-6 py-2 font-medium">
                  {t.landing.askQuestionSection.askQuestion}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Animate>
    </>
  );
};

export default AboutAndQuestionSections;
