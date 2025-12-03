import service1 from "@/assets/images/1.jpg";
// import service2 from "@/assets/images/2.jpg"
import service3 from "@/assets/images/stock.jpeg";
import service4 from "@/assets/images/4.jpg";
import service5 from "@/assets/images/5.jpg";
import service6 from "@/assets/images/6.jpg";
import service7 from "@/assets/images/7.jpg";
import service8 from "@/assets/images/8.jpg";
import service9 from "@/assets/images/9.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import HoverArrow from "@/components/ui/hover_arrow";
import Animate from "@/components/animation/animate";
import Link from "next/link";
const OurServices = () => {
  const services = [
    {
      image: service5,
      label: "Real Estate Investments",
      desc: "Real estate investments involves the purchase, ownership, management, rental and/or sale of real estate for profit. Improvement of realty property as part of a real estate investment strategy is generally considered to be a sub-specialty of real estate investing...",
      link: "/services/real-estate",
    },
    {
      image: service9,
      label: "Gold Investments",
      desc: "Commonly seen as a great store of wealth, this precious metal is also known as a reliable safe-haven asset. With a rich history amongst almost all global cultures, gold remains a highly popular...",
      link: "/services/gold",
    },
    {
      image: service1,
      label: "Retirement Planning",
      desc: "Saving for retirement can be a daunting task, but with a sound strategy, it’s well within reach.  Crystalpoint investment management is here to bring clarity to retirement...",
      link: "/services/retirement-planning",
    },
    {
      image: service4,
      label: "Financial Planning",
      desc: "A financial plan is a comprehensive evaluation of an investor’s current and future financial state by using currently known variables to predict future cash flows, asset values and withdrawal...",
      link: "/services/financial-planning",
    },
    {
      image: service6,
      label: "Oil and Gas",
      desc: "Surprising as it might be, anyone can invest in the oil market to make a profit. Indeed, the development of online trading platforms has allowed individuals to use their savings to speculate on rising or falling oil prices...",
      link: "/services/oil-and-gas",
    },
    {
      image: service7,
      label: "Loan and Grants",
      desc: "Getting a loan doesn’t have to be intimidating, with the right lender it can be a simple process. You only need a lender committed to taking the mystery out of the mortgage loan process...",
      link: "/services/loans-and-grants",
    },
    {
      image: service3,
      label: "Stock and Share",
      desc: 'A stock or share (also known as a company`s "equity") is a financial instrument that represents ownership in a company or corporation and represents a proportionate claim on its assets (what it owns) and earnings...',
      link: "/services/stock-investment",
    },
  ];

  return (
    <div className="wrapper">
      <div className="max_width">
        <h1 className="text-3xl md:text-4xl text-primary-foreground font-medium">
          Our <span className="underline"> Services</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 py-10 gap-10">
          {services.map((service, index) => (
            <Animate
              key={index}
              className="space-y-2 hover:shadow-xl rounded-md flex flex-col justify-between bg-white duration-500 hover:translate-y-1 hover:scale-3d"
            >
              <Image
                src={service.image}
                alt="service image"
                className="w-full -[350px] object-cntain"
              />
              <div className="px-5 space-y-4 pb-8 h-full">
                <h3 className="text-lg md:text-2xl text-primary-foreground font-medium">
                  {service.label}
                </h3>

                <p className="text-secondary-foreground md:text-lg">
                  {service.desc}
                </p>

                <Link href={service.link}>
                  <Button className="w-min whitespace-nowrap group hover:text-white duration-300 text-white">
                    Learn More
                    <HoverArrow
                      variant="custom"
                      className="text-primary bg-white group-hover:bg-white duration-500"
                    />
                  </Button>
                </Link>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
