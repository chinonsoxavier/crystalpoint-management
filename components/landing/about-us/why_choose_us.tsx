import { ArrowUp } from "lucide-react";
import bgImage from "@/assets/images/in-content-10-image.png";
import Animate from "@/components/animation/animate";
import {
  faBriefcase,
  faHome,
  faKey,
  faLock,
  faMicrophone,
  faServer,
  faShield,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WhyChooseUs() {
  const features = [
    {
      icon: faHome,
      title: "Legal Company",
      description:
        "Our company conducts absolutely legal activities in the legal field. We are certified to operate investment business, we are legal and legitimate.",
      cta: "Join Us",
    },
    {
      icon: faKey,
      title: "High reliability",
      description:
        "We are trusted by a huge number of people. We are working hard constantly to improve the level of our security system and maintain positive ux.",
      cta: "Join Us",
    },
    {
      icon: faBriefcase,
      title: "Quick Withdrawal",
      description:
        "Our all minerals are treated spontaneously once requested. There are high maximum limits.",
      cta: "Join Us",
    },
    {
      icon: faUser,
      title: "Referral Program",
      description:
        "We are offering 10% (percent) of referral income through our referral program. You can increase your income by simply referring people.",
      cta: "Join Us",
    },
    {
      icon: faMicrophone,
      title: "24/7 Support",
      description:
        "We provide 24/7 customer support through e-mail, telegram, whatsapp and thechat. Our support representatives are periodically available to elucidate any difficulty.",
      cta: "Join Us",
    },
    {
      icon: faServer,
      title: "Dedicated Server",
      description:
        "We are using a dedicated server for the website which allows us exclusive use of the resources of the entire server.",
      cta: "Join Us",
    },
    {
      icon: faLock,
      title: "SSL Secured",
      description:
        "Comodo Essential-SSL Security encryption confirms that the presented content is genuine and legitimate.",
      cta: "Join Us",
    },
    {
      icon: faShield,
      title: "DDOS Protection",
      description:
        "We are using one of the most experienced, professional, and trusted DDOS protection and mitigation provider.",
      cta: "Join Us",
    },
  ];

  return (
    <div className="w-full py-20">
      {/* Features Section */}
      <section className="bg-[linear-gradient(0deg,#373737_0%,#181818_90%,#181818_100%)] py-9 sm:py-16">
        <div className="max_width">
          {/* Header Button */}
          <Animate className="text-center center mb-12 relative">
            <div
              style={{
                backgroundImage: `url(${bgImage.src})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPositionY: "100%",
              }}
              className="inline-block text-center reative center h-full bg-primary w-full rounded-md py-7 shadow-lg"
            >
              <h2 className="text-white text-2xl sm:text-[35px] text-center font-bold">
                Why choose CrytalPoint Management
              </h2>
            </div>
          </Animate>
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Animate
                  key={index}
                  className="pl-6 xs:py-4 flex flex-col xs:flex-row flex-wrap border-r border-[#5c5c5c] pr-5 gap-2"
                >
                  <div className="flex-1 xs:min-w-xs space-y-2" >
                    <h3 className="text-white text-2xl font-semibold border-l-8 border-l- pl-2">
                      {feature.title}
                    </h3>
                    <p className="text-[17px] text-[rgba(255,255,255,.7)] xs:leading-relaxed">
                      {feature.description}
                    </p>
                    <button className="group w-min whitespace-nowrap flex items-center gap-2 text-white">
                      Join Us
                      <div className="center bg-white w-4.5 h-4.5 rounded-full">
                        <ArrowUp className="text-black group-hover:rotate-90 rotate-45 duration-500 mx-auto" />
                      </div>
                    </button>
                  </div>
                  <FontAwesomeIcon
                    icon={Icon}
                    className="size-13 text-[#5c5c5c]"
                  />
                </Animate>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
