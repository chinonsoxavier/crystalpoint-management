// components/landing/about/about_us.tsx
"use client";

import Animate from "@/components/animation/animate";
import {
  faFlag,
  faHourglassEnd,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslate } from "@/hooks/use_translate";

const AboutUs = () => {
  const { t } = useTranslate();

  return (
    <div className="text-black px-4 sm:px-6 py-20 lg:px-8">
      <section className="flex-col center">
        <Animate>
          <h2 className="text-3xl md:text-4xl max-w-4xl text-center font-bold text-primary-foreground mb-5">
            {t.landing.aboutUs.title}
            <span className="underline px-2">{t.landing.aboutUs.subtitle}</span>
          </h2>
        </Animate>
        <Animate>
          <p className="text-secondary-foreground text-center sm:text-lg leading-relaxed max-w-3xl">
            {t.landing.aboutUs.description}
          </p>
        </Animate>
      </section>

      {/* Content Sections */}
      <div className="wrapper py-8">
        <div className="max_width space-y-8">
          {/* Who We Are Section */}
          <Animate className="flex gap-4 sm:gap-6">
            <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
              <FontAwesomeIcon className="size-8.5 text-white" icon={faLeaf} />
            </div>
            <div className="flex-1">
              <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                {t.landing.aboutUs.sections.whoWeAre.title}
              </h3>
              <p className="text-secondary-foreground text-[16px] tracking-wide">
                {t.landing.aboutUs.sections.whoWeAre.content}
              </p>
            </div>
          </Animate>

          {/* History Section */}
          <Animate className="flex gap-4 sm:gap-6">
            <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
              <FontAwesomeIcon
                className="text-white size-8"
                icon={faHourglassEnd}
              />
            </div>
            <div className="flex-1">
              <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                {t.landing.aboutUs.sections.history.title}
              </h3>
              <p className="text-secondary-foreground text-[16px] tracking-wide">
                {t.landing.aboutUs.sections.history.content}
              </p>
            </div>
          </Animate>

          {/* Culture Section */}
          <Animate className="flex gap-4 sm:gap-6">
            <div className="shrink-0">
              <div className="flex items-center justify-center sm:h-15 sm:w-15 w-12 h-12 rounded-xl md:rounded-3xl bg-primary text-primary-foreground">
                <FontAwesomeIcon className="text-white size-8" icon={faFlag} />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="sm:text-2xl text-xl font-bold text-primary-foreground mb-4">
                {t.landing.aboutUs.sections.culture.title}
              </h3>
              <p className="text-secondary-foreground text-[16px] tracking-wide">
                {t.landing.aboutUs.sections.culture.content}
              </p>
            </div>
          </Animate>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
